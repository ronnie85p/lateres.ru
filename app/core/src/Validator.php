<?php

namespace App;
use MODX\Revolution\modX;
use Sterc\FormIt;

class Validator extends \App\Core
{
    public $formIt;
    public $validator;

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, $config);

        $this->formIt = $this->modx->services->get('formit');
    
        if ($this->formIt) {
            $this->formIt->loadRequest();
            $this->formIt->request->loadDictionary();

            if ($className = $this->loadClass(\App\Validator\Custom::class)) {
                $this->validator = new $className($this->formIt, $this->config);
            }
        }
    }
  
    /**
     * @param array $data
     * @param mixed $validation
     * 
     * ['name' => 'required, maxLength=']
     * ['name' => ['required', 'maxlength']]
     * ['name' => [
     *      'required' => true
     * ]]
     * 
     * @return bool
     */
    public function validate(array $data, $validation) 
    {
        if (!$this->validator) 
            return true;

        $this->prepareValidation($validation);
        $this->setDictionary($data);

        $this->validator->reset();
        $this->validator->validateFields($this->formIt->request->dictionary, $validation);

        $hasErrors = $this->hasErrors();
        if ($hasErrors) {
            $this->addFieldErrors($this->validator->getRawErrors());
        }

        return !$hasErrors;
    }

    public function setDictionary($data)
    {
        foreach ($data as $k => $v) {
            $this->formIt->request->dictionary->set($k, $v);
        }
    }

    public function prepareValidation(&$validation)
    {
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
    }

    public function addFieldErrors($errors)
    {
        foreach ($errors as $id => $msg) {
            $this->modx->error->addField($id, $msg);
        }
    }

    public function hasErrors()
    {
        return $this->validator->hasErrors();
    }
}