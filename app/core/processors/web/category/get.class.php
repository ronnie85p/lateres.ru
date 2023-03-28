<?php

namespace App\Processors\Web\Category;
use MODX\Revolution\Processors\Model\GetProcessor;

class Get extends GetProcessor 
{
    public $classKey = \modResource::class;
    public $primaryKeyField = 'where';

    public $total = [];
    public $categories = [];

    public function initialize() 
    {
        $template = 9;
        $uri = trim($this->getProperty('uri'), '/');
      
        $this->setProperties([
            'where' => [
                'uri:=' => $uri,
                'OR:uri:=' => $uri . '/',
                'template' => $template,
                'published' => 1,
                'deleted' => 0,
            ],
        ]);

        return parent::initialize();
    }

    public function beforeOutput()
    {
        $childIds = $this->modx->getChildIds($this->object->get('id'));

        $this->total = $this->modx->getCount($this->classKey, [
            'id:IN' => $childIds,
            'template' => 10,
            'published' => 1,
            'deleted' => 0,
        ]);

        $this->categories = $this->getCategories();
    }

    public function getCategories()
    {
        $q = $this->modx->newQuery($this->classKey);
        $q->select($this->modx->getSelectColumns($this->classKey));
        $q->where([
            'parent' => $this->object->get('id'),
            'template' => 9,
            'published' => 1,
            'deleted' => 0,
        ]);
        $q->sortby('menuindex', 'ASC');

        $results = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $results = $q->stmt->fetchAll(\PDO::FETCH_ASSOC);
        }

        return ['total' => count($results), 'list' => $results];
    }

    public function cleanup(array $data = [])
    {
        return $this->success('', [
            'resource' => $this->object->toArray(),
            'categories' => $this->categories,
            'products' => $this->total,
        ]);
    }
}

return Get::class;

