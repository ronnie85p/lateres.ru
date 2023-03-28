<?php

namespace App;
use MODX\Revolution\modX;

class Auth extends \App\Core
{
    function __construct(modX & $modx, array $config = [])
    {
        parent :: __construct($modx, $config);
        $this->modx->lexicon('app:auth');
    }

    public function checkPasswords($password, $passwordAgain)
    {
        if (empty($password)) {
            $this->addFieldError('password', 
                $this->modx->lexicon('app.auth_form_password_is_empty'));
            return false;
        }

        $minLength = $this->modx->getOption('password_min_length');
        if ($minLength > 0) {
            if (strlen($password) < $minLength) {
                $this->addFieldError('password', 
                    $this->modx->lexicon('app.auth_form_password_less_min_length'));
                return false;
            }
        }

        if (empty($passwordAgain)) {
            $this->addFieldError('password_again', 
                $this->modx->lexicon('app.auth_form_password_again_is_empty'));
            return false;
        }

        if (strcmp($password, $passwordAgain) != 0) {
            $this->addFieldError('password_again', 
                $this->modx->lexicon('app.auth_form_passwords_not_match'));
            return false;
        }

        return true;
    }

    public function checkUserExistsByPhone($phone)
    {
        if ($this->modx->getCount(modProfile::class, ['mobilephone' => $phone]) > 0) {
            return true;
        }

        if ($this->modx->getCount(\App\Model\Profile\Phone::class, $phone) > 0) {
            return true;
        }

        return false;
    }
}