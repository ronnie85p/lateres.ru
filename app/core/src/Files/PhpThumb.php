<?php

namespace App\Files;

use MODX\Revolution\modX;
use MODX\Revolution\modPhpThumb;

class PhpThumb extends modPhpThumb
{
    function __construct (modX & $modx, array $config = [])
    {
        parent::__construct($modx, array_merge([
            'config_imagemagick_path' => 'usr/bin/convert',
            'config_prefer_imagemagick' => true,
            'config_imagemagick_use_thumbnail' => true,
            'config_cache_disable_warning' => true,
            'config_allow_src_above_docroot' => true,
            'config_disable_debug' => false,
        ], $config));
    }

    public function initialize()
    {
        parent::initialize();
        $this->setParameters($this->config);

        return true;
    }

    public function setParameters(array $params) 
    {
        foreach ($params as $param => $value) {
            $this->setParameter($param, $value);
        }
    }

    public function renderTo(string $src)
    {
        if (!$this->RenderToFile($src)) {
            $this->modx->log(xPDO::LOG_LEVEL_ERROR, 
                'Was error render to "' . $src .'": ' . print_r($this->fatalerror, true));
            return false;
        }

        return true;
    }

    public function make(string $src, string $dest) 
    {
        $this->set($src);

        if (!$this->generate()) {
            return false;
        }

        if (!$this->renderTo($dest)) {
            return false;
        }
        
        return true;
    }
}