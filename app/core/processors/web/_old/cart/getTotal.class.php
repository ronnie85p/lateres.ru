<?php

namespace WF\Shop\Processors\Cart;

require_once dirname(__DIR__) . '/cart.class.php';

class GetTotalProcessor extends \WF\Shop\Processors\CartProcessor
{
    public function initialize()
    {
        $this->ids = explode(',', $this->getProperty('ids'));

        return parent::initialize();
    }

    public function process()
    {
        $items = $this->cart->get();
        $results = [];
        foreach ($items as $item) {
            if (in_array($item['id'], $ids)) {
                $results[] = $item;
            }
        }

        $total = $this->cart->getTotal($results);
        return $this->success('Test mode', $total);
    }
}

return 'WF\\Shop\\Processors\\Cart\\GetTotalProcessor';