<?php

namespace App\Processors\Web\File;
require_once __DIR__ . '/base.class.php';

class Get extends BaseProcessor
{
    public $classKey = \App\Model\Resource::File;
    public $object;

    public function initialize() 
    {
        $this->object = $this->modx->getObject($this->classKey, 
            ['url' => $this->getProperty('url')]);
        if (empty($this->object)) {
            return $this->modx->lexicon('app.file_not_found');
        }

        $this->loadFileHandler();

        return parent::initialize();
    }

    public function process()
    {
        $array = $this->fileHandler->prepareArray($this->object);
        return $this->success('', $array);
    }
}

return Get::class;