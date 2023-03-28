<?php

namespace App\Processors\Web\Delivery\Payment;
use MODX\Revolution\Processors\Model\GetListProcessor;

class GetList extends GetListProcessor
{
    public $classKey = \msPayment::class;

    public function initialize() 
    {
        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:delivery', 'app'];
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $c->innerJoin(\msDeliveryMember::class, 'DeliveryMember', 'DeliveryMember.payment_id = id' );
        $c->select(['msPayment.*', 'DeliveryMember.*']);
        $c->where([
            'active' => 1,
            'DeliveryMember.delivery_id' => $this->getProperty('delivery_id'),
        ]);
        
        return $c;
    }
    
    public function outputArray(array $array, $count = false)
    {
        return json_decode(
            parent::outputArray($array, $count)
            , true
        );
    }
}

return GetList::class;