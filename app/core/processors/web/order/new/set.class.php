<?php

/**
 * Prepare an order
 * Форма оформления заказа
 */

namespace App\Processors\Web\Preorder;

use MODX\Revolution\Processors\Processor;

class SetProcessor extends Processor
{
    /**@var App\Core $app */
    public $app;

    public function initialize()
    {
        $this->app = $this->modx->services->get('app');

        return parent::initialize();
    }

    public function process()
    {
        return $this->success();
    }
}

return SetProcessor::class;