<?php

namespace App\Processors\Comparison;

use MODX\Revolution\Processors\Model\CreateProcessor as _CreateProcessor;

class CreateProcessor extends _CreateProcessor
{
    public $classKey = \App\Model\Resource\Comparison::class;
    public $beforeSaveEvent = 'onAppResourceComparisonBeforeSave';
    public $afterSaveEvent = 'onAppResourceComparisonAfterSave';

    public function initialize() 
    {
        if (empty($this->getProperty('resource_id'))) {
            return $this->modx->lexicon('app.resource_comparison_prop_resource_id_none');
        }

        if (!$this->getResource()) {
            return $this->modx->lexicon('app.product_not_exists');
        }

        if ($this->doesAlreadyExist([])) {
            return $this->modx->lexicon('app.resource_comparison_сreated');
        }   

        return parent::initialize();
    }

    public function getResource()
    {
        $criteria = [
            'id' => $this->getProperty('resource_id'),
            'template' => $this->modx->getOption('app.product_template'),
            'published' => 1,
            'deleted' => 0
        ];

        $this->resource = $this->modx->getObject(\modResource::class, $criteria);

        return $this->resource;
    }

    public function doesAlreadyExist(array $criteria)
    {
        $criteria = [
            'user_id' => $this->modx->user->id,
            'resource_id' => $this->getProperty('resource_id'),
        ];

        return parent::doesAlreadyExist($criteria);
    }

    public function beforeSet()
    {
        $properties = $this->getProperties();
        $properties['user_id'] = $this->modx->user->id;
        $properties['timestamp'] = time();
        // $properties['pagetitle'] = $this->resource->get('pagetitle');

        $this->setProperties($properties);
        return true;
    }

    public function cleanup()
    {
        return $this->success(
            $this->modx->lexicon('app.resource_comparison_сreated'),
            ['id' => $this->object->get('id')]
        );
    }
}

return CreateProcessor::class;
