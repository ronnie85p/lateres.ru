<?php

namespace WF\Shop\Controllers\Order\Payment;

require_once dirname(dirname(__DIR__)) . '/order.class.php';

class IndexController extends \WF\Shop\Controllers\OrderController
{
    public $payment;

    public function initialize() 
    { 
        $initialized = parent::initialize();
        if ($initialized !== true) {
            return $initialized;
        }

        $deliveryId = $this->getProperty('delivery');
        $paymentId = $this->getProperty('payment', 1);

        $this->payment = $this->order->getPaymentMethods($deliveryId, [ 'id' => $paymentId ])[0];
        if (!$this->payment) {
            return 'undef';
        }

        return true;
    }

    public function getTemplateFile()
    {
        return 'chunks/ordering/payment/index_' . $this->payment->id . '.tpl';
    }

    public function preRender()
    {
        $properties = $this->getProperties();
        $properties['payment'] = $this->payment;

        $this->setProperties($properties);
        return true;
    }
}

return 'WF\\Shop\\Controllers\\Order\\Payment\\IndexController';