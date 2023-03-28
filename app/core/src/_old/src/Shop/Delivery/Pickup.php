<?php

namespace WF\Shop\Delivery;

use MODX\Revolution\modX;

require 'IDelivery.php';

class Pickup extends \WF\Shop implements \WF\Shop\Delivery\IDelivery
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    public function validate()
    {
        return true;
    }
}