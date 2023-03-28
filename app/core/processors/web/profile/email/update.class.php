<?php

namespace App\Processors\Web\Profile\Email;
use MODX\Revolution\Processors\Processor;

class Update extends Processor
{
    public $app;

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->app = $this->modx->services->get('app');

        return parent::initialize();
    }

    public function process()
    {
        $response = $this->app->runProcessor('web/auth/code/verify', $this->getProperties());
        if ($response->isError()) {
            $this->addFieldError('code', $response->getMessage());
            return $this->failure();
        }

        $data = $response->getObject()['data'];

        $this->profile = $this->modx->user->getOne('Profile');
        $this->profile->set('email', $data['target']);

        if ($this->profile->save() !== true) {
            return $this->modx->lexicon('app.profile_email_err');
        }

        return $this->cleanup();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function cleanup()
    {
        return $this->success($this->modx->lexicon('app.profile_email_updated'));
    }
}

return Update::class;
