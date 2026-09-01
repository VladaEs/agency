# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Backend email with SMTP2GO

The enquiry endpoint sends its admin notification and customer confirmation through the SMTP2GO API.

1. In SMTP2GO, create an API key under **Sending → API Keys**.
2. Add `codeforge.org.uk` under **Sending → Verified Senders → Sender domains** and add the three CNAME records provided by SMTP2GO to DNS.
3. Copy `backend/.env.example` to `backend/.env` and set `SMTP2GO_API_KEY`, `SMTP_FROM_EMAIL`, `SMTP_ADMIN_EMAIL`, and `SMTP_REPLY_TO_EMAIL`.
4. Install production PHP dependencies with `composer install --no-dev --optimize-autoloader` from the `backend` directory.

