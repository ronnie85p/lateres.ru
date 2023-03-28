<?php

namespace App\Processors\Web\Resource\Visit;
use MODX\Revolution\Processors\Model;

class GetListProcessor extends Model\GetListProcessor
{
    public $classKey = \App\Model\Resource\Visit::class;
    public $primaryKeyField = 'where';

    public function initialize() 
    {
        $where = [];

        if ($this->modx->user->isAuthenticated('web')) {
            $where['user_id'] = $this->modx->user->id;
        } else {
            $where['ssid'] = session_id();
        }  

        $this->setProperties([
            'start' => $this->getProperty('start', 0),
            'limit' => 20, 
            'sort' => 'timestamp', 
            'dir' => 'ASC', 
            'where' => $where,
        ]);

        return parent::initialize();
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $c->where($this->getProperty('where'));
        return $c;
    }

    public function afterIteration(array $list)
    {
        $out = [];
        foreach ($list as $item) {
            $object = $this->modx->getObject(\modResource::class, $item['resource_id']);
            if ($object) {
                $item = array_merge($item, $object->toArray(), $object->get('properties')?:[]);
                $img = $object->getTVValue('img');
                $url = strpos($img, "assets") === false ? 
                    "https://309921.selcdn.ru/l-s-ru/" : 
                    "https://www.lateres.ru/";

                $item['image'] = $url . $img;
                $item['price'] = $object->getTVValue('price');
                $item['old_price'] = $object->getTVValue('old_price');

                $out[] = $item;
            }
        }

        return $out;
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

return GetListProcessor::class;

