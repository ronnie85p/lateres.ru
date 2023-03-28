<?php

namespace WF\Shop;

use MODX\Revolution\modX;

class Delivery extends \WF\Shop
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);

        $this->modx->lexicon->load('wf_shop:delivery');
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
    
            $this->modx->regClientScript($this->config['jsUrl'] . 'delivery.js');
            $this->modx->regClientScript('<script>
                wf.Shop.Delivery.initialize('. json_encode($jsConfig). ');
            </script>', true);
        }
      
        return true;
    }

    public function getCars(array $where = [])
    {
        $classKey = 'WF\\Shop\\Model\\DeliveryCar';

        $q = $this->modx->newQuery($classKey);
        $q->select($this->modx->getSelectColumns($classKey));
        $q->where(array_merge(['active' => true], $where));
        $q->sortby('length', 'ASC');
        $q->sortby('weight', 'ASC');

        return array_values($this->modx->getCollection($classKey, $q));
    }

    public function getCar($id)
    {
        return $this->getCars(['id' => $id])[0] ?? null;
    }

    public function calculate($carId, $distance, $weight=0)
    {
        if (!$car = $this->getCar($carId)) {
            return $this->failure('Выберите транспорт.');
        }

        $distance = (float) $distance;

        $zone = $car->getZone([
            'Zone.distanceof:<=' => $distance, 
            'Zone.distanceup:>=' => $distance
        ]);

        if (!$zone) {
            return $this->failure('Выбранный транспорт на указанное расстояние не доставляет.');
        }

        $weight = $weight > 0 ? $weight : $car->get('weight');

        // Кол-во рейсов
        $cars = ceil($weight / $car->get('weight'));

        /**
         * price for km
         * fixprice
         * minprice 
         * maxprice
         * freefrom
         * notprice
         */

        // Цена за км.
        $price = (float) $zone->get('price');

        // Общая стоимость всего пути
        $cost = $price * $distance;

        // Стоимость доставки в выбранной зоне
        if ($zone->get('fixprice')) {
            $cost += (float) $zone->get('fixprice');
        } else if ($zone->get('minprice')) {
            $cost += (float) $zone->get('minprice');
        }

        return $this->success('', [
            'distance' => $distance,
            'weight' => $weight,
            'cars' => $cars,
            'cost' => $cost,
            'car' => $car,
            'zone' => $zone
        ]);
    }
    
    public function getCost(msDomCar & $car, msDomZone & $zone, $distance, $weight=0) 
    {
      
        if (empty($distance)) {
            return $this->failure('Укажите адрес доставки.');
        }
        
        $weight = $weight > 0 ? $weight : $car['volume'];
        $zone_price = $zone['fixprice'] ?: $zone['minprice'];
        $car_cost = ($zone_price + ($zone['price'] * $distance)); // where zone['price'], price for km
        $cars  = ceil($weight / $car['volume']);
        $cost  = $zone_price * $cars;
        
        $data = [
            'distance' => $distance,
            'weight' => $weight,
            'zone_price' => $zone_price,
            'car_cost' => $car_cost,
            'cost' => $cost,
            'cars' => $cars
        ];
        
        return $this->success('', $data);
    }
}