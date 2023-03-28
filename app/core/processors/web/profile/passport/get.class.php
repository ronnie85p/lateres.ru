<?php

namespace App\Processors\Web\Profile\Passport;
use MODX\Revolution\Processors\Processor;

class GetProcessor extends Processor
{
    public $classKey = \App\Model\Profile\Passport::class;

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->object = $this->modx->getObject($this->classKey, 
            ['user_id' => $this->modx->user->get('id')]);
        $this->objectArray = $this->object ? $this->object->toArray() : [];

        return true;
    }

    public function process()
    {
        $this->prepareOutput();

        return $this->cleanup();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function prepareOutput()
    {
        $profile = $this->modx->user->getOne('Profile');
        $this->objectArray = array_merge($this->objectArray, [
            'fullname' => $profile->get('fullname'),
            'date_of_birth' => date('Y-m-d H:i:s', strtotime($profile->get('dob'))),
            'gender' => $profile->get('gender'),
        ]);
    }

    public function cleanup()
    {
        return $this->success('', $this->objectArray);
    }
}

return GetProcessor::class;
