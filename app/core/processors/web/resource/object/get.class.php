<?php

namespace WF\Resources\Processors\Object;

use MODX\Revolution\Processors\Resource\Get as GetProcessor;

class Get extends GetProcessor
{
    public $classKey = \modResource::class;
    public $languageTopics = ['resource'];
    public $objectType = 'resource';
    public $permission = 'view';

    /**
     * {@inheritDoc}
     * @return boolean
     */
    public function initialize()
    {
        $primaryKey = $this->getProperty($this->primaryKeyField, false);
        if (empty($primaryKey)) {
            return $this->modx->lexicon($this->objectType . '_err_ns');
        }
        $this->object = $this->modx->getObject($this->classKey, $this->getCriteria($primaryKey));
        if (empty($this->object)) {
            return $this->modx->lexicon($this->objectType . '_err_nfs', [$this->primaryKeyField => $primaryKey]);
        }

        if ($this->checkViewPermission && $this->object instanceof \modAccessibleObject && !$this->object->checkPolicy('view')) {
            return $this->modx->lexicon('access_denied');
        }

        return parent::initialize();
    }

    public function process()
    {
        $resourceArray = $this->object->toArray();
        $resourceArray['canpublish'] = $this->modx->hasPermission('publish_document');
        foreach ($this->object->getTemplateVars() as $tv) {
            $resourceArray[$tv->get('name')] = $tv->get('value');
        }

        if (!$this->getProperty('skipFormatDates') ||
            ($this->getProperty('skipFormatDates') && $this->getProperty('skipFormatDates') == 'false')) {
            $this->formatDates($resourceArray);
        }
        return $this->success('', $resourceArray);
    }

    public function getCriteria($primaryKey)
    {
        return array_merge([
            $this->primaryKeyField => $primaryKey,
            'createdby' => $this->modx->user->id,
            'deleted' => 0
        ], $this->getProperties());
    }
}

return 'WF\\Resources\\Processors\\Object\\Get';