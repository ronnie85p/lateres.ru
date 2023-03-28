<?php

namespace App\Processors\Mgr\Product\Settings;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $classKey = \modResource::class;
    public $primaryKeyField = 'where';

    public function initialize() 
    {
        $this->setDefaultProperties([
            'path' => '',
            'start' => 0,
            'limit' => 20,
            'sort' => 'menuindex',
            'dir' => 'ASC',
            'query' => '',
        ]);

        return parent::initialize();
    }

    public function beforeQuery()
    {
        $uri = 'product-settings/' . trim($this->getProperty('path'), '/');
        if (!$parent = $this->modx->findResource($uri)) {
            $parent = $this->modx->findResource($uri . '/');
        }

        if ($parent === false) {
            return false;
        }

        $properties = $this->getProperties();
        $properties[$this->primaryKeyField] = [
            'parent' => $parent,
        ];

        $this->setProperties($properties);
        return parent::beforeQuery();
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $c->where($this->getProperty($this->primaryKeyField));

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
        $newList = [];
        foreach ($list as $item) {
            $newList[] = ['value' => $item['id'], 'text' => $item['pagetitle']];
        }

        return $newList;
    }

    public function outputArray(array $array, $count = false)
    {
        return [
            'results' => $array,
            'total' => count($array),
            'props' => $this->getProperties(),
            'aliasMap' => $this->modx->aliasMap,
            'success' => true,
        ];
    }
}

return GetList::class;

