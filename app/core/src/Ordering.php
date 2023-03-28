<?php

namespace App\Order;
use MODX\Revolution\modX;

class Ordering extends \App\Core
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    public function initialize(array $data)
    {
        $weight = 0;
        $cartCost = 0;
        $deliveryCost = 0;
        $deliveryDistance = 0;
        $deliveryCars = 0;
        $salesTax = 0;
        $deliveryCars = 0;

        $this->setFields(array_merge($data, [
            'context' => 'web',
            'createdon' => time(),
            'user_id' => $this->modx->user->get('id'),
            'num' => $this->getNum(),
            'cart_cost' => $cartCost,
            'delivery_cost' => $deliveryCost,
            'order_cost' => $cartCost + $salesTax + $deliveryCost,
            'weight' => $weight,
            'payment' => (int) $data['payment'],
            'delivery' => (int) $data['delivery'],
            'order_comment' => trim($data['comment']),
            'properties' => [
                'delivery_car' => (int) $data['delivery_car'],
                'delivery_cars' => $deliveryCars,
                'delivery_distance' => $deliveryDistance,
                'sales_tax' => $salesTax,
            ],
        ]));

        return true;
    }

    public function getNum()
    {
        return date('Ymd');
    }

    public function getDelivery()
    {
        $response = $this->runProcessor('web/delivery/get', [
            'id' => $this->getField('delivery'),
        ]);

        if ($response->isError()) {
            return $response->getMessage();
        }

        $this->delivery = $response->getObject();
    }

    public function getDeliveryCar()
    {
        $response = $this->runProcessor('web/delivery/car/get', [
            'id' => $this->getField('delivery_car'),
        ]);

        if ($response->isError()) {
            return $response->getMessage();
        }

        $this->deliveryCar = $response->getObject();
    }

    public function getAddress()
    {
        $response = $this->runProcessor('web/profile/address/get');
        if ($response->isError()) {
            return $response->getMessage();
        }

        $this->address = $this->modx->newObject(\msOrderAddress::class, 
            array_merge($response->getObject(), [
                'createdon' => time(),
            ])
        );
    }

    public function getProducts()
    {
        $items = [];
        $products = [];
        foreach ($items as $item) {
            $product = $this->modx->newObject(\msOrderProduct::class, [

            ]);

            $products[] = $product;
        }

        $this->orderProducts = $products;
    }

    public function getPayment()
    {
        $response = $this->runProcessor('web/payment/get', [
            'id' => $this->getField('payment'),
        ]);

        if ($response->isError()) {
            return $response->getMessage();
        }

        $this->payment = $response->getObject();
    }

    public function getRecipient()
    {
        $profile = $this->modx->user->getOne('Profile');
        $settings = $this->modx->user->getSettings();
        
        $fields = [
            'fullname' => $profile->get('fullname'),
            'mobilephone' => $profile->get('mobilephone'),
            'email' => $profile->get('email'),
            'type' => (int) $settings['user_type'],
        ];

        if ((int) $settings['user_type'] === 1) {
            $response = $this->runProcessor('web/profile/company/get');
            if ($response->isError()) {
                return $response->getMessage();
            }

            foreach ($response->getObject() as $k => $v) {
                $fields["company_{$k}"] = $v;
            }
        }

        $this->recipient = $fields;
    }

    public function setObjects()
    {
        $properties = $this->getField('properties', []);
        foreach ($this->recipient as $k => $v) {
            $properties["recipient_{$k}"] = $v;
        }

        $this->setField('properties', $properties);
    }

    public function buildOrder(array $data)
    {
        $prevent = $this->initialize($data);
        if ($prevent !== true) {
            return $prevent;
        }
      
        $prevent = $this->getProducts();
        if (!empty($prevent)) {
            return $prevent;
        }

        $prevent = $this->getDelivery();
        if (!empty($prevent)) {
            return $prevent;
        }

        if ($this->getField('delivery') === 2) {
            $prevent = $this->getAddress();
            if (!empty($prevent)) {
                return $prevent;
            }

            $prevent = $this->getDeliveryCar();
            if (!empty($prevent)) {
                return $prevent;
            }
        }

        $prevent = $this->getRecipient();
        if (!empty($prevent)) {
            return $prevent;
        }

        $prevent = $this->getPayment();
        if (!empty($prevent)) {
            return $prevent;
        }

        $this->setObjects();

        $this->object = $this->modx->newObject(\msOrder::class);
        $this->object->fromArray($this->getFields());

        $this->object->addOne($this->address);
        $this->object->addMany($this->products);

        return $this->object;
    }
}