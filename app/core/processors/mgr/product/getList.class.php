<?php

namespace App\Processors\Mgr\Product;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $classKey = \modResource::class;
    public $primaryKeyField = 'where';

    public function initialize() 
    {
        $this->setDefaultProperties([
            'parent' => $this->modx->getOption('app.category_parent'),
            'start' => 0,
            'limit' => 20,
            'sort' => 'createdon',
            'dir' => 'DESC',
            'query' => '',
        ]);

        return parent::initialize();
    }

    public function beforeQuery()
    {
        $category = $this->modx->getObject($this->classKey, [
            'id' => $this->getProperty('parent'),
            'template:=' => $this->modx->getOption('app.category_template'),
            'OR:template:=' => $this->modx->getOption('app.category_parent_template'),
            'published' => 1,
            'deleted' => 0,
        ]);

        if (empty($category)) {
            return $this->modx->lexicon('app.category_not_found');
        }

        $childIds = $this->modx->getChildIds($category->get('id'));

        $properties = $this->getProperties();
        $properties[$this->primaryKeyField] = [
            'id:IN' => $childIds,
            'template' => $this->modx->getOption('app.product_template'),
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
        foreach ($list as &$item) {
            $object = $this->modx->getObject($this->classKey, $item['id']);
            $img = $object->getTVValue('img');
            $url = strpos($img, "assets") === false ? 
                "https://309921.selcdn.ru/l-s-ru/" : 
                "https://www.lateres.ru/";

            $item['image'] = $url . $img;
            $item['price'] = $object->getTVValue('price');
            $item['old_price'] = $object->getTVValue('old_price');

            $parentIds = $this->modx->getParentIds($item['id']);
            asort($parentIds);

            $parents = [];
            foreach ($parentIds as $id) {
                $parent = $this->modx->getObject(\modResource::class, $id);
                if ($parent) {
                    $parent = $parent->toArray();
                    $parents[] = $parent;
                }
            }

            $item['parents'] = $parents;
        }

        return $list;
    }

    public function outputArray(array $array, $count = false)
    {
        return [
            'sql' => $this->sql,
            'results' => $array,
            'total' => count($array),
            'success' => true,
        ];
    }
}

return GetList::class;

