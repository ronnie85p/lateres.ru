<?php

namespace WF\Shop\Processors\Cart;

require_once dirname(__DIR__) . '/cart.class.php';

class ChangeProcessor extends \WF\Shop\Processors\CartProcessor
{
    public function initialize()
    {
        return parent::initialize();
    }

    public function process()
    {
        if ((int) $this->getProperty('count') > 0) {
            $response = $this->cart->change(
                $this->getProperty('id'), 
                $this->getProperty('count')
            );
        } else {
            $response = $this->cart->remove(
                $this->getProperty('id')
            );
        }

        return $response;
    }
}

return 'WF\\Shop\\Processors\\Cart\\ChangeProcessor';