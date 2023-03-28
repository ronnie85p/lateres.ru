<?php

namespace App;
use MODX\Revolution\modX;

class Formater extends \App\Core
{
    function __construct(modX & $modx, array $config = [])
    {
        parent :: __construct($modx, $config);
    }

    public function trimPhone($phone)
    {
        return preg_replace('/[^+0-9]/', '', $phone);
    }

    public function trimSpaces($text)
    {
        return preg_replace('/\s{1,}/', ' ', trim($text));
    }
}