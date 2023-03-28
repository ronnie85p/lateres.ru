<?php

namespace App;
use MODX\Revolution\modX;

class Product extends \App\Core
{
    public $classKey = \modResource::class;

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    public function getObject($criteria)
    {
        if (is_numeric($criteria)) {
            $criteria = ['id' => $criteria];
        }

        $criteria = empty($criteria) ? [] : $criteria;
        $criteria = array_merge([                
            'template' => $this->modx->getOption('app.product_template'),
            'published' => 1,
            'deleted' => 0
        ], $criteria);

        return $this->modx->getObject($this->classKey, $criteria);
    }

    public function from($product)
    {
        if (!($product instanceof \modResource)) {
            if (!$product = $this->getObject($product)) {
                return [];
            }
        }

        $array = array_merge($product->toArray(), $product->get('properties') ?: []);
        unset($array['properties']);

        foreach ($product->getMany('TemplateVars') as $tv) {
            $array[$tv->get('name')] = $tv->get('value');
        }

        $array['price_format'] = $this->formatPrice($array['price'], true);
        $array['old_price_format'] = $this->formatPrice($array['old_price'], true);
        $array['purchase_price_format'] = $this->formatPrice($array['purchase_price'], true);
        $array['wholesale_min_price_format'] = $this->formatPrice($array['wholesale_min_price'], true);
        $array['small_wholesale_price_format'] = $this->formatPrice($array['small_wholesale_price'], true);
        $array['discount_format'] = $this->formatPrice($array['discount'], true);
        $array['discount_value_format'] = $this->formatPrice($array['discount_value'], false);
        $array['weight_format'] = $this->formatWeight($array['weight'], true);

        $url = strpos($array['img'], "assets") === false ? 
            "https://309921.selcdn.ru/l-s-ru/" : 
            "https://www.lateres.ru/";

        $array['image'] = $url . $array['img'];

        if (!empty($array['measure_unit'])) {
            $object = $this->modx->getObject(\modResource::class, $array['measure_unit']);
            $array['measure_unit'] = $object ? $object->get('pagetitle') : '';
        }

        $cart = $this->runProcessor('web/cart/get', [
            'key' => md5($this->modx->user->id . $array['id'])])->getObject();
        $array['inCart'] = $cart;

        $response = $this->runProcessor('web/favorite/get',[
            'product_id' => $array['id']])->getResponse();
        $array['inFavorite'] = $response['success'] === true;

        return $array;
    }
}