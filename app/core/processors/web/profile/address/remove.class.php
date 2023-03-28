<?php

namespace App\Processors\Web\Profile\Address;
use MODX\Revolution\Processors\Model\RemoveProcessor;

class Remove extends RemoveProcessor
{
    public $classKey = \App\Model\Profile\Address::class;
    public $primaryKeyField = 'where';
    public $beforeSaveEvent = 'onAppProfileAddressBeforeRemove';
    public $afterSaveEvent = 'onAppProfileAddressAfterRemove';

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->setProperties([
            'where' => [
                'id' => $this->getProperty('id'),
                'user_id' => $this->modx->user->id,
            ],
        ]);

        return parent::initialize();
    }

    public function afterRemove()
    {
        $extended = $this->modx->user->Profile->get('extended')?:[];
        $isDefault = (int)$extended['delivery_address'] === $this->object->get('id');

        if ($isDefault) {
            $q = $this->modx->newQuery($this->classKey);
            $q->where(['user_id' => $this->modx->user->get('id')]);
            $q->sortby('createdon', 'DESC');

            $object = $this->modx->getObject($this->classKey, $q);
            if ($object) {
                $extended['delivery_address'] = $object->get('id');
                $this->modx->user->Profile->set('extended', $extended);
                $this->modx->user->Profile->save();
            }
        }
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function success($msg = '', $object = [])
    {
        return parent::success(
            $this->modx->lexicon('app.profile_address_removed'),
            [ 'id' => $this->object->get('id') ]
        );
    }
}

return Remove::class;
