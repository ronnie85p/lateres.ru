<?php

namespace App\Processors\Web\Delivery\Payment;
use MODX\Revolution\Processors\Model\GetProcessor;

class Get extends GetProcessor
{
    public $classKey = \msPayment::class;
    public $primaryKeyField = 'q';

    public function initialize() 
    {
        $q= $this->modx->newQuery($this->classKey);
        $q->innerJoin('msDeliveryMember', 'Member', 'Member.payment_id = id');
        $q->select([$this->modx->getSelectColumns($this->classKey), 'Member.*']);
        $q->where([
            'active' => 1,
            'id' => $this->getProperty('id'),
            'Member.delivery_id' => $this->getProperty('delivery_id'),
        ]);

        $this->setProperties([
            'q' => $q
        ]);

        return parent::initialize();
    }
}

return Get::class;
