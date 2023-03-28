<?php

namespace App\Processors\Web\Delivery\Car;
use MODX\Revolution\Processors\Processor;

class GetZone extends Processor
{
    public $app;

    public function initialize()
    {
        $this->app = $this->modx->services->get('app');

        return true;
    }

}

return GetZone::class;