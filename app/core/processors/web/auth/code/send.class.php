<?php

namespace App\Processors\Auth\Code;
use MODX\Revolution\Processors\Processor;

class SendProcessor extends Processor
{
    /**@var App\Core $app */
    public $app;

    public $codeLifetime;
    public $codeLength;
    public $emailBody;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');

        $this->email = trim($this->getProperty('email'));
        if (empty($this->email)) {
            return $this->modx->lexicon('app.form_field_is_required');
        }

        $this->codeLifetime = $this->modx->getOption('app.auth_code_lifetime', null, 60 * 30);
        $this->codeLifetime = eval('return ' . $this->codeLifetime . ';');

        $this->codeLength = (int) $this->modx->getOption('app.auth_code_length', null, 6);
        $this->emailBody = $this->modx->getOption('app.auth_code_email', null, 
            '@FILE chunks/app/auth/code/email.tpl');

        return true;
    }

    public function process()
    {
        $this->generateData();

        $prevent = $this->setCache();
        if (!empty($prevent)) {
            return $this->failure();
        }

        $prevent = $this->sendEmail();
        if (!empty($prevent)) {
            return $this->failure();
        }

        return $this->cleanup();
    }

    public function cleanup()
    {
        return $this->success(
            $this->modx->lexicon('app.auth_code_sent_success'), 
            [ 'key' => $this->cacheKey ]);
    }

    public function generateData()
    {
        $code = mt_rand(str_repeat(1, $this->codeLength), 
            str_repeat(9, $this->codeLength));

        $this->data = [
            'method' => 'email',
            'code' => $code,
            'target' => $this->email,
            'timestamp' => time()
        ];
    }

    public function setCache()
    {
        $this->cacheKey = md5(json_encode($this->data));
        if (!$this->app->setCache("app/auth/code/{$this->cacheKey}", $this->data, $this->codeLifetime)) {
            return $this->modx->lexicon('app.unknown_err', ['code' => 1]);
        }
    }

    public function sendEmail()
    {
        $options = [
            'data' => $this->data,
            'subject' => $this->modx->lexicon('app.auth_code_email_subj'),
            'message' => $this->emailBody, 
        ];

        if (!$this->app->sendEmail($this->email, $options)) { 
            return $this->modx->lexicon('app.unknown_err', ['code' => 2]); 
        }
    }
}

return SendProcessor::class;