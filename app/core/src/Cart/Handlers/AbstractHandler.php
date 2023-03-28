<?php

namespace App\Cart\Handlers;

use MODX\Revolution\modX;

abstract class AbstractHandler {

    /**@var modX $modx */
    public $modx;

    /**@var array $config */
    public $config = [];

    public $product;
    public $key;
    public $fields;

    function __construct(modX & $modx, array $config = [])
    {
        $this->modx = &$modx;
        $this->config = $config;
    }

    /**
     * @param int $productId
     * @return boolean
     * @return string
     */
    public function generateHashKey(int $productId)
    {
        return md5($this->modx->user->id . $productId);
    }

    /**
     * @param array $options
     * @param string $name
     * @param mixed $default
     * @return mixed
     */
    public function getOption(array $options, string $name, $default = null)
    {
        return empty($options[$name]) ? $default : $options[$name];
    }

    /**
     * @param modResource $product
     * @param int $count 
     */
    public function prepareCreateFields(\modResource $product, int $count)
    {
        $this->fields = [
            'count' => $count,
            'user_id' => $this->modx->user->id,
            'product_id' => $product->get('id'),
            'name' => $product->get('pagetitle'),
            'image' => $product->getTVValue('img'),
            'price' => (float) $product->getTVValue('price'),
            'checked' => true,
            'createdon' => time(),
        ];
    }

    /**
     * @param int $count 
     */
    public function prepareUpdateFields(int $count)
    {
        $this->fields = [
            'count' => $count,
            'updatedon' => time(),
        ];
    }
}