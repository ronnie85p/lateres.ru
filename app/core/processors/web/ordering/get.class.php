<?php

namespace App\Processors\Web\Ordering;
require_once __DIR__ . '/base.class.php';

class Get extends BaseProcessor
{
    public $object = [];

    public function initialize() 
    {
        $this->object['items'] = $this->getItems();
        if (empty($this->object['items'])) {
            return $this->modx->lexicon('app.ordering_cart_empty');
        }

        $this->object['work_times'] = [
            '08:00',
            '08:30',
            '09:00',
            '09:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30'
        ];

        return parent::initialize();
    }

    public function process()
    {
        $this->getSettings();
        $this->getDeliveries();
        $this->getDeliveryCars();
        $this->getAddress();
        $this->getRecipient();

        return $this->cleanup();
    }

    public function getSettings()
    {
        $settings = $this->modx->user->getSettings();
        $delivery = empty($settings['order_delivery']) ? 1 : $settings['order_delivery'];
        $payment = empty($settings['order_payment']) ? 1 : $settings['order_payment'];

        $this->object['settings'] = [
            'delivery' => $delivery,
            'payment' => $payment,
        ];
    }

    public function getDeliveries()
    {
        $response = $this->app->runProcessor('web/delivery/getList');
        if (!$response->isError()) {
            $this->object['deliveries'] = $response->getResponse()['results'];
        }
    }

    public function getDeliveryCars()
    {
        $response = $this->app->runProcessor('web/delivery/car/getList');
        if (!$response->isError()) {
            $this->object['delivery_cars'] = $response->getResponse()['results'];
        }
    }

    public function getAddress()
    {
        $this->object['address'] = $this->order->getUserAddress();
    }

    public function getRecipient()
    {
        $this->object['recipient'] = $this->order->getUserProfile();
    }

    public function cleanup(array $data = [])
    {
        return parent::cleanup($this->object);
    }
}

return Get::class;
