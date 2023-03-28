<?php

namespace App\Processors\Web\Favorite;
use MODX\Revolution\Processors\Model\RemoveProcessor;

class Remove extends RemoveProcessor
{
    public $classKey = \App\Model\Resource\Favorite::class;
    public $primaryKeyField = 'where';
    public $beforeRemoveEvent = 'onAppProductFavoriteBeforeRemove';
    public $afterRemoveEvent = 'onAppProductFavoriteAfterRemove';

    public function initialize() 
    {
        $this->setProperties([
            'where' => [
                'user_id' => $this->modx->user->id,
                'resource_id' => $this->getProperty('product_id'),
            ],
        ]);

        return parent::initialize();
    }

    public function success($msg = '', $object = null)
    {
        return parent::success(
            $this->modx->lexicon('app.product_favorite_removed'));
    }
}

return Remove::class;