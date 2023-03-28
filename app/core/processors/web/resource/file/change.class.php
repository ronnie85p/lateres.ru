<?php

use MODX\Revolution\Processors\Processor;
use MODX\Revolution\modX;

class wfFilesFileChange extends Processor 
{
    public $wfls;

    public $objectId = 0;
    public $container = '';
    public $thumbParams = [];

    public $DIRECTORY_SEPARATOR = '/';

    public function initialize()
    {
        $this->wfls = $this->modx->services->get('wffiles');

        $this->objectId = (string) $this->getProperty('id');
        $this->container = (string) $this->getProperty('container');
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

        // return $this->test();
        $this->object = $this->modx->getObject('wfFiles\\flsFile', [
            'path' => $this->container,
            'file' => $this->objectId
        ]);

        if (!$this->object) {
            return $this->failure('File not found.');
        }

        $url = $this->object->get('url');
        $this->object->set('url', $file['tmp_name']);

        if (!$this->object->makeThumbnail($this->thumbParams)) {
            return $this->failure('Could not thumbnail generated');
        }

        // return $this->test();
        if (!$this->object->save()) {
            return $this->failure('Could not saved');
        }

        $mediaSource = $this->object->getMediaSource();
        if ($mediaSource) {
            if ($mediaSource->container->objectExists($url)) {
                $mediaSource->removeObject($url);
            }
        }

        // return $this->test();
        $this->object->set('url', $this->object->getUrl());
        return $this->success('Файл успешно обновлен.', $this->object);
    }

    public function test(/** many args */)
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'container' => $this->container,
            'objectId' => $this->objectId,
            'thumbParams' => $this->thumbParams,
            // 'object' => $this->object->toArray(),
            'args' => func_get_args()
        ]);
    }
}

return 'wfFilesFileChange';