<?php

namespace App\Processors\Web\Profile\Address;
use MODX\Revolution\Processors\Processor;

class Check extends Processor
{
    public $classKey = \App\Model\Profile\Address::class;
    public $beforeSaveEvent = 'onAppProfileAddressBeforeSave';
    public $afterSaveEvent = 'onAppProfileAddressAfterSave';

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        return parent::initialize();
    }

    public function process()
    {
        $count = $this->modx->getCount($this->classKey, [
            'user_id' => $this->modx->user->get('id')
        ]);

        return $this->success('', ['count' => $count]);
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }
}

return Check::class;
