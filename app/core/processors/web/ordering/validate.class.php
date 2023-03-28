<?php

namespace App\Processors\Web\Ordering;
require_once __DIR__ . '/base.class.php';

class Validate extends BaseProcessor
{
    public $total;

    public function process()
    {
        $this->total = $this->getTotal();

        $prevent = $this->hasItems();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $prevent = $this->checkMinCost();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $validated = $this->order->validate($this->getProperties());
        if ($validated !== true) {
            return $this->failure($validated === false ? '' : $validated);
        }

        return $this->success();
    }

    public function hasItems()
    {
        if (empty($this->total['cost'])) {
            return $this->modx->lexicon('app.ordering_items_is_empty');
        }
    }

    public function checkMinCost() 
    {
        $cost = $this->total['cost'] - $this->total['delivery_cost'] - $this->total['sales_tax'];
        $minCost = (float) $this->modx->getOption('app.ordering_cost_from');
        if ($cost < $minCost) {
            return $this->modx->lexicon('app.ordering_less_min_cost');
        } 
    }
}

return Validate::class;