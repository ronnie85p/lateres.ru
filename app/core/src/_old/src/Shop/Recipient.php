<?php

namespace WF\Shop;

use MODX\Revolution\modX;

class Recipient extends \WF\Shop
{
    public $data = [];

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);

        $this->data = $this->modx->user->getOne('Profile')->toArray();

        $company = $this->modx->getObject('WF\\Profile\\Model\\Company', [
            'user_id' => $this->modx->user->id
        ]);

        $address = $this->modx->getObject('WF\\Profile\\Model\\Address', [
            'user_id' => $this->modx->user->id
        ]);

        $this->data = array_merge($this->data, [
            'address' => $address ? $address->toArray() : [],
            'company' => $company ? $company->toArray() : []
        ]);
    }

    public function getCompany()
    {
        return $this->get('company');
    }

    public function getAddress()
    {
        return $this->get('address');
    }

    public function getAll()
    {
        return $this->data;
    }

    public function get(string $key, $default = null)
    {
        $parts = explode('.', $key);
        $value = $this->data; 
        foreach ($parts as $part) { 
            if (is_array($value)) {
                $value = $value[$part]; 
            }   
        }

        return !empty($value) ? $value : $default;
    }
}