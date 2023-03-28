<?php

namespace App;
use MODX\Revolution\modX;

class Order extends \App\Core
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    public function validate($data) 
    {
        $validator = $this->getService('validator', 
            \App\Order\Validator::class);

        if (!$validator->validate($data)) {
            return false;
        }

        return true;
    }

    public function getNum()
    {
        $num = date('ymd/') . $this->modx->user->id;
        $count = $this->modx->getCount(\msOrder::class, [
            'num:LIKE' => $num . '%'
        ]);

        return $num . '-' . str_repeat(0, 3-strlen($count)) . $count+1;
    }

    public function getUserAddress()
    {
        $response = $this->runProcessor('web/profile/address/get');
        if (!$response->isError()) {
            return $response->getObject();
        }

        return [];
    }

    public function getUserProfile()
    {
        $profile = $this->runProcessor('web/profile/get')->getObject();

        return [
            'user_type' => $profile['user_type'],
            'fullname' => $profile['fullname'],
            'email' => $profile['email'],
            'mobilephone' => $profile['mobilephone_format'],
            'company' => empty($profile['company']) ? null : $profile['company'],
        ];
    }

    public function getTotal($items, $data=[])
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

        $total['old_cost_format'] = $this->formatPrice($total['old_cost'], true);
        $total['discount_format'] = $this->formatPrice($total['discount'], true);
        $total['net_sales_format'] = $this->formatPrice($total['net_sales'], true);
        $total['sales_tax_format'] = $this->formatPrice($total['sales_tax'], true);
        $total['weight_format'] = $this->formatWeight($total['weight'], true);
        $total['delivery_options'] = [];
        $total['delivery_cost'] = 0;

        $distance = (float) $data['distance'];
        $deliveryCar = (int) $data['delivery_car'];
        if ($distance && $deliveryCar) {
            $calculated = $this->runProcessor('web/delivery/calculate', [
                'distance' => $distance,
                'car_id' => $deliveryCar,
                'weight' => $total['weight']
            ])->getObject();

            $total['delivery_options'] = $calculated;
            $total['delivery_cost'] = $calculated['cost'];
            $total['cost'] += $total['delivery_cost'];
        }

        $total['cost_format'] = $this->formatPrice($total['cost'], true);
        $total['delivery_cost_format'] = $this->formatPrice($total['delivery_cost'], true);

        return $total;
    }

    public function getTotalTax($includeTax)
    {

    }

    public function prepareItems($items)
    {
        $products = [];
        foreach ($items as $item) {
            $product = array_merge($item, [
                'product_id' => $item['product_id'],
                'name' => $item['name'],
                'price' => (float) $item['price'],
                'count' => (int) $item['count'],
                'cost' => (float) $item['cost'],
                'weight' => (float) $item['weight'],
                'properties' => [
                    'image' => $item['image'],
                    'weight_per_unit' => (float) $item['weight_per_unit'],
                    'measure_unit' => $item['measure_unit'],
                    'tax_rate' => (float) $item['tax_rate'],
                    'sales_tax' => (float) $item['sales_tax'],
                ]
            ]);

            $products[] = $product;
        }

        return $products;
    }

    public function prepareAddress()
    {
        $address = $this->getUserAddress();
        $profile = $this->getUserProfile();

        return [
            'receiver' => $profile['fullname'],
            'phone' => $profile['mobilephone'],
            'email' => $profile['email'],
            'country' => $address['country'],
            'region' => $address['region'],
            'city' => $address['city'],
            'street' => $address['street'],
            'building' => $address['building'],
            'text_address' => $address['text'],
            'comment' => $address['comment'],
            'properties' => [
                'receiver_type' => $profile['user_type'],
                'receiver_company' => $profile['company'],
                'coords' => $address['coords'],
                'map_zoom' => $address['map_zoom'],
            ],
        ];
    }

    public function prepare(array $data)
    {
        $total = $this->getTotal($data['items'], $data);
        $deliveryOptions = $total['delivery_options'];

        return [
            'user_id' => $this->modx->user->id,
            'createdon' => time(),
            'num' => $this->getNum(),
            'delivery' => (int) $data['delivery'],
            'payment' => (int) $data['payment'],
            'delivery_cost' => $total['delivery_cost'],
            'cart_cost' => $total['net_sales'],
            'cost' => $total['cost'],
            'weight' => $total['weight'],
            'order_comment' => trim($data['comment']),
            'address' => $this->prepareAddress(),
            'products' => $this->prepareItems($data['items']),
            'properties' => [
                'factory_address' => $this->modx->getOption('app.contacts_factory_address'),
                'factory_coords' => $this->modx->getOption('app.contacts_factory_coords'),
                'delivery_date' => $data['delivery_date'],
                'delivery_time' => $data['delivery_time'],
                'delivery_distance' => $deliveryOptions['distance'],
                'delivery_car_id' => $deliveryOptions['car_id'],
                'delivery_car_zone_id' => $deliveryOptions['car_zone_id'],
                'delivery_car_cost' => $deliveryOptions['car_cost'],
                'delivery_is_min_cost' => $deliveryOptions['is_min_cost'],
                'delivery_cars' => $deliveryOptions['cars'],
                'include_tax' => (int) $data['include_tax'],
                'sales_tax' => $total['sales_tax'],
            ],
        ];
    }

    public function build(array $data)
    {
        $msOrder = $this->modx->newObject(\msOrder::class, array_merge($data, [
            'session_id' => session_id()
        ]));

        if (!empty($data['address'])) {
            $msoAddress = $this->modx->newObject(\msOrderAddress::class, 
                array_merge($data['address'], [
                    'user_id' => $this->modx->user->get('id'),
                    'createdon' => time(),
                ])
            );

            $msOrder->addOne($msoAddress);
        }

        $products = [];
        foreach ($data['products'] as $product) {
            $products[] = $this->modx->newObject(\msOrderProduct::class, $product);
        }

        $msOrder->addMany($products);

        return $msOrder;
    }

    /**
     * @param msOrder|array|id $order 
     */
    public function from($order)
    {
        if (!($order instanceof \msOrder)) {
            if (!$order = $this->modx->getObject(\msOrder::class, $order)) {
                return [];
            }
        }

        $array = array_merge($order->toArray(), $order->get('properties') ?: []);
        unset($array['properties']);

        // Format currency values
        $array['cart_cost_format'] = $this->formatPrice($array['cart_cost'], true);
        $array['delivery_cost_format'] = $this->formatPrice($array['delivery_cost'], true);
        $array['sales_tax_format'] = $this->formatPrice($array['sales_tax'], true);
        $array['old_cost_format'] = $this->formatPrice($array['old_cost'], true);
        $array['discount_value_format'] = $this->formatPrice($array['discount_value'], true);
        $array['cost_format'] = $this->formatPrice($array['cost'], true);
        $array['delivery_car_cost_format'] = $this->formatPrice($array['delivery_car_cost'], true);

        // Objects to array
        $array['status'] = ($tmp = $order->getOne('Status')) ? $tmp->toArray() : [];
        $array['payment'] = ($tmp = $order->getOne('Payment')) ? $tmp->toArray() : [];
        $array['delivery'] = ($tmp = $order->getOne('Delivery')) ? $tmp->toArray() : [];
        $array['address'] = ($tmp = $order->getOne('Address')) ? 
            array_merge($tmp->toArray(), $tmp->get('properties') ?: []) : [];
        unset($array['address']['properties']);

        if (!empty($array['delivery_car_id'])) {
            $response = $this->runProcessor('web/delivery/car/get', ['id' => $array['delivery_car_id']]);
            if (!$response->isError()) {
                $array['delivery_car'] = $response->getObject();
            }
        }

        // Products to array
        $array['products'] = [];
        foreach ($order->getMany('Products') as $product) {
            $productArray = array_merge($product->toArray(), $product->get('properties') ?: []);
            $productArray['price_format'] = $this->formatPrice($productArray['price'], true);
            $productArray['old_cost_format'] = $this->formatPrice($productArray['old_cost'], true);
            $productArray['sales_tax_format'] = $this->formatPrice($productArray['sales_tax'], true);
            $productArray['discount_value_format'] = $this->formatPrice($productArray['discount_value_tax'], true);
            $productArray['cost_format'] = $this->formatPrice($productArray['cost'], true);
            $productArray['weight_format'] = $this->formatWeight($productArray['weight'], true);
            unset($productArray['properties']);

            if ($Product = $this->modx->getObject(\modResource::class, $product->get('product_id'))) {
                $productArray['resource'] = array_merge($Product->toArray(), $Product->get('properties') ?: []);
                unset($productArray['resource']['properties']);

                foreach ($Product->getMany('TemplateVar') as $tv) {
                    $productArray['resource'][$tv->get('name')] = $tv->get('value');
                }
            }

            $array['products'][] = $productArray;
        }

        return $array;
    }
}