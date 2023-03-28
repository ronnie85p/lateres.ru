<?php

namespace App\Processors\Web\Profile\Phone;
use MODX\Revolution\Processors\Model\RemoveProcessor;

class Remove extends RemoveProcessor
{
    public $classKey = \App\Model\Profile\Phone::class;
    public $primaryKeyField = 'where';
    public $beforeSaveEvent = 'onAppProfilePhoneBeforeRemove';
    public $afterSaveEvent = 'onAppProfilePhoneAfterRemove';

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->setProperties([
            'where' => [
                'user_id' => $this->modx->user->get('id'),
                'id' => $this->getProperty('id'),
            ]
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function success($msg = '', $object = [])
    {
        return parent::success(
            $this->modx->lexicon('app.profile_phone_removed'),
            [ 'id' => $this->object->get('id') ]
        );
    }
}

return Remove::class;
