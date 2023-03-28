<?php

namespace WF\Shop\Delivery;

use MODX\Revolution\modX;

require 'IDelivery.php';

class Company extends \WF\Shop implements \WF\Shop\Delivery\IDelivery
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    public function validate($data)
    {

        // $recipient = $this->order->getRecipient();
        // if (empty($recipient->getAddress())) {
        //     return $this->modx->lexicon('has_not_address');
        // }

        return true;
    }

    public function checkDeliveryCar()
    {
        // return !empty($this->get('delivery_car'));
    }
}