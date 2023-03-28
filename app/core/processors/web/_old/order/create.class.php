<?php

namespace WF\Shop\Processors\Order;

require_once dirname(__DIR__) . '/order.class.php';

class CreateProcessor extends \WF\Shop\Processors\OrderProcessor
{
    public function initialize()
    {
        return parent::initialize();
    }

    public function process()
    {
        $prevent = $this->validate();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $this->prepareFields();
        $this->setFields();

        if (!$result = $this->order->create()) {
            return $this->failure('err');
        }

        return $this->success('Test mode', ['result' => $result]);
    }

    public function validate()
    {
        if (!$this->order->hasItems()) {
            return $this->modx->lexicon('has_not_items');
        }

        $prevent = $this->checkDelivery();
        if (!empty($prevent)) {
            return $prevent;
        }

        $prevenet = $this->checkPayment();
        if (!empty($prevent)) {
            return $prevent;
        }
    }

    public function checkDelivery()
    {
        $delivery = $this->modx->getObject('msDelivery', [
            'id' => $this->getProperty('delivery'),
            'active' => 1
        ]);

        if (!$delivery) {
            return $this->modx->lexicon('delivery_not_found');
        }

        // $deliveryBuilder = $this->order->getService(null, 'Shop\\Delivery\\Builder');

        // if (!$deliveryBuilder->getDelivery($this->getProperty('delivery'))) {
        //     return $this->modx->lexicon('delivery_not_found');
        // }

        // $delivery = $deliveryBuilder->build();  
        // if (!$delivery) {
        //     return $this->modx->lexicon('delivery_err');
        // }   

        // $prevent = $delivery->validate();
        // if ($prevent !== true) {
        //     return $prevent;
        // }
    }

    public function checkPayment()
    {
        $payment = $this->modx->getObject('msPayment', [
            'id' => $this->getProperty('payment'), 
            'active' => true
        ]);

        if (!$payment) {
            return $this->modx->lexicon('payment_not_found');
        }
    }


    public function checkProducts()
    {

    }

    public function prepareFields()
    {
        $properties = $this->getProperties();
        $properties['delivery'] = (int) $properties['delivery'];
        $properties['payment'] = (int) $properties['payment'];
        $properties['with_tax'] = (int) $properties['with_tax'];
        $properties['contract_required'] = (int) $properties['contract_required'];
        $properties['comment'] = substr(trim($properties['comment']), 0, 122);

        $this->setProperties($properties);
    }

    public function setFields() 
    {
        $this->order->set($this->getProperties(), true);
    }
}

return 'WF\\Shop\\Processors\\Order\\CreateProcessor';