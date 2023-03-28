<?php

/**
 * Prepare an order
 * Форма оформления заказа
 */

namespace App\Processors\Web\Preorder;

use MODX\Revolution\Processors\Processor;

class SetTaxProcessor extends Processor
{
    public function initialize()
    {
        $this->taxIncluded = (int) $this->getProperty('tax_included', false);
        $this->defaultTaxRate = (float) $this->modx->getOption('app.tax_rate', null, 20);

        return parent::initialize();
    }

    public function process()
    {
        $total = $this->getOrder('total');
        $items = $this->getOrder('items');

        $cartCost = $cartSalesTax = 0;
        foreach ($items as &$item) {
            $product = $this->modx->getObject(\msProduct::class, [
                'id' => $item['product_id'],
                'published' => 1,
                'deleted' => 0,
            ]);
            
            if ($product) {
                $cost = $item['price'] * $item['count'];

                $taxRate = $salesTax = 0;
                if ((int) $this->taxIncluded === 1) {
                    $taxRate = $product->getTVValue('tax_rate');
                    $taxRate = empty($taxRate) ? $this->defaultTaxRate : $taxRate;
                    $salesTax = $cost / 100 * $taxRate;
                }

                $item['tax_rate'] = $taxRate;
                $item['sales_tax'] = $salesTax;
                $item['cost'] = $cost + $salesTax;

                $cartCost += $item['cost'];
                $cartSalesTax += $salesTax;
            } else {
                $item['published'] = 0;
            }
        }

        $total['cart_cost'] = $cartCost;
        $total['cost'] = $cartCost + $cartSalesTax + (float) $total['delivery_cost'];

        $this->saveOrder([
            'tax_included' => $taxIncluded,
            'items' => $items,
            'total' => $total,
        ]);
    
        return $this->success();
    }
}

return SetTaxProcessor::class;