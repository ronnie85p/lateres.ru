<?php

namespace App\Processors\Web\Cart;
use MODX\Revolution\Processors\Processor;

class BaseProcessor extends Processor
{
    /**@var App\Core $app */
    public $app;

    /**@var \App\Cart\Handlers\DBHandler | \App\Cart\Handlers\SessionHandler $handler */
    public $handler;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');

        $className = $this->modx->user->isAuthenticated('web') 
            ? \App\Cart\Handlers\DatabaseHandler::class
            : \App\Cart\Handlers\SessionHandler::class;

        $this->handler = $this->app->getService('handler', $className, 
            $this->getProperties());

        return parent::initialize();
    }

    public function process() 
    {   
        return $this->cleanup();
    }

    public function getLanguageTopics()
    {
        return ['app:cart'];
    }

    public function getProduct($id)
    {
        return $this->modx->getObject(\modResource::class, [
            'id' => $id,
            'template' => $this->modx->getOption('app.product_template'),
            'published' => 1,
            'deleted' => 0,
        ]);
    }

    public function fromProduct($id)
    {
        $product = [];
        $object = $this->getProduct($id);
        if (!empty($object)) {
            $product = $this->app->toArray($object, true, 'properties');
            $product['discount'] = empty($product['discount']) ? 0 : $product['discount'];
            $product['tax_rate'] = empty($product['tax_rate']) ? $this->getProperty('tax_rate', 20) : $product['tax_rate'];
            $product['sales_tax'] = 0;
    
            $price = (float) $product['price'];
            $oldPrice = (float) $product['old_price'];
    
            if ($oldPrice < $price) {
                $product['discount'] = $price - $oldPrice;
            }
    
            if ((int) $this->getProperty('include_tax_rate', 0)) {
                $product['sales_tax'] = $price / 100 * (int) $product['tax_rate'];
            }
        } else {
            $product['deleted'] = 1;
        }

        return $product;
    }

    public function getCartItemSummary(array $item)
    {
        $count = (int) $item['count'];
        $price = (float) $item['price'];
        $salesTax = (float) $item['sales_tax'];

        return [
            'old_cost' => (float) $item['old_price'] * $count,
            'net_sales' => (float) $price * $count,
            'cost' => ( (float) $price + $salesTax ) * $count,
            'weight' => (float) $item['weight'] * $count,
            'discount' => (float) $item['discount'] * $count,
            'sales_tax' => (float) $salesTax * $count,
        ];
    }

    public function prepareItem(&$item)
    {
        $product = $this->modx->getObject(\modResource::class, [
            'id' => $item['product_id'],
            'published' => 1,
            'deleted' => 0,
        ]);

        if ($product) {
            $count = (int) $item['count'];
            $weightPerUnit = (float) $product->getTVValue('weight');
            $price = (float) $product->getTVValue('price');
            $oldPrice = (float) $product->getTVValue('old_price');
            $netSales = $price * $count;
            $weight = $weightPerUnit * $count;

            $discount = 0;
            if ($oldPrice > $price) {
                $discount = $oldPrice - $price;
                $discount *= $count;
            }

            $taxRate = $salesTax = 0;
            if (!empty($this->getProperty('include_tax'))) {
                $taxRate = (float) $product->getTVValue('tax_rate');
                $taxRate = empty($taxRate) ? (float) $this->modx->getOption('app.product_tax_rate') : $taxRate;
                $salesTax = $price / 100 * $taxRate;
                $salesTax *= $count;
            }

            $cost = $netSales + $salesTax;
            $image = $product->getTVValue('img');
            $domain = strpos($image, "assets") === false 
                ? "https://309921.selcdn.ru/l-s-ru/" 
                : "https://www.lateres.ru/";

            $measureUnit = $this->modx->getObject(\modResource::class, $product->getTVValue('measure_unit'));
            $measureUnit = $measureUnit ? $measureUnit->get('pagetitle') : '';

            $item['image'] = $domain . $image;
            $item['description'] = $product->get('description');

            $item['discount'] = $discount;
            $item['discount_format'] = $this->app->formatPrice($item['discount'], true);

            $item['old_price'] = $oldPrice;
            $item['old_price_format'] = $this->app->formatPrice($item['old_price'], true);

            $item['old_cost'] = $netSales + $discount;
            $item['old_cost_format'] = $this->app->formatPrice($item['old_cost'], true);

            $item['price'] = $price;
            $item['price_format'] = $this->app->formatPrice($item['price'], true);

            $item['net_sales'] = $netSales;
            $item['net_sales_format'] = $this->app->formatPrice($item['net_sales'], true);

            $item['cost'] = $cost;
            $item['cost_format'] = $this->app->formatPrice($item['cost'], true);

            $item['weight'] = $weight;
            $item['weight_format'] = $this->app->formatWeight($item['weight'], true);

            $item['weight_per_unit'] = $weightPerUnit;
            $item['weight_per_unit_format'] = $this->app->formatWeight($item['weight_per_unit'], true);

            $item['tax_rate'] = $taxRate;
            $item['tax_rate_format'] = $this->app->formatPrice($item['tax_rate'], true);

            $item['sales_tax'] = $salesTax;
            $item['sales_tax_format'] = $this->app->formatPrice($item['sales_tax'], true);

            $item['measure_unit'] = $measureUnit;
            $item['url'] = $this->modx->makeUrl($product->get('id'), '', '', 'full');

            $response = $this->app->runProcessor('web/product/favorite/get',
                ['product_id' => $product->get('id')])->getResponse();
            $item['favorite'] = $response['success'] === true;
        }

        $item['published'] = is_object($product);
    }
}

return BaseProcessor::class;