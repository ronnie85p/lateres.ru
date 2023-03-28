<?php

namespace WF\Shop\Controllers\Order\Delivery;

require_once dirname(dirname(__DIR__)) . '/order.class.php';

class IndexController extends \WF\Shop\Controllers\OrderController
{
    public $delivery;

    public $languageTopics = ['wf_shop', 'wf_shop.order'];
    public $permission = '';
    public $templateFile = '';

    public function initialize() 
    { 
        $initialized = parent::initialize();
        if ($initialized !== true) {
            return $initialized;
        }

        $this->data = $this->order->get();
        $this->data['delivery'] = $this->getProperty('delivery', 1);
        $this->data['payment'] = $this->data['payment'] ?: 1;

        $this->delivery = $this->order->getObject('msDelivery', ['id' => $this->data['delivery']]);
        if (!$this->delivery) {
            return $this->modx->lexicon('undef');
        }

        if ($this->delivery->id == 2) {
            $this->address = $this->modx->getObject('WF\\Profile\\Model\\Address', [
                'user_id' => $this->modx->user->id,
                // 'rank' => 0
            ]);
        } else {
            $this->order->setDeliveryCost(['cost' => 0]);
        }

        $this->payments = $this->order->getPaymentMethods($this->data['delivery'], null, [
            'default' => $this->data['payment']
        ]);

        $this->recipient = $this->order->getRecipientInfo();

        return true;
    }

    public function getTemplateFile()
    {
        return 'chunks/ordering/delivery/index_' . $this->delivery->id . '.tpl';
    }

    public function preRender()
    {
        $properties = $this->getProperties();
        $properties['order'] = $this->data;
        $properties['delivery'] = $this->delivery;
        $properties['address'] = $this->address;
        $properties['recipient'] = $this->recipient;
        $properties['payments'] = $this->payments;

        $workTimes = [
            '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', 
            '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', 
            '18:00', '18:30', '19:00', '19:30', '20:00',  
        ];

        $properties['work_times'] = $workTimes;

        $this->setProperties($properties);
        return true;
    }
}

return 'WF\\Shop\\Controllers\\Order\\Delivery\\IndexController';