<?php

namespace WF\Shop\Controllers;

require_once __DIR__ . '/web.class.php';

class OrderController extends \WF\Shop\Controllers\WebController
{
    public $order;

    public function initialize() 
    { 
        $this->order = $this->modx->services->get('wf_order');
        if (!$this->order->initialize()) {
            return false;
        }

        return parent::initialize(); 
    }
}