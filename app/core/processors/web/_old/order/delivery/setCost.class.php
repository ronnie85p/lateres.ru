<?php

namespace WF\Shop\Processors\Order\Delivery;

require_once dirname(dirname(__DIR__)) . '/order.class.php';

class SetCostProcessor extends \WF\Shop\Processors\OrderProcessor
{
    public $delivery;
    public $car;

    public $weight;
    public $distance;

    public function initialize()
    {

        $initialized = parent::initialize();
        if ($initialized !== true) {
            return $initialized;
        }

        $this->delivery = $this->modx->services->get('wf_shop_delivery');
        if (!$this->delivery->initialize()) {
            return 'undef';
        }

        if (!$this->car = $this->delivery->getCar($this->getProperty('carId'))) {
            return 'Car is not found';
        }

        $data = $this->order->get();
        if (empty($data)) {
            return 'empty data';
        }

        $this->carId = (int) $this->getProperty('carId');
        $this->weight = (float) $data['total']['weight'];
        $this->distance = 50;

        return true;
    }

    public function process()
    {   
        $response = $this->delivery->calculate($this->carId, $this->distance, $this->weight);
        if (!$response['success']) {
            return $response;
        }

        $this->order->setDeliveryCost($response['object']);

        return $this->success('', [
            'distance' => $this->distance,
            'weight' => $this->weight,
            'car' => $this->car,
            'car_zones' => $zones,
            'car_zone' => $zone,
            'calculate' => $response
        ]);

        $result = $this->delivery->calculate($this->carId, $this->distance, $this->weight);        

        $properties = $this->getProperties();
        return $this->success('Test mode', [
            'data' => $this->data,
            'car' => $this->car
        ]);
    }
}

return 'WF\\Shop\\Processors\\Order\\Delivery\\SetCostProcessor';