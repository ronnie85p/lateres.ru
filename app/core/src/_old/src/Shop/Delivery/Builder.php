<?php

namespace WF\Shop\Delivery;

use MODX\Revolution\modX;

class Builder extends \WF\Shop
{
    public $delivery;

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    public function getDelivery($id)
    {
        if (!$this->delivery) {
            $this->delivery = $this->modx->getObject('msDelivery', [
                'id' => $id, 
                'active' => 1
            ]);
        }

        return $this->delivery;
    }

    public function build()
    {
        $class = 'Shop\\Delivery\\';
        switch ($delivery->id) {

            case 1:
                $class .= 'Pickup';
                break;

            case 2:
                $class .= 'Company';
                break;

        }

        return $this->getService('delivery', $class);
    }
}