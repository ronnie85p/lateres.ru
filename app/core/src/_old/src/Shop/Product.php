<?php

namespace  WF\Shop;

use MODX\Revolution\modX;

class Product extends WF\Shop {

    function __construct(modX & $modx, array $config = []) 
    {
        parent :: __construct($modx, $config);
    }

}