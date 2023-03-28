<?php

namespace App\Processors\Web\Auth\Login\Settings;
use MODX\Revolution\Processors\Processor;

class Update extends Processor
{
    /**@var App\Core $app */
    public $app;
    public $profile;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');
        $this->profile = $this->modx->user->getOne("Profile");

        return parent::initialize();
    }

    public function getLanguageTopics()
    {
        return ['app:auth'];
    }

    public function process()
    {
        if ($this->validate() !== true) {
            return $this->failure();
        }

        $this->prepare();

        if ($this->profile->save() !== true) {
            return $this->failure($this->modx->lexicon('app.unknown_err', ['code' => 1]));
        }

        return $this->success($this->modx->lexicon('app.auth_login_settings_updated'));
    }

    public function validate()
    {
        if (!empty($this->getProperty('login_enabled'))) {
            $method = $this->modx->getObject(\App\Model\Auth\Login\Method::class, 
                $this->getProperty('login_method'));

            if (empty($method)) {
                $this->addFieldError('login_method',  $this->modx->lexicon('app.auth_login_method_required'));
                return false;
            }

            if (!empty($method->get('handle_class'))) {
                $handler = $this->app->getService('handler', $method->get('handle_class'));

                if (!empty($handler)) {
                    $validated = $handler->validate($this->getProperties());
                    if ($validated !== true) {
                        return $validated;
                    }
                }
            }
        }

        return true;
    }

    public function prepare()
    {
        $properties = $this->getProperties();
        $extended = $this->profile->get('extended') ?: [];

        $this->profile->set('extended', array_merge($extended, [
            'login_enabled' => (int) $properties['login_enabled'],
            'login_method' => (int) $properties['login_method'],
            'login_question' => (int) $properties['login_question'],
            'login_answer' => substr(trim($properties['login_answer']), 0, 50),
        ]));
    }
}

return Update::class;

