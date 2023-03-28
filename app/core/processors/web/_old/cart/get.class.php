<?php

namespace WF\Shop\Processors\Cart;

require_once dirname(__DIR__) . '/cart.class.php';

class GetProcessor extends \WF\Shop\Processors\CartProcessor
{
    public function initialize()
    {
        return parent::initialize();
    }

    public function process()
    {
        $response = $this->cart->get($this->getProperty('id_'));

        return $this->success('Test mode', [
            'response' => $response
        ]);
    }
}

return 'WF\\Shop\\Processors\\Cart\\GetProcessor';