<?php

namespace App\Processors\Web\Ordering;
require_once __DIR__ . '/base.class.php';

class GetItems extends BaseProcessor
{
    public function process()
    {
        $this->prepare();

        $response = $this->app->runProcessor('web/cart/getList', 
            $this->getProperties())
                ->getResponse();

        return $response;
    }

    public function prepare()
    {
        $properties = $this->getProperties();
        $properties['where'] = ['checked' => true];

        $this->setProperties($properties);
    }
}

return GetItems::class;