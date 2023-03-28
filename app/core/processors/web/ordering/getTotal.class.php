<?php

namespace App\Processors\Web\Ordering;
require_once __DIR__ . '/base.class.php';

class GetTotal extends BaseProcessor
{
    public function process()
    {
        $items = $this->getItems();
        $total = $this->order->getTotal($items, $this->getProperties());

        return $this->cleanup($total);
    }
}

return GetTotal::class;
