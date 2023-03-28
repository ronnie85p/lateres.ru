<?php

namespace App\Processors\Web\Profile\Email;
use MODX\Revolution\Processors\Processor;

class SendCode extends Processor
{
    public $app;

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->app = $this->modx->services->get('app');
        $this->givenEmail = trim($this->getProperty('email'));

        $this->setProperties([
            'validation' => [
                'email' => ['required', 'email']
            ]
        ]);

        return parent::initialize();
    }

    public function process()
    {
        if ($this->validate() !== true) {
            return $this->failure();
        }

        if ($this->doesAlreadyExist() !== true) {
            return $this->failure();
        }

        $response = $this->app->runProcessor('web/auth/code/send', $this->getProperties());
        if ($response->isError()) {
            return $this->failure($response->getMessage());
        }

        $_SESSION['app.profile_email'] = $this->givenEmail;

        return $this->cleanup($response->getObject());
    }

    public function validate()
    {
        $validator = $this->app->getValidator();

        if (!$validator->validate($this->getProperties(), 
            $this->getProperty('validation'))) {
            return false;
        }

        return true;
    }

    public function doesAlreadyExist()
    {
        if ($this->modx->getCount(\modUserProfile::class, 
            ['email' => $this->givenEmail]) > 0) {
                $this->addFieldError('email', $this->modx->lexicon('app.profile_email_already_exists'));
                return false;
            }
        
        return true;
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function cleanup($object)
    {
        return $this->success('', $object);
    }
}

return SendCode::class;
