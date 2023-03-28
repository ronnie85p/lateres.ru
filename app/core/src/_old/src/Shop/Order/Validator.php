<?php

namespace WF\Shop\Order;

use MODX\Revolution\modX;

class Validator extends \WF\Shop\Order
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    }

    public function checkDelivery(array $data)
    {
        if (!$this->getObject('msDelivery', ['id' => $data['delivery'], 'active' => 1])) {
            return 'Choose a type of delivery';
        }

        if ($data['delivery'] == $this->modx->getOption('wf_shop.delivery_company')) {

            if (!$this->modx->getObject('WF\\Profile\\Model\\Address', [
                'user_id' => $this->modx->user->id, 
                'rank' => 0
            ])) {

            }

        }
    }

    public function checkPayment(array $data)
    {
        return;
    }

    public function validate(array $data)
    {
        $prevent = $this->checkDelivery($data);
        if (!empty($prevent)) {
            return $prevent;
        }

        $prevent = $this->checkPayment($data);
        if (!empty($prevent)) {
            return $prevent;
        }
    }
}