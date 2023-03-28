<?php

namespace App\Processors\Web\Profile;
use MODX\Revolution\Processors\Processor;

class Get extends Processor
{
    public $app;
    public $user;

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
        $this->getUser();
        $this->getPhones();
        $this->getCompany();

        return $this->cleanup();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function getUser()
    {
        $defaultPhone = $this->app->runProcessor('web/profile/phone/get')->getObject();
        $profile = $this->modx->user->getOne('Profile');
        $profile = array_merge($profile->toArray(), $profile->get('extended') ?: [], [
            'mobilephone_format' => !empty($defaultPhone) ? $defaultPhone['text'] : ''
        ]);
        
        $this->object = $profile;
    }

    public function getPhones()
    {
        $q = $this->modx->newQuery(\App\Model\Profile\Phone::class);
        $q->select($this->modx->getSelectColumns(\App\Model\Profile\Phone::class));
        $q->where([
            'user_id' => $this->modx->user->get('id')
        ]);
        $q->sortby('createdon', 'ASC');

        $phones = [];
        $objects = $this->modx->getCollection(\App\Model\Profile\Phone::class, $q);
        foreach ($objects as $object) {
            $phones[] = array_merge($object->toArray(), [
                'is_default' => $this->object['mobilephone'] === $object->get('id')
            ]);
        }

        $this->object['phones'] = $phones;
    }

    public function getCompany()
    {   
        $object = $this->app->runProcessor('web/profile/company/get')->getObject();
        $this->object['company'] = $object;
    }

    public function cleanup()
    {
        return $this->success('', $this->object);
    }
}

return Get::class;
