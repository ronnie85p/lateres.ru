<?php

namespace App\Processors\Routes\Product;
use MODX\Revolution\Processors\Processor;

class Create extends Processor
{
    public $app;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');

        $this->setDefaultProperties([

        ]);

        return parent::initialize();
    }

    public function process()
    {
        $this->getCategories();

        return [
            'success' => true,
            'categories' => $this->categories,
            'product_types' => $productTypes,
        ];
    }

    public function getCategories()
    {
        $this->categories = [];

        $response = $this->app->runProcessor('mgr/category/getList');
        if (!$response->isError()) {
            $this->categories = $response->getResponse()['results'];
        }
    }
}

return Create::class;

