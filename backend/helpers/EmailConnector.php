<?php

use SMTP2GO\Contracts\BuildsRequest;

interface EmailConnector
{
    public function send(BuildsRequest $request): void;
}
