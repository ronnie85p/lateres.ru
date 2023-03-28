<?php

namespace WF\Shop;

use MODX\Revolution\modX;

class Order extends \WF\Shop
{
    public $data = [];

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);

        $this->data = &$_SESSION['wf_shop.order'] ?: [];
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
    
            $this->modx->regClientScript($this->config['jsUrl'] . 'order.js');
            $this->modx->regClientScript('<script>
                wf.Shop.Order.initialize('. json_encode($jsConfig). ');
            </script>', true);
        }
      
        return true;
    }

    public function set(array $data, $merge = false) 
    {
        $this->data = $merge ? array_merge($this->data, $data) : $data;
    }

    public function get(string $key = '')
    {
        return !empty($key) ? $this->data[$key] : $this->data;
    }

    public function clear()
    {
        $this->data = [];
    }

    public function hasItems()
    {
        return !empty($this->getItems());
    }

    public function getItems()
    {
        return $this->get('items');
    }

    public function getNum()
    {
        $num = date('ymd', $this->modx->user->createdon) . $this->modx->user->id;
        $count = $this->modx->getCount('msOrder', ['num:LIKE' => $num . '%']) + 1;
        $count = str_repeat(0, 4-strlen($count)) . $count;

        return $num . $count;
    }

    public function create()
    {
        $this->msOrder = $this->getNewOrder();
        $this->msOrder->addOne($this->getNewAddress());
        $this->msOrder->addMany($this->getNewProducts());

        // $order = $this->modx->getObject('msOrder', 1);
        // $order->set('num', $this->getNum());
        // $order->save();

        // if (!$this->msOrder->save()) {
        //     return $this->failure();
        // }

        // return $this->cleanup();

        // $this->miniShop2->changeOrderStatus(
        //     $this->msOrder->id,
        //     $this->modx->getOption('wf_shop.order_status_new')
        // );

        return [
            'order' => $this->msOrder,
            'address' => $this->msOrder->Address,
            'products' => $this->msOrder->Products
        ];
    }

    public function getResponse()
    {
        if (!empty($this->config['returnUrl'])) {
            $returnUrl = $this->config['returnUrl'];
            
            if (is_numeric($returnUrl)) {
                $returnUrl = $this->modx->makeUrl($returnUrl, '', '', 'full');
            }

            return [
                'url' => $returnUrl,
                'id' => $this->msOrder->id
            ];
        }

        return [];
    }

    public function cleanup()
    {
        return $this->success('', $this->getResponse());
    }

    public function getNewOrder()
    {
        return $this->modx->newObject('msOrder', [
            'num' => $this->getNum(),
            'context' => $this->modx->context->key,
            'user_id' => $this->modx->user->id,
            'createdon' => time(),
            'weight' => $this->get('weight'),
            'cart_cost' => $this->get('net_sales_cost'),
            'delivery_cost' => $this->get('delivery_cost'),
            'cost' => $this->get('cost'),
            'delivery' => $this->get('delivery'),
            'payment' => $this->get('payment'),
            'order_comment' => $this->get('comment'),
            'properties' => [
                // 'old_cost' => $this->get('old_cost'),
                // 'discount' => $this->get('discount'),
                'tax_rate' => $this->get('tax_rate'),
                'sales_tax' => $this->get('sales_tax'),
                'delivery_car' => $this->get('delivery_car'),
                'delivery_cars' => $this->get('delivery_cars'),
                'delivery_zone' => $this->get('delivery_zone'),
                'delivery_date' => $this->get('delivery_date'),
                'delivery_time' => $this->get('delivery_time'),
                'with_tax' => $this->get('with_tax'),
                'contract_required' => $this->get('contract_required')
            ]
        ]);
    }
    
    public function getNewAddress()
    {
        $recipient = $this->getRecipient();

        return $this->modx->newObject('msOrderAddress', [
            'user_id' => $this->modx->user->id,
            'createdon' => time(),
            'receiver' => $recipient->get('fullname'),
            'phone' => $recipient->get('mobilephone'),
            'email' => $recipient->get('email'),
            'country' => $recipient->get('address.country'),
            'index' => $recipient->get('address.index'),
            'region' => $recipient->get('address.region'),
            'city' => $recipient->get('address.city'),
            'street' => $recipient->get('address.street'),
            'building' => $recipient->get('address.building'),
            'floor' => $recipient->get('address.floor'),
            'room' => $recipient->get('address.room'),
            'comment' => $recipient->get('address.comment'),
            'text_address' => $recipient->get('address.text'),
            'properties' => [
                'district' => $recipient->get('address.district'),
                'corpus' => $recipient->get('address.corpus'),
                'premise' => $recipient->get('address.premise'),
                'coords' => $recipient->get('address.coords'),
                'map_zoom' => $recipient->get('address.map_zoom'),
                'distance' => $recipient->get('address.distance'),
                'receiver_company' => $recipient->getCompany()
            ]
        ]);
    }

    public function getNewProducts()
    {
        $products = [];
        foreach ($this->getItems() as $item) {
            $msOrderProduct = $this->modx->newObject('msOrderProduct', [
                'product_id' => $item['product_id'],
                'name' => $item['pagetitle'],
                'count' => (int) $item['count'],
                'price' => (float) $item['price'],
                'cost' => (float) $item['cost'],
                'weight' => (float) $item['weight'],
                'options' => [
                    'image' => $item['image'],
                    'description' => $item['description'],
                    'net_sale_cost' => (float) $item['net_sale_cost'],
                    'net_sale_old_cost' => (float) $item['net_sale_old_cost'],
                    'old_cost' => (float) $item['old_cost'],
                    'old_price' => (float) $item['old_price'],
                    'tax_rate' => (float) $item['tax_rate'],
                    'sales_tax' => (float) $item['sales_tax'],
                    'discount' => (float) $item['discount']
                ]
            ]);

            $products[] = $msOrderProduct;
        }

        return $products;
    }
    
    public function getRecipient()
    {
        return $this->getService('recipient', 'Shop\\Recipient');
    }

    public function setDeliveryCost(array $data)
    {
        $cost = (float) $this->get('cost');
        if ($this->get('delivery_cost') > 0) {
            $cost -= (float) $this->get('delivery_cost');
        }
        
        $this->set([
            'cost' => $cost,
            'delivery_cost' => (float) $data['cost'] ?: 0,
            'delivery_cars' => (int) $data['cars'] ?: 0,
            'delivery_car' => $data['car'] ?: [],
            'delivery_zone' => $data['zone'] ?: []
        ], true);

        $this->updateCost();
    }

    public function setSalesTax($reset = false)
    {
        $salesTax = 0;
        $taxRate = $reset !== true ? (float) $this->modx->getOption('wf_shop.tax_rate', null, 20) : 0;
        if ($taxRate > 0) {
            $salesTax = (float)$this->get('net_sales_cost') * $taxRate / 100;
        }
    
        $cost = (float) $this->get('cost');
        if ($this->get('sales_tax') > 0) {
            $cost -= (float) $this->get('sales_tax');
        } 

        $this->set([
            'cost' => $cost,
            'sales_tax' => $salesTax,
            'tax_rate' => $taxRate
        ], true);

        $this->updateCost();
    }

    public function updateCost()
    {
        $cartCost = (float) $this->get('net_sales_cost');
        $salesTax = (float) $this->get('sales_tax');
        $deliveryCost = (float) $this->get('delivery_cost');

        $this->set(['cost' => $cartCost + $salesTax + $deliveryCost ], true);
    }
}