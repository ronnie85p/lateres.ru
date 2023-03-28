<?php

namespace App\Processors\Web\Auth\Password;
use MODX\Revolution\Processors\Processor;

class Change extends Processor
{
    /**@var App\Core $app */
    public $app;

    public $oldPassword;
    public $newPassword;
    public $newPasswordAgain;

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->app = $this->modx->services->get('app');

        $this->oldPassword = trim($this->getProperty('old_password'));
        $this->newPassword = trim($this->getProperty('new_password'));
        $this->newPasswordAgain = trim($this->getProperty('new_password_again'));

        return parent::initialize();
    }

    public function process()
    {
        if (!$this->checkPasswords()) {
            return $this->failure();
        }

        if (!$this->changePassword()) {
            return $this->failure($this->modx->lexicon('app.unknown_err', ['code' => 1]));
        }

        $this->sendEmail();

        return $this->cleanup();
    }

    public function getLanguageTopics()
    {
        return ['app:auth'];
    }

    public function checkPasswords()
    {
        if (empty($this->oldPassword)) {
            $this->addFieldError('old_password', 
                $this->modx->lexicon('app.auth_password_required'));
            return false;
        }

        if (!$this->modx->user->passwordMatches($this->oldPassword)) {
            $this->addFieldError('old_password', 
                $this->modx->lexicon('app.auth_password_doesnt_match'));
            return false;
        }

        if (empty($this->newPassword)) {
            $this->addFieldError('new_password', 
                $this->modx->lexicon('app.auth_password_required'));
            return false;
        }

        $minLength = $this->modx->getOption('password_min_length', 0);
        if ($minLength > 0) {
            if (strlen($this->newPassword) < $minLength) {
                $this->addFieldError('new_password', 
                    $this->modx->lexicon('app.auth_password_less_min_length', ['password_min_length' => $minLength]));
                return false;
            }
        }

        if (empty($this->newPasswordAgain)) {
            $this->addFieldError('new_password_again', 
                $this->modx->lexicon('app.auth_password_again_required'));
            return false;
        }

        if (strcmp($this->newPassword, $this->newPasswordAgain) != 0) {
            $this->addFieldError('new_password_again', 
                $this->modx->lexicon('app.auth_passwords_dont_match'));
            return false;
        }

        return true;
    }

    public function changePassword()
    {
        return $this->modx->user->changePassword($this->newPassword, 
            $this->oldPassword, false);
    }

    public function sendEmail()
    {
        $email = $this->modx->user->Profile->get('email');
        $options = [
            'new_password' => $this->newPassword,
            'subject' => $this->modx->lexicon('app.auth_email_subj'),
            'message' => $this->modx->getOption('app.auth_password_change_email_tpl', null, 
                '@FILE chunks/app/auth/password/change/emails/message.tpl'), 
        ];

        $this->app->sendEmail($email, $options);
    }

    public function cleanup()
    {
        return $this->success($this->modx->lexicon('app.auth_password_changed'));
    }
}

return Change::class;