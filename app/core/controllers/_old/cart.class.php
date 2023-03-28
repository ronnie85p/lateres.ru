<?php

namespace WF\Shop\Controllers;

require_once __DIR__ . '/web.class.php';

class CartController extends \WF\Shop\Controllers\WebController
{
    public $cart;

    public function initialize() 
    { 
        $this->cart = $this->modx->services->get('wf_cart');
        if (!$this->cart->initialize()) {
            return false;
        }

        return parent::initialize(); 
    }
}