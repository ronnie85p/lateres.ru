<?php

namespace App\Processors\Profile\CreditCard;

use MODX\Revolution\Processors\Model\GetListProcessor as _GetListProcessor;

class GetListProcessor extends _GetListProcessor
{
    public $classKey = \App\Model\Profile\CreditCard::class;
    public $defaultSortField = 'createdon';
    public $defaultSortDirection = 'DESC';
    public $defaultStart = 0;
    public $defaultLimit = 20;

    public function initialize() 
    {
        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function beforeQuery()
    {
        $properties = $this->getProperties();
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
        return $c;
    }

    public function prepareQueryAfterCount(\xPDOQuery $c)
    {
        return $c;
    }

    public function afterIteration(array $list)
    {
        return $list;
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