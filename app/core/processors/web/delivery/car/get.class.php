<?php

namespace App\Processors\Web\Delivery\Car;

use MODX\Revolution\Processors\Model\GetProcessor as _GetProcessor;

class GetProcessor extends _GetProcessor
{
    public $classKey = \App\Model\Delivery\Car::class;

    public function initialize() 
    {
        $criteria = [
            'active' => 1,
            $this->primaryKeyField => $this->getProperty($this->primaryKeyField, false)
        ];

        if (!$this->modx->getCount($this->classKey, $criteria)) {
            return $this->modx->lexicon('app.delivery_car_not_found');
        }

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:delivery', 'app'];
    }

    public function cleanup()
    {
        return $this->success('', $this->object);
    }
}

return GetProcessor::class;
