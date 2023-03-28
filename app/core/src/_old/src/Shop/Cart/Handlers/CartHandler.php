<?php

namespace WF\Shop\Cart\Handlers;

use MODX\Revolution\modX;

abstract class CartHandler extends \WF\Shop
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    // abstract function get($id, array $options = []);

    // abstract function remove($id);

    // abstract function add($productId, int $count);

    // abstract function clear();

    public function prepareOptions(array &$options)
    {
        if (!is_array($options)) {
            $options = [];
        }

        $where = $options['where'] ?? [];
        $sortby = !empty($options['sortby']) 
            ? $options['sortby']
            : $this->modx->getOption('wf_shop.cart_output_sortby', null, 'createdon');

        $sortdir = !empty($options['sortdir']) 
            ? $options['sortdir']
            : $this->modx->getOption('wf_shop.cart_output_sortdir', null, 'ASC');
            $sortdir = strtolower($sortdir);

        $limit = !empty($options['limit']) 
            ? (int)$options['limit'] 
            : (int)$this->modx->getOption('wf_shop.cart_output_limit', null, 15);

        $offset = !empty($options['offset']) 
            ? (int)$options['offset'] 
            : (int)$this->modx->getOption('wf_shop.cart_output_offset', null, 0);    

        $options = array_merge($options, [
            'where' => $where,
            'sortby' => $sortby,
            'sortdir' => $sortdir,
            'limit' => $limit,
            'offset' => $offset
        ]);
    }
}