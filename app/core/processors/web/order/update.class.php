<?php


namespace App\Processors\Web\Order;
use MODX\Revolution\Processors\Model\UpdateProcessor;

class Update extends UpdateProcessor
{
    public $app;
    public $order;

    public $classKey = \msOrder::class;
    public $primaryKeyField = 'where';

    public function initialize()
    {
        $this->app = $this->modx->services->get('app');
        $this->order = $this->app->getService('order', \App\Order::class);

        $this->setProperties([
            'where' => [
                'user_id' => $this->modx->user->id,
                'id' => $this->getProperty('id'),
            ],
        ]);

        return parent::initialize();
    }

    public function beforeSet()
    {
        $properties = $this->getProperties();

        $newProperties = [];
        if (isset($properties['payment'])) {
            $newProperties['payment'] = (int) $properties['payment'];
        }

        if (isset($properties['include_tax'])) {
            $includeTax = (int) $properties['include_tax'];
            $newProperties['properties']['include_tax'] = $includeTax;
        }

        if (!empty($newProperties['properties'])) {
            $newProperties['properties'] = array_merge($this->object->get('properties')?:[], 
                $newProperties['properties']);
        }

        $this->setProperties($newProperties);
        return parent::beforeSet();
    }
}

return Update::class;