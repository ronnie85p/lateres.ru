<?php

namespace App\Order;
use MODX\Revolution\modX;

require_once dirname(__DIR__) . '/Order.php';

class Form extends \App\Order
{
    public $fields = [];

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    public function setFields(array $data, $merge = 0)
    {
        if ($merge === 1) {
            array_merge($this->fields ?: [], $data);
        } else {
            $this->fields = $data;
        }
    }

    public function setField(string $key, $val)
    {
        $this->fields[$key] = $val;
    }

    public function getField(string $key, $_default = null)
    {   
        if (!isset($this->fields[$key]) && $_default !== null) {
            return $_default;
        }

        return $this->fields[$key];
    }

    public function getFields()
    {
        return $this->fields;
    }
}