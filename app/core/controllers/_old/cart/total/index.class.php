<?php

namespace WF\Shop\Controllers\Cart\Total;

require_once dirname(dirname(__DIR__)) . '/cart.class.php';

class IndexController extends \WF\Shop\Controllers\CartController
{
    public $languageTopics = ['wf_shop'];
    public $permission = '';
    public $templateFile = 'chunks/cart/summary.tpl';

    public $items = [];

    public function initialize() 
    { 
        $initialized = parent::initialize();
        if ($initialized !== true) {
            return $initialized;
        }

        $ids = explode(',', $this->getProperty('ids'));
        $items = $this->cart->get();

        if (!empty($ids)) {
            foreach ($items as $item) {
                if (in_array($item['id'], $ids)) {
                    $this->items[] = $item;
                }
            }
        }

        return true;
    }

    public function preRender()
    {
        $properties = $this->getProperties();
        $properties['total'] = $this->cart->getTotal($this->items);

        $this->setProperties($properties);
        return true;
    }
}

return 'WF\\Shop\\Controllers\\Cart\\Total\\IndexController';