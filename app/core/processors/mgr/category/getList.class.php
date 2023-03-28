<?php

namespace App\Processors\Mgr\Category;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $classKey = \modResource::class;
    public $primaryKeyField = 'where';

    public function initialize() 
    {
        $this->setDefaultProperties([
            'parent' => $this->modx->getOption('app.category_parent'),
            'published' => 1,
            'deleted' => 0,
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
        $properties = $this->getProperties();
        $properties[$this->primaryKeyField] = [
            'template' => $this->modx->getOption('app.category_template'),
            'parent' => $this->getProperty('parent'),
            'published' => $this->getProperty('published'),
            'deleted' => $this->getProperty('deleted'),
        ];

        $this->setProperties($properties);
        return parent::beforeQuery();
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $c->where($this->getProperty($this->primaryKeyField));

        return $c;
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

