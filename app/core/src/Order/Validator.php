<?php
namespace App\Order;
use MODX\Revolution\modX;

class Validator extends \App\Core
{
    public $fields = [];

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);
    } 

    public function setFields($data)
    {
        $this->fields = $data;
    }

    public function getFields()
    {
        return $this->fields;
    }

    public function getField($key, $default = null)
    {
        return isset($this->fields[$key]) ? $this->fields[$key] : $default;
    }

    public function validate($data)
    {
        $this->setFields($data);

        if (!$this->checkRecipient()) {
            return false;
        }

        if (!$this->checkDelivery()) {
            return false;
        }

        if (!$this->checkDeliveryDateTime()) {
            return false;
        }

        if (!$this->checkPayment()) {
            return false;
        }

        return true;
    }

    public function checkRecipient()
    {
        $profile = $this->modx->user->getOne('Profile');
        $extended = $profile->get('extended') ?: [];
  
        if ($extended['user_type'] == 1) {
            $response = $this->runProcessor('web/profile/company/get');
            if ($response->isError()) {
                $this->addFieldError('recipient', 
                    $this->modx->lexicon('app.order_validate_no_company'));
                return false;
            }
        }

        return true;
    }
    
    public function checkDelivery()
    {
        $response = $this->runProcessor('web/delivery/get', [
            'id' => $this->getField('delivery')]);
        
        if ($response->isError()) {
            $this->addFieldError('delivery', 
                $this->modx->lexicon('app.order_validate_no_delivery'));

            return false; 
        }

        switch ($this->getField('delivery')) {
            case 1:
                return $this->checkDeliveryPickup();
                
            case 2:
                return $this->checkDeliveryCompany();
        }

        return true;
    }

    public function checkDeliveryPickup()
    {
        return true;
    }

    public function checkDeliveryCompany()
    {
        $profile = $this->modx->user->getOne('Profile');
        $extended = $profile->get('extended') ?: [];

        $response = $this->runProcessor('web/profile/address/get');
        if ($response->isError()) {
            $this->addFieldError('address', 
                $this->modx->lexicon('app.order_validate_no_address'));

            return false;
        }

        $response = $this->runProcessor('web/delivery/car/get', [
            'id' => $this->getField('delivery_car')
        ]);
        
        if ($response->isError()) {
            $this->addFieldError('delivery_car', 
                $this->modx->lexicon('app.order_validate_no_delivery_car'));

            return false;   
        }

        return true;
    }

    public function checkDeliveryDateTime()
    {
        $timestamp = strtotime($this->getField('delivery_date') . ' ' . $this->getField('delivery_time'));
        if (time() >= $timestamp) {
            $this->addFieldError('delivery_date', '');
            $this->addFieldError('delivery_time', '');

            return false;
        }

        return true;
    }

    public function checkPayment()
    {
        $response = $this->runProcessor('web/delivery/payment/get', [
            'id' => $this->getField('payment'),
            'delivery_id' => $this->getField('delivery'), 
        ]);

        if ($response->isError()) {
            $this->addFieldError('payment', 
                $this->modx->lexicon('app.order_creating_no_payment'));

            return false;
        }

        switch ($this->getField('payment')) {
            case 1:
                return $this->checkPaymentCash();
 
            case 2:
                return $this->checkPaymentCard();
        
            case 3:
                return $this->checkPaymentNoCash();
 
        }

        return true;
    }

    public function checkPaymentCash()
    {
        return true;
    }

    public function checkPaymentCard()
    {
        return true;
    }

    public function checkPaymentNoCash()
    {
        return true;
    }
}