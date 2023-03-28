<?php

namespace App\Processors\Web\Profile\Address;
use MODX\Revolution\Processors\Model\GetProcessor;

class Get extends GetProcessor
{
    public $classKey = \App\Model\Profile\Address::class;
    public $primaryKeyField = 'where';

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->setProperties([
            'where' => [
                'user_id' => $this->modx->user->id,
                'id' => $this->getId(),
            ],
        ]);

        return parent::initialize();
    }

    public function getId()
    {
        $id = $this->getProperty('id');

        if (empty($this->getProperty('id'))) {
            $profile = $this->modx->user->getOne('Profile');
            $extended = $profile->get('extended') ?: [];
            $id = $extended['delivery_address'];
        }

        return $id;
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function beforeOutput()
    {
        $this->object = $this->object->toArray();

        $extended = $this->modx->user->Profile->get('extended') ?: [];
        $this->object['is_default'] = (int)$extended['delivery_address'] === $this->object['id'];
    }

    public function cleanup()
    {
        return $this->success('', $this->object);
    }
}

return Get::class;
