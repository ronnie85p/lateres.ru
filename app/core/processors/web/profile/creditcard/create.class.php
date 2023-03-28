<?php

namespace App\Processors\Profile\CreditCard;

use MODX\Revolution\Processors\Model\CreateProcessor as _CreateProcessor;

class CreateProcessor extends _CreateProcessor
{
    public $classKey = \App\Model\Profile\CreditCard::class;
    public $beforeSaveEvent = 'onAppProfileCreditCardBeforeSave';
    public $afterSaveEvent = 'onAppProfileCreditCardAfterSave';

    public $validationFields;

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            // return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->validationFields = [
            'name' => '',
            'exp_month' => '',
            'exp_year' => '',
            'cvc' => ''
        ];

        $this->setDefaultProperties([
            'createdon' => time(),
            'user_id' => $this->modx->user->get('id'),
            'title' => $this->getProperty('title', ''),
            'name' => $this->getProperty('name', ''),
            'exp_month' => $this->getProperty('exp_month', ''),
            'exp_year' => $this->getProperty('exp_year', ''),
            'cvc' => $this->getProperty('cvc', ''),
            // 'brand' => $this->getProperty('brand', ''),
            // 'country' => $this->getProperty('country', ''),
            // 'funding' => $this->getProperty('funding', ''),
            // 'last4' => $this->getProperty('last4', ''),
            'rank' => $this->getProperty('name', ''),
            'trust_me' => $this->getProperty('name', ''),
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function validate()
    {
        foreach ($this->validationFields as $field => $msg) {   
            $value = $this->getProperty($field);
            if (empty($value)) {
                $msg = empty($msg) ? $this->modx->lexicon('app.form_field_required') : $msg;

                $this->addFieldError($field, $msg);
            }
        }

        return !$this->hasErrors();
    }

    public function beforeSet()
    {
        if (!$this->validate()) {
            // return $this->modx->lexicon('app.form_has_errors');
            return false;
        }

        if ($this->doesAlreadyExist(['title' => $this->getProperty('title'), 'number' => $this->getProperty('number')])) {
            $this->addFieldError('title', '');
            return false;
            // return $this->modx->lexicon('app.profile_card_already_exists');
        }

        return true;
    }

    public function cleanup()
    {
        return $this->success(
            $this->modx->lexicon('app.profile_card_сreated'),
            ['id' => $this->object->get('id')]
        );
    }
}

return CreateProcessor::class;
