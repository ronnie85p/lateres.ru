<?php


namespace App\Processors\Web\Order\Offer;
use MODX\Revolution\Processors\Processor;

class Get extends Processor
{
    public $app;

    public function initialize()
    {
        $this->app = $this->modx->services->get('app');

        return parent::initialize();
    }

    public function process()
    {
        $order = $this->app->getService('order', \App\Order::class);
        $offer = $this->app->getService('offer', \App\Order\Offer::class, 
            $this->getProperties());

        $items = $this->getItems();
        $total = $this->getTotal();
        $data =  $order->prepare(array_merge($this->getProperties(), [
            'items' => $items,
            'total' => $total,
        ]));
        
        $msOrder = $order->build($data);
        $array = $order->from($msOrder);
        $url = $offer->generateResourceURL($array);

        return $this->success('', [
            'url' => $url
        ]);
    }

    public function getLanguageTopics() {
        return ['app:order', 'app'];
    }

    public function getItems()
    {
        $response = $this->app->runProcessor('web/ordering/getItems')
            ->getResponse();

        return $response['results'];
    }

    public function getTotal()
    {
        $object = $this->app->runProcessor('web/ordering/getTotal', 
            $this->getProperties())->getObject();

        return $object;
    }
}

return Get::class;