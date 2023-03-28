<?php

namespace WF\Shop\Processors\Order;

require_once dirname(__DIR__) . '/order.class.php';

class SetSalesTaxProcessor extends \WF\Shop\Processors\OrderProcessor
{
    public function initialize()
    {
        return parent::initialize();
    }

    public function process()
    {
        $this->order->setSalesTax(
            !(int)$this->getProperty('withTax')
        );

        return $this->success();
    }
}

return 'WF\\Shop\\Processors\\Order\\SetSalesTaxProcessor';