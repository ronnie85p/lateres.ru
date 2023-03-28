<?php

namespace App\Validator;

use MODX\Revolution\modX;
use Sterc\FormIt;
use Sterc\FormIt\Validator;

class Custom extends Validator
{
    function __construct(FormIt &$formit, array $config = [])
    {
        parent::__construct($formit, $config);
        $this->modx->lexicon->load('app:validator');
    }
    
    public function mobilephone($key, $value, $value2)
    {
        if (empty($value)) {
            return true;
        }

        if (!preg_match('/^\+\d{1}\s\(\d{3}\)\s\d{3}\s\d{4}$/', $value, $matches)) {
            return $this->_getErrorMessage($key, 'vTextPhone', 'app.validator_mobilephone_incorrect', [
                'field' => $key,
                'value' => $value,
            ]);
        }
        return true;
    }
}