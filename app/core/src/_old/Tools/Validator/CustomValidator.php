<?php

namespace Wf\Tools\Validator;

use MODX\Revolution\modX;
use Sterc\FormIt;
use Sterc\FormIt\Validator;

class CustomValidator extends Validator
{
    function __construct(FormIt &$formit, array $config = [])
    {
        parent::__construct($formit, $config);
        $this->modx->lexicon->load('wf_tools:validator');
    }
    
    public function phone($key, $value, $value2)
    {
        if (empty($value)) {
            return true;
        }
        
        if (!preg_match('/(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){7,14}(\s*)?/m', $value)) {
            return $this->_getErrorMessage($key, 'vTextPhone', '_mtools.validator_error_phone', [
                'field' => $key,
                'value' => $value,
            ]);
        }
        
        return true;
    }
}