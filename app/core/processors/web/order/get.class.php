<?php


namespace App\Processors\Web\Order;
use MODX\Revolution\Processors\Model\GetProcessor;

class Get extends GetProcessor
{
    public $app;
    public $order;

    public $classKey = \msOrder::class;
    public $primaryKeyField = 'where';

    public function initialize()
    {
        $this->app = $this->modx->services->get('app');
        $this->order = $this->app->getService('order', \App\Order::class);

        $this->setProperties([
            'where' => [
                'user_id' => $this->modx->user->id,
                'id' => $this->getProperty('id'),
            ]
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:order', 'app'];
    }

    public function beforeOutput()
    {
        $this->object = $this->order->from($this->object);
        $this->object['payments'] = $this->getPayments();
    }

    public function getPayments()
    {
        $response = $this->app->runProcessor('web/delivery/payment/getList', [
            'delivery_id' => $this->object['delivery']['id']
        ])->getResponse();

        return $response['results'];
    }

    public function cleanup()
    {
        return $this->success('', $this->object);
    }
}

return Get::class;