<?php

namespace App\Processors\Web\Favorite;
use MODX\Revolution\Processors\Model\CreateProcessor;

class Create extends CreateProcessor
{
    public $app;
    public $product;

    public $classKey = \App\Model\Resource\Favorite::class;
    public $beforeSaveEvent = 'onAppProductFavoriteBeforeSave';
    public $afterSaveEvent = 'onAppProductFavoriteAfterSave';

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');
        $this->product = $this->app->getService('product', \App\Product::class);

        if (!$this->product->getObject($this->getProperty('product_id'))) {
            return $this->modx->lexicon('app.product_not_exists');
        }

        $criteria = [
            'user_id' => $this->modx->user->id,
            'resource_id' => $this->getProperty('product_id'),
        ];

        if ($this->doesAlreadyExist($criteria)) {
            return $this->modx->lexicon('app.product_favorite_сreated');
        }        

        return parent::initialize();
    }

    public function beforeSet()
    {
        $properties = $this->getProperties();
        $properties['resource_id'] = $this->getProperty('product_id');
        $properties['user_id'] = $this->modx->user->id;
        $properties['timestamp'] = time();

        $this->setProperties($properties);
        return true;
    }

    public function cleanup()
    {
        return $this->success(
            $this->modx->lexicon('app.product_favorite_сreated'),
            ['id' => $this->object->get('id')]
        );
    }
}

return Create::class;
