<?php

namespace App\Processors\Profile\CreditCard;

use MODX\Revolution\Processors\Model\GetListProcessor as _GetListProcessor;

class GetListProcessor extends _GetListProcessor
{
    public $classKey = \modResource::class;
    public $defaultSortField = 'menuindex';
    public $defaultSortDirection = 'ASC';
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
        $properties['resources'] = '72, 58, 392, 59, 60';
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
        $c->where(['id:IN' => explode(', ', $this->getProperty('resources'))]);

        return $c;
    }

    public function prepareQueryAfterCount(\xPDOQuery $c)
    {
        return $c;
    }

    public function afterIteration(array $list)
    {
        foreach ($list as &$item) {
            $item['url'] = $this->modx->makeUrl($item['id'], '', '', 'full');
        }

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