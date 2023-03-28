<?php

namespace App\Processors\Profile\Company;
use MODX\Revolution\Processors\Model\RemoveProcessor;

class Remove extends RemoveProcessor
{
    public $classKey = \App\Model\Profile\Company::class;
    public $primaryKeyField = 'where';
    public $beforeSaveEvent = 'onAppProfileCompanyBeforeRemove';
    public $afterSaveEvent = 'onAppProfileCompanyAfterRemove';

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->setProperties([
            'where' => [
                'user_id' => $this->modx->user->get('id'),
            ],
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function success($msg = '', $object = [])
    {
        return parent::success(
            $this->modx->lexicon('app.profile_company_removed'),
            [ 'id' => $this->object->get('id') ]
        );
    }
}

return Remove::class;
