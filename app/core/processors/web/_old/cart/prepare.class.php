<?php

namespace WF\Shop\Processors\Cart;

require_once dirname(__DIR__) . '/cart.class.php';

class PrepareProcessor extends \WF\Shop\Processors\CartProcessor
{
    public $items = [];

    public function initialize()
    {
        $initialized = parent::initialize();
        if ($initialized !== true) {
            return $initialized;
        }

        $ids = explode(',', $this->getProperty('ids'));
        $items = $this->cart->get();

        if (!empty($ids)) {
            foreach ($items as $item) {
                if (in_array($item['id'], $ids)) {
                    $this->items[] = $item;
                }
            }
        }

        if (empty($this->items)) {
            return $this->modx->lexicon('wf_shop.cart_items_not_checked');
        }

        $this->total = $this->cart->getTotal($this->items);

        return true;
    }

    public function process()
    {
        $this->setOrder();

        return $this->cleanup();
    }

    public function setOrder()
    {
        $order = $this->modx->services->get('wf_order');
        $order->set(
            array_merge(
                $this->total, 
                [
                    'items' => $this->items
                ]
            ), 
            true
        );
    }

    public function cleanup()
    {
        return $this->success('', $this->prepareResponse());
    }

    public function prepareResponse() 
    {
        $returnUrl = $this->getProperty('returnUrl');
        $response = [];

        if (!empty($returnUrl)) {
            $response = ['url' => $returnUrl];
        }

        return $response;
    }
}

return 'WF\\Shop\\Processors\\Cart\\PrepareProcessor';