<?php

namespace WF\Shop;

use MODX\Revolution\modX;

class YandexMap extends \WF\Shop
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, array_merge([
            'mapsApi' => $modx->getOption('yandex_maps_api')
        ], $config));
    }

    public function initialize(string $ctx='', array $scriptProperties = [], &$hash = null) 
    {
        if ($ctx == 'web') {
            $this->setConfig($scriptProperties);

            
        }
      
        return true;
    }
}