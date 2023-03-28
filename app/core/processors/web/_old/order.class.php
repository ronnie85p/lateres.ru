<?php

namespace WF\Shop\Processors;

class OrderProcessor extends \MODX\Revolution\Processors\Processor
{
    /** @var $order WF\Shop\Order */
    public $order;

    /** @var $product msProduct */
    public $product;

    public $languageTopics = ['wf_shop', 'wf_shop:order'];
    public $permissions = '';
    public $classKey = '';

    public function initialize()
    {
        $this->order = $this->modx->services->get('wf_order');
        if (!$this->order->initialize()) {
            return false;
        }
        
        $this->order->setConfig($this->getProperties());
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
}