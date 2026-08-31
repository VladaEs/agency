<?php

use Bramus\Router\Router;
use Illuminate\Container\Container;
use Illuminate\Translation\ArrayLoader;
use Illuminate\Translation\Translator;
use Illuminate\Validation\Factory;
use Milwad\LaravelValidate\Rules\ValidNoHtml;

final class ApiHandler
{
    private Factory $validatorFactory;

    public function __construct(private Router $router)
    {
        $loader = new ArrayLoader();
        $loader->addMessages('en', 'validate', [
            'no-html' => 'The :attribute field cannot contain HTML.',
        ]);
        $translator = new Translator($loader, 'en');
        Container::getInstance()->instance('translator', $translator);
        $this->validatorFactory = new Factory($translator);
    }

    public function health(): void
    {
        try {
            Database::connection()->query('SELECT 1');
            $this->router->returnJson(['status' => 'ok']);
        } catch (Throwable $exception) {
            error_log($exception->getMessage());
            $this->router->returnJson(['status' => 'unavailable'], 503);
        }
    }

    public function createEnquiry(): void
    {
        try {
            $payload = $this->jsonPayload();
            $validator = $this->validatorFactory->make(
                $payload,
                $this->rules(),
                $this->messages()
            );

            if ($validator->fails()) {
                $this->router->returnJson([
                    'error' => 'Please check the submitted fields.',
                    'errors' => $validator->errors()->toArray(),
                ], 422);
            }

            $data = $validator->validated();

            if (($data['website'] ?? '') !== '') {
                // Silently accept honeypot submissions so bots cannot adapt.
                $this->router->returnJson(['message' => 'Enquiry received.'], 201);
            }

            $pdo = Database::connection();
            $plan = $this->resolvePlan($pdo, $data['planId']);
            $needsRecommendation = $data['planId'] === 'not-sure' ? 1 : 0;
            $now = date('H:i:s');

            $statement = $pdo->prepare(
                'INSERT INTO enquiries (
                    eq_plan_id,
                    eq_needs_plan_recommendation,
                    eq_name,
                    eq_email,
                    eq_company,
                    eq_service,
                    eq_budget,
                    eq_message,
                    eq_status,
                    eq_created_at,
                    eq_updated_at
                ) VALUES (
                    :plan_id,
                    :needs_recommendation,
                    :name,
                    :email,
                    :company,
                    :service,
                    :budget,
                    :message,
                    :status,
                    :created_at,
                    :updated_at
                )'
            );

            $statement->execute([
                'plan_id' => $plan['id'],
                'needs_recommendation' => $needsRecommendation,
                'name' => trim($data['name']),
                'email' => strtolower(trim($data['email'])),
                'company' => $this->nullableString($data['company'] ?? null),
                'service' => trim($data['service']),
                'budget' => $this->nullableString($data['budget'] ?? null),
                'message' => trim($data['message']),
                'status' => 'NEW',
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            $enquiryId = (int) $pdo->lastInsertId();
            $emailSent = false;

            try {
                (new MailService())->sendEnquiryNotifications([
                    'id' => $enquiryId,
                    'name' => trim($data['name']),
                    'email' => strtolower(trim($data['email'])),
                    'company' => $this->nullableString($data['company'] ?? null),
                    'planTitle' => $plan['title'],
                    'service' => trim($data['service']),
                    'budget' => $this->nullableString($data['budget'] ?? null),
                    'message' => trim($data['message']),
                ]);
                $emailSent = true;
            } catch (Throwable $mailException) {
                error_log('SMTP notification failed: ' . $mailException->getMessage());
            }

            $this->router->returnJson([
                'message' => 'Enquiry received.',
                'id' => $enquiryId,
                'emailSent' => $emailSent,
            ], 201);
        } catch (InvalidArgumentException $exception) {
            $this->router->returnJson([
                'error' => $exception->getMessage(),
                'errors' => ['planId' => [$exception->getMessage()]],
            ], 422);
        } catch (JsonException $exception) {
            $this->router->returnJson(['error' => 'The request body must contain valid JSON.'], 400);
        } catch (Throwable $exception) {
            error_log($exception->getMessage());
            $this->router->returnJson(['error' => 'Unable to save the enquiry right now.'], 500);
        }
    }

    private function jsonPayload(): array
    {
        $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);

        if ($contentLength > 20_000) {
            $this->router->returnJson(['error' => 'Request body is too large.'], 413);
        }

        $rawBody = file_get_contents('php://input');
        $payload = json_decode($rawBody ?: '', true, 32, JSON_THROW_ON_ERROR);

        if (!is_array($payload)) {
            throw new JsonException('JSON object expected.');
        }

        return $payload;
    }

    private function rules(): array
    {
        $noHtml = fn () => new ValidNoHtml(strict: true);

        return [
            'planId' => ['required', 'string', 'max:45'],
            'name' => ['required', 'string', 'min:2', 'max:45', $noHtml()],
            'email' => ['required', 'string', 'email:rfc', 'max:45'],
            'company' => ['nullable', 'string', 'max:45', $noHtml()],
            'service' => ['required', 'string', 'max:45', $noHtml()],
            'budget' => ['nullable', 'string', 'max:45', $noHtml()],
            'message' => ['required', 'string', 'min:10', 'max:5000', $noHtml()],
            'website' => ['nullable', 'string', 'max:255'],
        ];
    }

    private function messages(): array
    {
        return [
            'required' => 'The :attribute field is required.',
            'email' => 'Please provide a valid email address.',
            'min' => 'The :attribute field is too short.',
            'max' => 'The :attribute field is too long.',
            'string' => 'The :attribute field must be text.',
        ];
    }

    private function resolvePlan(PDO $pdo, string $planSlug): array
    {
        if ($planSlug === 'not-sure') {
            return ['id' => null, 'title' => 'Not sure yet'];
        }

        $statement = $pdo->prepare(
            'SELECT p_id, p_title FROM plans WHERE p_slug = :slug AND p_active = 1 LIMIT 1'
        );
        $statement->execute(['slug' => $planSlug]);
        $plan = $statement->fetch();

        if ($plan === false) {
            throw new InvalidArgumentException('The selected plan is not available.');
        }

        return ['id' => (int) $plan['p_id'], 'title' => $plan['p_title']];
    }

    private function nullableString(mixed $value): ?string
    {
        if (!is_string($value) || trim($value) === '') {
            return null;
        }

        return trim($value);
    }
}
