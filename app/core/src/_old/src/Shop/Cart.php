<?php

namespace WF\Shop;

use MODX\Revolution\modX;

class Cart extends \WF\Shop
{

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);

        $className = 'Shop\Cart\Handlers\CartSessionHandler';
        if ($this->modx->user->isAuthenticated('web')) {
            $className = 'Shop\Cart\Handlers\CartDBHandler';
        }

        $this->getService('handler', $className);
    }

    public function initialize(string $ctx='', array $scriptProperties = [], &$hash = null) 
    {
        if ($ctx == 'web') {
            $this->setConfig($scriptProperties);
            $this->saveScriptProperties('wf_shop', $scriptProperties, $hash);

            $jsConfig = array_merge([
                'hash' => $hash,
                'assetsUrl' => $this->config['assetsUrl'],
                'controllerUrl' => $this->config['controllerUrl'],
                'connectorUrl' => $this->config['connectorUrl']
            ], $this->config['jsConfig'] ?: []);
    
            $this->modx->regClientScript($this->config['jsUrl'] . 'cart.js');
            $this->modx->regClientScript('<script>
                wf.Shop.Cart.initialize('.json_encode($jsConfig).');
            </script>', true);
        }
      
        return true;
    }

    public function enableTaxRate($enabled=1)
    {
        $this->tax_rate_enabled = (int) $enabled > 0;
    }

    public function getProduct($id)
    {
        if (!$this->product || $this->product->id != $id) {
          $this->product = $this->modx->getObject(\msProduct::class, [
              'id' => $id,
              'published' => 1,
              'deleted' => 0
          ]);
        }

        return $this->product;
    }

    public function fromProduct($item)
    {
        $count = (int) $item['count'];
        $price = (float) $this->product->getTVValue('price');
        $old_price = (float) $this->product->getTVValue('old_price');
        $weight = (float) $this->product->getTVValue('weight') * $count;
        $discount = (float) $this->product->getTVValue('discount_value') * $count;
            
        $tax_rate = $sales_tax = 0;
        if ($this->tax_rate_enabled) {
            $tax_rate = floatval($this->product->getTVValue('tax_rate') ?: 
                $this->modx->getOption('wf_shop.product_tax_rate', null, 20));
            $sales_tax = ($price / 100) * $tax_rate;
            $sales_tax *= $count;
        }

        $discount = $discount_value = 0;
        if ($old_price > $price) {
            $discount = $price / $old_price * 100;
            $discount_value = $old_price - $price; //($old_price / 100) * $discount;
            $discount_value *= $count;
        }

        $net_sales_old_cost = $old_price * $count;
        $old_cost = $net_sales_old_cost + $sales_tax;
        $net_sales_cost = $price * $count;
        $cost = $net_sales_cost + $sales_tax;
        
        return array_merge($item, [
            'weight' => $weight,

            'old_price' => $old_price,
            'net_sales_old_cost' => $net_sales_old_cost,
            'old_cost' => $old_cost,

            'price' => $price,
            'net_sales_cost' => $net_sales_cost,
            'cost' => $cost,

            'discount' => $discount_value,
            'tax_rate' => $tax_rate,
            'sales_tax' => $sales_tax,     
        ]);
    }
    
    public function getTotal($items = null, array $options = []) 
    {
        $total = [
            'total' => 0,
            'published' => 0,
            'count' => 0,
            'weight' => 0,
            'discount' => 0,
            'sales_tax' => 0,
            'net_sales_cost' => 0,
            'old_cost' => 0,
            'cost' => 0,
        ];
      
        if (!is_array($items)) {
            $items = $this->get(null, $options);
        }

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

    public function prepareFields()
    {
        $fields = [
            'product_id' => (int) $this->product->get('id'),
            'pagetitle' => $this->product->get('pagetitle'),
            'description' => $this->product->get('description'),
            'image' => $this->product->getTVValue('img'),
        ];

        return $fields;
    }

    public function getId()
    {
        return md5($this->modx->user->id . $this->product->id);
    }

    public function get($id = null, array $options = [])
    {
        $items = $this->handler->get($id, $options);
        if ($id) {
            $items = !empty($items) ? [$items] : [];
        }

        foreach ($items as &$item) {
            $isPublished = is_object($this->getProduct($item['product_id']));
            if ($isPublished) {
                $item = $this->fromProduct($item);
            } 

            $item['published'] = $isPublished;
        }

        return $items;
    }

    public function add(int $pid, int $count = 1)
    {
        if (!$this->getProduct($pid)) {
            return $this->failure($this->modx->lexicon('wf_shop.cart_product_not_exists')); 
        }

        $id = $this->getId();
        if ($this->handler->get($id)) {
            return $this->failure($this->modx->lexicon('wf_shop.cart_item_already_exists'));
        }

        $count = abs($count) ?: 1;
        $fields = array_merge(
            $this->prepareFields(), 
            $this->fromProduct(['count' => $count])
        );

        if (!$this->handler->add($id, $count, $fields)) {
            return $this->failure($this->modx->lexicon('wf_shop.cart_item_add_failure'));
        }
        
        return $this->success($this->modx->lexicon('wf_shop.cart_item_add_success'), [ 
            'id' => $id
        ]);
    }
    
    public function change(string $id, int $count = 1)
    {
        $item = $this->handler->get($id);
        if (empty($item)) {
            return $this->failure($this->modx->lexicon('wf_shop.cart_item_not_exists'));
        }

        if (!$this->getProduct($item['product_id'])) {
            return $this->failure($this->modx->lexicon('wf_shop.cart_product_not_exists')); 
        }

        $count = abs($count) ?: 1;
        $fields = $this->fromProduct(['count' => $count]);

        if (!$this->handler->change($id, $count, $fields)) {
            return $this->failure($this->modx->lexicon('wf_shop.cart_item_change_failure'));
        }  
        
        return $this->success($this->modx->lexicon('wf_shop.cart_item_change_success', ['cart_count' => 0]), 
            $this->handler->get($id));
    }
    
    public function remove($id)
    {
        $item = $this->handler->get($id);
        if (empty($item)) {
            return $this->failure($this->modx->lexicon('wf_shop.cart_item_not_exists'));
        }

        if (!$this->handler->remove($id)) {
            return $this->failure($this->modx->lexicon('wf_shop.cart_item_remove_failure'));
        }
        
        $name = strlen($item['name']) > 25 ? @mb_substr($item['name'], 0, 25) . '...' : $item['name'];
        return $this->success($this->modx->lexicon('wf_shop.cart_item_remove_success', ['name' => $name]), [ 
            'id' => $id
        ]);
    }
    
    public function clear()
    {
        if (!$this->handler->clear()) {
            return $this->failure($this->modx->lexicon('wf_shop.cart_clear_failure'));
        }

        return $this->success($this->modx->lexicon('wf_shop.cart_clear_success'));
    }
}