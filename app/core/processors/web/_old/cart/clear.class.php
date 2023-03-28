<?php

namespace WF\Shop\Processors\Cart;

require_once dirname(__DIR__) . '/cart.class.php';

class ClearProcessor extends \WF\Shop\Processors\CartProcessor
{
    public function initialize()
    {
        return parent::initialize();
    }

    public function process()
    {
        $response = $this->cart->clear();

        return $this->success('Test mode', [
            'response' => $response,
            'items' => $this->cart->get(),
            'total' => $this->cart->getTotal()
        ]);
    }
}

return 'WF\\Shop\\Processors\\Cart\\ClearProcessor';