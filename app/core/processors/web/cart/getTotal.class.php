<?php

namespace App\Processors\Web\Cart;
require_once __DIR__ . '/base.class.php';

class GetTotal extends BaseProcessor
{
    public function initialize()
    {
        $this->setProperties([
            'all' => false,
        ]);

        return parent::initialize();
    }

    public function process()
    {    
        $total = [
            'old_cost' => 0,
            'discount' => 0,
            'sales_tax' => 0,
            'net_sales' => 0,
            'cost' => 0,
            'weight' => 0,
            'items' => 0,
            'count' => 0,
        ];

        $items = $this->getCartItems();
        foreach ($items as $item) {
            $total['old_cost'] += (float) $item['old_cost'];
            $total['discount'] += (float) $item['discount'];
            $total['net_sales'] += (float) $item['net_sales'];
            $total['sales_tax'] += (float) $item['sales_tax'];
            $total['cost'] += (float) $item['cost'];
            $total['weight'] += (float) $item['weight'];
            $total['count'] += (int) $item['count'];
            $total['items']++;
        }

        $total['old_cost_format'] = $this->app->formatPrice($total['old_cost'], true);
        $total['discount_format'] = $this->app->formatPrice($total['discount'], true);
        $total['net_sales_format'] = $this->app->formatPrice($total['net_sales'], true);
        $total['sales_tax_format'] = $this->app->formatPrice($total['sales_tax'], true);
        $total['cost_format'] = $this->app->formatPrice($total['cost'], true);
        $total['weight_format'] = $this->app->formatWeight($total['weight'], true);

        return $this->cleanup($total);
    }

    public function cleanup(array $data)
    { 
        return $this->success('', $data);
    }

    public function getCartItems()
    {
        $response = $this->app->runProcessor('web/cart/getList', 
            $this->getProperties())->getResponse();
            
        return $response['results'];
    }
}

return GetTotal::class;
