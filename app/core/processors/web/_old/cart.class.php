<?php

namespace WF\Shop\Processors;

class CartProcessor extends \MODX\Revolution\Processors\Processor
{
    /** @var $cart WF\Shop\Cart */
    public $cart;

    /** @var $product msProduct */
    public $product;

    public $languageTopics = ['wf_shop', 'wf_shop:cart'];
    public $permissions = '';
    public $classKey = 'WF\\Shop\\Model\\CartItem';

    public function initialize()
    {
        if (!$this->modx->services->has('wf_cart')) {
            return false;
        }

        $this->cart = $this->modx->services->get('wf_cart');
        if (!$this->cart->initialize('')) {
            return false;
        }

        return parent::initialize();
    }

    public function process()
    {
        return $this->success();
    }

    public function getLanguageTopics()
    {
        return $languageTopics;
    }

    public function checkPermissions()
    {
        return $this->modx->hasPermission($this->permissions);
    }

    public function getProduct()
    {
        $this->product = $this->modx->getObject('msProduct', [
            'id' => (int)$this->getProperty('productId'),
            'published' => 1,
            'deleted' => 0
        ]);

        if (!$this->product) {
            return $this->modx->lexicon('wf_shop.cart_product_not_exists');
        }
    }
}