<?php

namespace App\Processors\Auth\Password;
use MODX\Revolution\Processors\Processor;

class ForgotProcessor extends Processor
{
    /**@var App\Core $app */
    public $app;

    public $username;
    public $tempPageLifetime;
    public $tempPageResourceId;
    public $tempPagePath;
    public $emailBody;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');

        $this->username = $this->getProperty('username');
        if (empty($this->username)) {
            $this->addFieldError('username', 
                $this->modx->lexicon('app.form_field_is_required'));

            return false;
        }

        /** Options */
        $this->tempPageLifetime = $this->modx->getOption('app.auth_password_forgot_temp_page_lifetime', null, 60 * 15); // option
        $this->tempPageLifetime = eval('return ' . $this->tempPageLifetime . ';');

        $this->tempPageResourceId = $this->modx->getOption('app.auth_password_forgot_temp_page_resource'); // required
        $this->tempPagePath = $this->modx->getOption('app.auth_password_forgot_temp_page_path', null, 'auth/pf'); // required
        $this->emailBody = $this->modx->getOption('app.auth_password_forgot_email', null, 
            '@FILE chunks/app/auth/password/forgot/email.tpl'); // required

        return parent::initialize();
    }

    public function process()
    {
        $prevent = $this->getUser();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $prevent = $this->setCache();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $prevent = $this->generateTempPage();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $prevent = $this->sendEmail();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        return $this->cleanup();
    }

    public function getLanguageTopics()
    {
        return ['app:auth'];
    }

    public function cleanup()
    {
        $returnUrl = $this->modx->getOption('app.auth_password_forgot_return_url'); // option
        if (is_numeric($returnUrl)) {
            $returnUrl = $this->modx->makeUrl($returnUrl, '', '', 'full');
        }

        return $this->success(
            $this->modx->lexicon('app.auth_password_forgot_success'), 
            [ 'redirect' => $returnUrl ]);
    }

    public function sendEmail()
    {
        $email = $this->user->Profile->get('email');
        $options = [
            'link' => $this->modx->getOption('site_url') . $this->tempUrl,
            'subject' => $this->modx->lexicon('app.auth_password_forgot_email_subj'),
            'message' => $this->emailBody, 
        ];

        if (!$this->app->sendEmail($email, $options)) { 
            return $this->modx->lexicon('app.unknown_err', ['code' => 1]); 
        }
    }

    public function generateTempPage()
    {
        $this->tempUrl = "{$this->tempPagePath}/{$this->cacheKey}";

        if (!$this->app->saveTempPage(
            $this->tempPageResourceId, 
            $this->tempUrl, 
            $this->tempPageLifetime
        )) {
            return $this->modx->lexicon('app.unknown_err', ['code' => 2]);
        }
    }

    public function setCache()
    {
        $data = [
            'user_id' => $this->user->get('id'),
            'method' => 'email',
            'timestamp' => time()
        ];

        $this->cacheKey = md5(json_encode($data));

        if (!$this->app->setCache(
            "app/auth/password/forgot/{$this->cacheKey}", 
            $data, 
            $this->tempPageLifetime
        )) {
            return $this->modx->lexicon('app.unknown_err', ['code' => 3]);
        }
    }

    public function getUser()
    {
        $criteria = [
            ['modUser.username' => $this->username],
            ['OR:Profile.email:=' => $this->username]
        ];
      
        /** @var $user modUser */
        $this->user = $this->modx->getObjectGraph(
            \modUser::class, 
            '{"Profile":{},"UserSettings":{}}', 
            $criteria
        );
        
        if (!$this->user) {
            return $this->modx->lexicon('app.unknown_err', ['code' => 4]);
        }
    }
}

return ForgotProcessor::class;