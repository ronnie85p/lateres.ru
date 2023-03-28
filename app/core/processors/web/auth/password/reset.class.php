<?php

namespace App\Processors\Auth\Password;
use MODX\Revolution\Processors\Processor;

class ResetProcessor extends Processor 
{
    /**@var App\Core $app */
    public $app;

    public $cacheKey;
    public $password;
    public $passwordAgain;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');

        $token = $this->getProperty('token');
        if (empty($token)) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $tempPagePath = $this->modx->getOption('app.auth_password_forgot_temp_page_path', null, 'auth/pf');

        $this->cacheKey = "app/auth/password/forgot/{$token}";
        $this->tempPageKey = $tempPagePath . '/' . $token;

        $this->password = trim($this->getProperty('password'));
        $this->passwordAgain = trim($this->getProperty('password_again'));

        return true;
    }
    
    public function process()
    {
        $prevent = $this->getCache();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $prevent = $this->getUser();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        if ($this->checkPasswords() !== true) {
            return $this->failure();
        }

        $prevent = $this->changePassword();
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
        $this->app->deleteCache($this->cacheKey);
        $this->app->deleteTempPage($this->tempPageKey);

        $returnUrl = $this->modx->getOption('app.auth_password_reset_return_url'); // option
        if (is_numeric($returnUrl)) {
            $returnUrl = $this->modx->makeUrl($returnUrl, '', '', 'full');
        }

        return $this->success(
            $this->modx->lexicon('app.auth_password_changed_success'), 
            [ 'returnUrl' => $returnUrl ]);
    }

    public function getCache()
    {
        $this->cacheData = $this->app->getCache($this->cacheKey);
        if (!$this->cacheData) {
            return $this->modx->lexicon('app.access_denied', ['code' => 2]);
        }
    }

    public function getUser()
    {
        $this->user = $this->modx->getObject('modUser', 
            $this->cacheData['user_id']);
        if (!$this->user) {
            return $this->modx->lexicon('app.access_denied', ['code' => 3]);
        }
    }

    public function checkPasswords()
    {
        if (empty($this->password)) {
            $this->addFieldError('password', 
                $this->modx->lexicon('app.auth_form_password_is_empty'));
            return false;
        }

        $minLength = $this->modx->getOption('password_min_length', 0);
        if ($minLength > 0) {
            if (strlen($this->password) < $minLength) {
                $this->addFieldError('password', 
                    $this->modx->lexicon('app.auth_form_password_less_min_length'));
                return false;
            }
        }

        if (empty($this->passwordAgain)) {
            $this->addFieldError('password_again', 
                $this->modx->lexicon('app.auth_form_password_again_is_empty'));
            return false;
        }

        if (strcmp($this->password, $this->passwordAgain) != 0) {
            $this->addFieldError('password_again', 
                $this->modx->lexicon('app.auth_form_passwords_not_match'));
            return false;
        }

        return true;
    }

    public function changePassword()
    {
        $this->user->set('password', $this->password);
        if (!$this->user->save()) {
            return $this->modx->lexicon('app.unknown_err', ['code' => 1]);
        }
    }
}

return ResetProcessor::class;