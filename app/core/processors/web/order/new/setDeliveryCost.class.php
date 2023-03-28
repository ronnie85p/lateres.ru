<?php

/**
 * Prepare an order
 * Форма оформления заказа
 */

namespace App\Processors\Web\Preorder;

use MODX\Revolution\Processors\Processor;

class SetDeliveryCostProcessor extends Processor
{
    public function initialize()
    {
        $this->deliveryCost = $this->getProperty('delivery_cost', 0);

        return parent::initialize();
    }

    public function process()
    {
        $total = $this->getOrder('total');

        $total['delivery_cost'] = $this->deliveryCost;
        $total['cost'] = $total['cart_cost'] + $total['delivery_cost'] + $total['sales_tax'];

        $this->saveOrder([
            'total' => $total,
        ]);
    
        return $this->success();
    }
}

return SetDeliveryCostProcessor::class;