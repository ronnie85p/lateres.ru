<?php

namespace App\Processors\Web\Favorite;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $app;
    public $product;
    public $classKey = \App\Model\Resource\Favorite::class;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');
        $this->product = $this->app->getService('product', \App\Product::class);

        $this->setDefaultProperties([
            'start' => 0,
            'limit' => 20,
            'sort' => 'timestamp',
            'dir' => 'ASC',
            'query' => ''
        ]);
        
        return parent::initialize();
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $c->where(['user_id' => $this->modx->user->id]);

        return $c;
    }

    public function afterIteration(array $list)
    {
        foreach ($list as &$item) {
            $object = $this->product->getObject($item['resource_id']);
            if ($object) {
                $item = $this->product->from($object);
            } else {
                $item['published'] = 0;
            }
        }

        return $list;
    }

    public function outputArray(array $array, $count = false)
    {
        return json_decode(parent::outputArray($array, $count), true);
    }
}

return GetList::class;