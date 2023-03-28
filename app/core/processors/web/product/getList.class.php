<?php

namespace App\Processors\Web\Category;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $app;
    public $product;

    public $classKey = \modResource::class;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');
        $this->product = $this->app->getService('product', \App\Product::class);

        $this->setDefaultProperties([
            'start' => 0,
            'limit' => 20,
            'sort' => 'publishedon',
            'dir' => 'DESC',
            'query' => '',
        ]);

        return parent::initialize();
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $ids = $this->modx->getChildIds($this->getProperty('parent'));
        $c->where([
            'id:IN' => $ids,
            'template' => 10,
            'published' => 1,
            'deleted' => 0,
        ]);

        if (!empty($this->getProperty('query'))) {
            $query = '%' . $this->getProperty('query') . '%';
            $c->where([
                'pagetitle:LIKE' => $query,
                'OR:longtitle:LIKE' => $query,
                'OR:description:LIKE' => $query,
            ]);
        }

        // $c->prepare();
        // $this->sql = $c->toSQL();

        return $c;
    }

    public function afterIteration(array $list)
    {
        foreach ($list as &$item) {
            $item = $this->product->from($item['id']);
        }

        return $list;
    }

    public function outputArray(array $array, $count = false)
    {
        return [
            'results' => $array,
            'total' => count($array),
            'success' => true,
        ];
    }
}

return GetList::class;

