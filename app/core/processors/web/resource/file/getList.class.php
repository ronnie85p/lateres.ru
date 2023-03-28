<?php

use MODX\Revolution\Processors\Processor;
use MODX\Revolution\Sources\modMediaSource;

class wfFilesFilesGetList extends Processor 
{
    public $resourceId = 0;
    public $sourceId = 0;
    public $parentId = 0;
    public $container = '';

    public function initialize()
    {
        $this->resourceId = (int)$this->getProperty('resource', 0);
        $this->sourceId = (int)$this->getProperty('source', 0);
        $this->parentId = (int)$this->getProperty('parent', 0);
        $this->container = (string)trim($this->getProperty('container', ''), '/');

        return true;
    }

    public function process()
    {
        // return $this->test();

        $criteria = [
            'resource_id' => $this->resourceId,
            'source_id' => $this->sourceId,
            'parent_id' => $this->parentId,
            'path' => $this->container
        ];

        $objects = $this->modx->getCollection('wfFiles\\flsFile', $criteria);
        $results = [];
        foreach ($objects as $object) {
            $objectArray = $object->toArray();
            $objectArray['url'] = $object->getUrl();
            $results[] = $objectArray;
        }

        // return $this->test();
        return json_decode($this->outputArray($results));
    }

    public function test(/** many args */)
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'resourceId' => $this->resourceId,
            'sourceId' => $this->sourceId,
            'parentId' => $this->parentId,
            'container' => $this->container,
            'args' => func_get_args()
        ]);
    }
}

return 'wfFilesFilesGetList';