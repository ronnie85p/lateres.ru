<?php

namespace App\Shop;

require_once __DIR__ . '/Cart/Handlers/DBHandler.php';
require_once __DIR__ . '/Cart/Handlers/SessionHandler.php';

use MODX\Revolution\modX;

class Cart extends \App\Shop
{
    /**@var (DBHandler | SessionHandler) $handler */
    public $handler;

    function __construct(modX & $modx, array $config = [])
    {
        parent :: __construct($modx, array_merge([
            'include_tax_rate' => (int) $modx->getOption('app.include_tax_rate', null, 0),
            'tax_rate' => (int) $modx->getOption('app.tax_rate', null, 20)
        ], $config));

        $this->handler = $modx->user->isAuthenticated('web') 
            ? new Cart\Handlers\DBHandler($modx, $this->config)
            : new Cart\Handlers\SessionHandler($modx, $this->config);
            
        $modx->lexicon->load('app:default');
    }

    /**
     * @param array $options
     * @return array
     */
    public function getItems(array $options = [])
    {
        $items = $this->handler->getMany($options);

        foreach ($items as &$item) {
            $product = $this->getProduct($item['product_id']);
            if (!$product) {
                $item['deleted'] = 1;
                continue;
            }

            $item = array_merge($item, $this->toArray($product, true, 'properties'));

            $count = (int) $item['count'];
            $price = (float) $item['price'];
            $old_price = (float) $item['old_price'];
            $weight = (float) $item['weight'];

            $discount = 0;
            if ($old_price < $price) {
                $discount = $price - $old_price;
            }

            $sales_tax = $tax_rate = 0;
            if ($this->config['include_tax_rate'] === 1) {
                $tax_rate = $this->config['tax_rate'];

                if (!empty($item['tax_rate'])) {
                    $tax_rate = (int) $item['tax_rate'];
                }

                $sales_tax = $price / 100 * $tax_rate;
            }

            $item['old_cost'] = $old_price * $count;
            $item['net_sales'] = $price * $count;
            $item['cost'] = ( $price + $sales_tax ) * $count;
            $item['weight'] = $weight * $count;
            $item['discount'] = $discount * $count;
            $item['sales_tax'] = $sales_tax * $count;
            $item['tax_rate'] = $tax_rate;
        }

        return $items;
    }

    /**
     * @param int $productId
     * @param int $count
     * @return boolean
     */
    public function add(int $productId, int $count = 1) 
    {
        if ($this->handler->hasProduct($productId)) {
            return 'product_already_added';
        }

        $product = $this->getProduct($productId);
        if (!$product) {
            return 'product_not_exists';
        }

        $count = abs($count);
        if (!$count) {
            return 'count_requires';
        }

        $product = $this->toArray($product, true, 'properties');
        $fields = [
            'count' => $count,
            'product_id' => $product['id'],
            'pagetitle' => $product['pagetitle'],
            'price' => $product['price'],
            'weight' => $product['weight'],
            'weight_unit' => $this->modx->lexicon('app.weight_unit'),
            'currency' => $this->modx->lexicon('app.currency'),
            'currency_html_code' => $this->modx->lexicon('app.currency_html_code'),
            'createdon' => time()
        ];

        // return $fields;
        if (!$this->handler->save($fields)) {
            return 'undef_err';
        }

        return true;
    }

    /**
     * @param string $id
     * @param int $count
     * @return boolean
     */
    public function change(string $id, int $count)
    {
        $item = $this->handler->get($id);
        if (!$item) {
            return 'not_exists';
        }

        if (!$this->checkProduct($item['product_id'])) {
            return 'product_not_exists';
        }

        $count = abs($count);
        if (!$count) {
            return 'count_requires';
        }

        $fields = [
            'count' => $count,
            'updatedon' => time()
        ];

        if (!$this->handler->update($id, $fields)) {
            return 'undef_err';
        }

        return true;
    }

    /**
     * @param string $id
     * @return boolean
     */
    public function remove(string $id)
    {
        if (!$this->handler->remove($id)) {
            return 'undef_err';
        }

        return true;
    }

    /**
     * @return boolean
     */
    public function clear()
    {
        if (!$this->handler->clear()) {
            return 'undef_err';
        }

        return true;
    }

    /**
     * @param array $items
     * @return array
     */
    public function getTotal(array $items) 
    {
        $total = [
            'total' => 0,
            'count' => 0,
            'weight' => 0,
            'discount' => 0,
            'sales_tax' => 0,
            'net_sales_cost' => 0,
            'old_cost' => 0,
            'cost' => 0,
        ];

        foreach ($items as $item) {
            if ($item['published']) {
                $total['count'] += (int) $item['count'];
                $total['weight'] += (float) $item['weight'];
                $total['discount'] += (float) $item['discount'];
                $total['sales_tax'] += (float) $item['sales_tax'];
                $total['net_sales_cost'] += (float) $item['net_sales_cost'];
                $total['old_cost'] += (float) $item['old_price'] * (int) $item['count'];
                $total['cost'] += (float) $item['cost'];

                $total['published']++;
            }

            $total['total']++;
        }
        
        return $total;
    }
}