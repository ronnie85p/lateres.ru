<?php

/**
 * Prepare an order
 * Форма оформления заказа
 */

namespace App\Processors\Web\Preorder;

require_once __DIR__ . '/base.class.php';

class GetTotalProcessor extends BaseProcessor
{
    public function initialize()
    {
        return parent::initialize();
    }

    public function process()
    {
        return $this->success();
    }

    public function success($msg = '', $object = null)
    {
        $total = $this->getOrder('total');

        return [
            'succcess' => true,
            'total' => $total,
        ];
    }
}

return GetTotalProcessor::class;