<?php

use MODX\Revolution\Processors\Processor;

class wfFilesFilesCheck extends Processor 
{
    public $source;
    public $validator;

    public $data = [];
    public $container = '';
    public $sourceId;

    public $DIRECTORY_SEPARATOR = '/';

    public function initialize()
    {
        $this->container = (string) $this->getProperty('container', 'files');
        $this->sourceId = (int) $this->getProperty('source', 0);

        $this->data = json_decode($this->getProperty('data', '{}'), true);
        if (!is_array($this->data)) {
            return 'Требуются данные для проверки.';
        }

        $wfls = $this->modx->services->get('wffiles');
        $this->validator = $wfls->loadValidator((array) $this->getProperty('validation', []));

        return true;
    }

    public function process()
    {
        // return $this->test();
        if (!$this->getSource()) {
            return $this->failure();
        }

        $this->validator->validate($this->data, $this->container);

        if (!empty($this->validator->validFiles)) {
            $this->createContainer();
        }

        return $this->success('', $this->validator->validFiles);
    }

    public function hasPermissions() 
    {
        return [];
    }

    public function test()
    {
        return $this->failure('Test mode', [
            'properties' => $this->getProperties(),
            'container' => $this->container,
            'sourceId' => $this->sourceId,
            'source' => is_object($this->source),
            'validator' => is_object($this->validator),
            'validatorConfig' => $this->validator->config
        ]);
    }

    public function responseResult(bool $success = true)
    {
        return $this->success('', [
            'data' => $this->validator->validFiles,
            // 'count' => $this->count
        ]);
    }

    public function createContainer()
    {
        if (!$this->source->objectExists($this->container)) {
            $this->source->clearCache();
            $this->source->createContainerEx($this->container);
        }
    }

    public function getSource() 
    {
        $this->source = modMediaSource::getDefaultSource($this->modx, $this->sourceId, false);
        if (!$this->source) {
            return false;
        }

        $this->source->initialize();
        return $this->source;
    }
}

return 'wfFilesFilesCheck';