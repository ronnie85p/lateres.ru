<?php

namespace WF\Tools;

use MODX\Revolution\modX;
use Sterc\FormIt;
use WF\Tools;

class Validator extends Tools
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);

        $this->formIt = $this->modx->services->get('formit');
    
        if ($this->formIt) {
            $this->formIt->loadRequest();
            $this->formIt->request->loadDictionary();

            if ($className = $this->loadClass('Tools\\Validator\\CustomValidator')) {
                $this->validator = new $className($this->formIt, $this->config);
            }
        }
    }
  
    /**
    * @return boolean
    */
    public function validate(array $fields, $validation) 
    {
        if (!$this->validator) {
            return true;
        }
        /**
         * @array 
         * ['name' => 'required, maxLength=']
         * ['name' => ['required', 'maxlength']]
         * ['name' => [
         *      'required' => true
         * ]]
         */
        if (is_array($validation)) {
            $array = $validation;
            $validation = '';

            foreach ($array as $key => $value) {
                if (empty($value)) continue;

                if (is_string($value)) {
                    $value = array_map('trim', explode(',', $value));
                }

                if (is_array($value)) {
                    if (!is_numeric(array_keys($value)[0])) {
                        $tmp = [];
                        foreach ($value as $k => $v) {
                            if (is_bool($v) && $v === true) {
                                $tmp[] = $k;
                            } else {
                                $tmp[] = $k . '=^' . $v . '^';
                            }
                        }

                        $value = $tmp;
                    }

                    $value = implode(':', $value);
                }

                $validation .= $key . ':' . $value . ',';
            }
        }
        
        foreach ($fields as $k => $v) {
            $this->formIt->request->dictionary->set($k, $v);
        }

        $this->validator->reset();
        $this->validator->validateFields($this->formIt->request->dictionary, $validation);

        $hasErrors = $this->validator->hasErrors();
        if ($hasErrors) {
          foreach ($this->validator->getRawErrors() as $id => $msg) {
            $this->modx->error->addField($id, $msg);
          }
        }

        return !$hasErrors;
    }
  
    public function hasErrors()
    {
        return $this->validator->hasErrors();
    }
}