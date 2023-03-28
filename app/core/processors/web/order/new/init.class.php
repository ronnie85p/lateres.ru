<?php

/**
 * Prepare an order
 * Форма оформления заказа
 */

namespace App\Processors\Web\Preorder;

require_once __DIR__ . '/base.class.php';

class CreateProcessor extends BaseProcessor
{
    public $items;
    public $total;

    public function initialize()
    {
        return parent::initialize();
    }

    public function process()
    {
        $prevent = $this->getItems();
        if (!empty($prevent)) {
            return $prevent;
        }

        $prevent = $this->getTotal();
        if (!empty($prevent)) {
            return $prevent;
        }

        $this->saveOrder([
            'items' => $this->items,
            'total' => $this->total,
        ]);

        return $this->cleanup();
    }

    public function getItems()
    {
        $response = $this->app->runProcessor('web/cart/getList');
        if ($response->isError()) {
            return $response->getMessage();
        }

        $response = $response->getResponse();
        $this->items = $response['results'];
        if (empty($this->items)) {
            return $this->modx->lexicon('app.preorder_cart_is_empty');
        }
    }

    public function getTotal()
    {
        $response = $this->app->runProcessor('web/cart/getTotal');
        if ($response->isError()) {
            return $response->getMessage();
        }

        $total = $response->getObject();

        $this->total = [
            'weight' => $total['weight'],
            'cart_cost' => $total['cost'],
            'cost' => $total['cost'],
            'delivery_cost' => 0,
            'discount_value' => $total['discount'],
            'sales_tax' => $total['sales_tax'],
            'old_cost' => $total['old_cost'],
        ];
    }

    public function cleanup()
    {
        return $this->success('', [
            'data' => $this->getOrder(),
        ]);
    }
}

return CreateProcessor::class;