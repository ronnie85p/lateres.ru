<?php

use MODX\Revolution\Processors\Processor;
use MODX\Revolution\modX;

class wfFilesFileUpload extends Processor 
{
    public $wfls;

    public $container = '';
    public $resourceId = 0;
    public $parentId = 0;
    public $sourceId = 0;
    public $rank = 0;
    public $thumbParams = [];

    public $DIRECTORY_SEPARATOR = '/';

    public function initialize()
    {  
        $this->wfls = $this->modx->services->get('wffiles');
        
        $this->container = (string) trim($this->getProperty('container', 'files/' . uniqid()), '/');
        $this->resourceId = (int) $this->getProperty('resource', 0);
        $this->sourceId = (int) $this->getProperty('source', 0);
        $this->parentId = (int) $this->getProperty('parent', 0);
        $this->rank = (int) $this->getProperty('rank', 0);
        $this->thumbParams = (array) $this->getProperty('thumbParams', []);

        return true;
    }

    public function process()
    {
        $prevent = $this->wfls->checkUploadedFiles();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $file = $_FILES[0];

        $this->object = $this->modx->newObject('wfFiles\\flsFile');
        if (!$this->object) {
            return $this->failure('Could not load object.');
        }

        $this->object->set('resource_id', $this->resourceId);
        $this->object->set('source_id', $this->sourceId);
        $this->object->set('parent_id', $this->parentId);
        $this->object->set('rank', $this->rank);
        $this->object->set('path', $this->container);
        $this->object->set('url', $file['tmp_name']);

        if (!$this->object->makeThumbnail($this->thumbParams)) {
            return $this->failure('Could not thumbnail generated');
        }

        if (!$this->object->save()) {
            return $this->failure('Could not saved');
        }

        // return $this->test($file);
        $this->object->set('url', $this->object->getUrl());
        return $this->success('Файл успешно загружен!', $this->object);
    }

    public function test(/** many args */)
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'resourceId' => $this->resourceId,
            'sourceId' => $this->sourceId,
            'parentId' => $this->parentId,
            'container' => $this->container,
            'thumbParams' => $this->thumbParams,
            'object' => $this->object->toArray(),
            'args' => func_get_args()
        ]); 
    }
}

return 'wfFilesFileUpload';