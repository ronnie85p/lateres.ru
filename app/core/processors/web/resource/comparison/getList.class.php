<?php

namespace App\Processors\Comparison;

use MODX\Revolution\Processors\Model\GetListProcessor as _GetListProcessor;

class GetListProcessor extends _GetListProcessor
{
    public $classKey = \App\Model\Resource\Comparison::class;
    public $defaultSortField = 'timestamp';
    public $defaultSortDirection = 'ASC';
    public $defaultStart = 0;
    public $defaultLimit = 20;

    public function initialize() 
    {
        return parent::initialize();
    }

    public function beforeQuery()
    {
        $properties = $this->getProperties();
        $properties['start'] = $this->getProperty('start', $this->defaultStart);
        $properties['limit'] = $this->getProperty('limit', $this->defaultLimit);

        $this->setProperties($properties);
        return true;
    }

    public function afterIteration(array $list)
    {
        foreach ($list as &$item) {
            $item['resource'] = 1;
            $resource = $this->modx->getObject(\modResource::class, $item['resource_id']);
            if ($resource) {
                $item['resource'] = $resource->toArray();
                foreach ($resource->getMany('TemplateVars') as $tv) {
                    $item['resource'][$tv->get('name')] = $tv->get('value');
                } 
            } else {
                $item['resource']['deleted'] = 1;
            }
        }

        return $list;
    }

    public function outputArray(array $array, $count = false)
    {
        return json_decode(parent::outputArray($array, $count), true);
    }
}

return GetListProcessor::class;