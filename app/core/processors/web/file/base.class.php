<?php

namespace App\Processors\Web\File;

use MODX\Revolution\modX;
use MODX\Revolution\Processors\Processor;

class BaseProcessor extends Processor
{
    /**@var App\Core $app */
    public $app;

    public $primaryKey = 'id';
    public $classKey = '';
    public $criteria = [];

    function __construct(modX &$modx, array $properties = []) 
    {
        $this->app = $modx->services->get('app');
        parent::__construct($modx, $properties);
    }

    public function initialize()
    {
        return parent::initialize();
    }

    public function process()
    {
        return $this->success();
    }

    public function loadFileHandler()
    {
        /**@var App\Files\File $this->app->file */
        $this->fileHandler = $this->app->getService('file', 
            \App\Files\File::class, $this->getProperties());

        return $this->fileHandler->initialize();
    }

    public function loadPhpThumb(array $config)
    {
        $this->phpThumb = $this->app->getService('phpThumb', 
            \App\Files\PhpThumb::class, $config);

        return $this->phpThumb->initialize();
    }
}