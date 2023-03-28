<?php

namespace App\Processors\Web\Delivery;

use MODX\Revolution\Processors\Model\GetListProcessor as _GetListProcessor;

class GetListProcessor extends _GetListProcessor
{
    public $classKey = \msDelivery::class;
    public $defaultSortField = 'rank';
    public $defaultSortDirection = 'ASC';
    public $defaultStart = 0;
    public $defaultLimit = 20;

    public function initialize() 
    {
        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:delivery', 'app'];
    }

    public function beforeQuery()
    {
        $properties = $this->getProperties();
        $properties['where'] = ['active' => 1];
        $properties['start'] = $this->getProperty('start', $this->defaultStart);
        $properties['limit'] = $this->getProperty('limit', $this->defaultLimit);
        $properties['sort'] = $this->getProperty('sort', $this->defaultSortField);
        $properties['dir'] = $this->getProperty('sort', $this->defaultSortDirection);
        $properties['query'] = $this->getProperty('query', '');

        $this->setProperties($properties);
        return true;
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $c->where(
            $this->getProperty('where', [])
        );
        
        return $c;
    }
    
    public function outputArray(array $array, $count = false)
    {
        return json_decode(
            parent::outputArray($array, $count)
            , true
        );
    }
}

return GetListProcessor::class;