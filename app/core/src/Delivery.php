<?php

namespace App;

use MODX\Revolution\modX;

class Delivery extends \App\Core 
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
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