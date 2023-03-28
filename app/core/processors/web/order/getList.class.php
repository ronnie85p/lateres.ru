<?php

namespace App\Processors\Web\Order;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $app;
    public $order;
    public $classKey = \msOrder::class;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');
        $this->order = $this->app->getService('order', \App\Order::class);

        $this->setDefaultProperties([
            'sort' => 'createdon',
            'dir' => 'DESC',
            'start' => 0,
            'limit' => 20,
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:order', 'app'];
    }

    public function beforeQuery()
    {
        return true;
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        return $c;
    }

    public function prepareQueryAfterCount(\xPDOQuery $c)
    {
        return $c;
    }

    public function afterIteration(array $list)
    {
        foreach ($list as &$item) {
            $item = $this->order->from($item['id']);
        } 

        return $list;
    }

    public function outputArray(array $array, $count = false)
    {
        return json_decode(
            parent::outputArray($array, $count)
            , true
        );
    }
}

return GetList::class;