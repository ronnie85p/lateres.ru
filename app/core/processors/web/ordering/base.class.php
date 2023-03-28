<?php

namespace App\Processors\Web\Ordering;
use MODX\Revolution\modX;
use MODX\Revolution\Processors\Processor;

class BaseProcessor extends Processor
{
    public $app;
    public $order;

    public function __construct(modX $modx,array $properties = []) {
        $this->modx =& $modx;
        $this->app = $this->modx->services->get('app');
        $this->order = $this->app->getService('order', \App\Order::class);

        $this->setProperties($properties);
    }

    public function process()
    {
        return $this->success();
    }

    public function getLanguageTopics() {
        return ['app:order', 'app:ordering', 'app'];
    }

    public function getCartItems()
    {
        $response = $this->app->runProcessor('web/cart/getList', 
            $this->getProperties())
                ->getResponse();

        return $response['results'];
    }

    public function getItems()
    {
        $response = $this->app->runProcessor('web/ordering/getItems', 
            $this->getProperties())
                ->getResponse();

        return $response['results'];
    }

    public function getTotal()
    {
        $object = $this->app->runProcessor('web/ordering/getTotal', 
            $this->getProperties())
                ->getObject();

        return $object;
    }

    public function cleanup(array $data = [])
    { 
        return $this->success('', $data);
    }
}