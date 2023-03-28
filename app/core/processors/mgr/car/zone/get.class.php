<?php

namespace App\Processors\Mgr\Car\Zone;
use MODX\Revolution\Processors\Processor;

class Get extends Processor
{
    public $classKey = \App\Model\Delivery\Car\Zone::class;
    public $object;

    public function initialize()
    {
        $q = $this->modx->newQuery($this->classKey);
        $q->innerJoin(\App\Model\Delivery\Zone::class, '_Zone', '_Zone.id = zone_id');
        $q->select(['Zone.*', '_Zone.*']);
        $q->where([ 
            'car_id' => $this->getProperty('car_id'), 
            '_Zone.active' => 1,
            '_Zone.distanceof:<=' => $this->getProperty('distance'), 
            '_Zone.distanceup:>=' => $this->getProperty('distance'),
        ]);

        $this->object = $this->modx->getObject($this->classKey, $q);
        if (empty($this->object)) {
            return $this->failure($this->modx->lexicon('app.delivery_calculate_car_zone_unavailable'));
        }

        return parent::initialize();
    }

    public function process()
    {
        return $this->success('', $this->object);
    }

    public function getLanguageTopics() {
        return ['app:delivery', 'app'];
    }
}

return Get::class;