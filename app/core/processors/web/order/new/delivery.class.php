<?php

/**
 * Prepare an order
 * Форма оформления заказа
 */

namespace App\Processors\Web\Preorder;

require_once __DIR__ . '/base.class.php';

class DeliveryProcessor extends BaseProcessor
{
    public $delivery;
    public $payments;

    public function initialize()
    {
        $this->deliveryId = $this->getProperty('delivery_id', 1);

        return parent::initialize();
    }

    public function process()
    {
        $this->getDelivery();
        $this->getPayments();

        return $this->cleanup();
    }

    public function getDelivery()
    {
        $response = $this->app->runProcessor(
            'web/delivery/get', 
            [ 'id' => $this->deliveryId ]
        );

        $this->delivery = $response->getObject();
    }

    public function getPayments()
    {
        $response = $this->app->runProcessor(
            'web/delivery/payment/getList', 
            [ 'delivery_id' => $this->deliveryId ]
        );

        $response = $response->getResponse();
        $this->payments = $response['results'];
    }

    public function cleanup()
    {
        return [
            'success' => true,
            'delivery' => $this->delivery,
            'payments' => $this->payments,
        ];
    }
}

return DeliveryProcessor::class;