<?php

namespace WF\Shop\Controllers\Order\Summary;

require_once dirname(dirname(__DIR__)) . '/order.class.php';

class IndexController extends \WF\Shop\Controllers\OrderController
{
    public $templateFile = 'chunks/ordering/summary.tpl';

    public function preRender()
    {
        $properties = $this->getProperties();
        $properties['order'] = $this->order->get();

        $this->setProperties($properties);
        return true;
    }
}

return 'WF\\Shop\\Controllers\\Order\\Summary\\IndexController';