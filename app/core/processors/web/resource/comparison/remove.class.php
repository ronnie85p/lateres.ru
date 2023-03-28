<?php

namespace App\Processors\Comparison;

use MODX\Revolution\Processors\Model\RemoveProcessor as _RemoveProcessor;

class RemoveProcessor extends _RemoveProcessor
{
    public $classKey = \App\Model\Resource\Comparison::class;
    public $beforeSaveEvent = 'onAppResourceComparisonBeforeRemove';
    public $afterSaveEvent = 'onAppResourceComparisonAfterRemove';

    public function initialize() 
    {
        $primaryKey = $this->getProperty($this->primaryKeyField, false);
        $criteria = [
            'user_id' => $this->modx->user->id,
            $this->primaryKeyField => $primaryKey
        ];

        $this->object = $this->modx->getObject($this->classKey, $criteria);
        if (empty($this->object)) {
            return $this->modx->lexicon($this->modx->lexicon('app.resource_comparison_not_found'));
        }

        return parent::initialize();
    }

    public function success($msg = '', $object = null)
    {
        return parent::success($this->modx->lexicon('app.resource_comparison_removed'));
    }
}

return RemoveProcessor::class;