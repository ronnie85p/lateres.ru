<?php

namespace App\Processors\Web\Delivery;
use MODX\Revolution\Processors\Processor;

class Calculate extends Processor
{
    /**@var App\Core $app */
    public $app;

    /**@var App\Model\Delivery\Car $car */
    public $car;

    /**@var App\Model\Delivery\Car\Zone $carZone */
    public $carZone;

    /**@var int $carId*/
    public $carId;

    /**@var float $weight - kg*/
    public $weight;

    /**@var float $distance - km*/
    public $distance;

    public $routeCars = 0;
    public $carCost = 0;
    public $cost = 0;
    public $isMinCost = false;

    public function initialize()
    {
        $this->app = $this->modx->services->get('app');

        $this->carId = (int) $this->getProperty('car_id');
        $this->weight = (float) $this->getProperty('weight', 0);
        $this->distance = (float) $this->getProperty('distance');

        if (empty($this->distance)) {
            return $this->modx->lexicon('app.delivery_calculate_distance_is_empty');
        }

        return parent::initialize();
    }

    public function process()
    {
        $prevent = $this->getCar();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }
    
        $prevent = $this->getCarZone();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $this->getWeight();
        $this->getRouteCars();
        $this->getCost();

        return $this->cleanup();
    }

    public function getLanguageTopics() {
        return ['app:delivery', 'app'];
    }

    public function getCar()
    {
        $this->car = $this->modx->getObject(\App\Model\Delivery\Car::class, [
            'id' => $this->carId,
            'active' => 1,
        ]);

        if (empty($this->car)) {
            return $this->modx->lexicon('app.delivery_calculate_car_not_found');
        }
    }

    public function getCarZone()
    {
        $classKey = \App\Model\Delivery\Car\Zone::class;

        $q = $this->modx->newQuery($classKey);
        $q->innerJoin(\App\Model\Delivery\Zone::class, '_Zone', '_Zone.id = zone_id');
        $q->select(['Zone.*', '_Zone.*']);
        $q->where([ 
            'car_id' => $this->carId, 
            '_Zone.active' => 1,
            '_Zone.distanceof:<=' => $this->distance, 
            '_Zone.distanceup:>=' => $this->distance,
        ]);

        $this->carZone = $this->modx->getObject($classKey, $q);
        if (empty($this->carZone)) {
            return $this->modx->lexicon('app.delivery_calculate_car_zone_unavailable');
        }
    }

    public function getWeight()
    {
        $this->weight = $this->weight > 0 
            ? $this->weight : $this->car->get('weight');
    }

    public function getRouteCars()
    {
        $this->routeCars = ceil($this->weight / $this->car->get('weight'));
    }

    public function getCost()
    {
        $fixPrice = (float) $this->carZone->get('fixprice');

        if ($fixPrice > 0) {

            $this->carCost = $fixPrice;

        } else {

            // Цена за км.
            $price = (float) $this->carZone->get('price');

            // Мин. цена доставки в заданной зоне
            $minPrice = (float) $this->carZone->get('minprice');

            $this->isMinCost = $minPrice > 0;
            $this->carCost = ( $price * $this->distance ) + $minPrice;

        }

        $this->cost = $this->carCost * $this->routeCars;
    }

    public function cleanup()
    {
        return $this->success('', [
            'car_id' => $this->car->id,
            'car_zone_id' => $this->carZone->id,
            'cars' => $this->routeCars,
            'car_cost' => $this->carCost,
            'cost' => $this->cost,
            'weight' => $this->weight,
            'distance' => $this->distance,
            'is_min_cost' => $this->isMinCost,
        ]);
    }
}

return Calculate::class;