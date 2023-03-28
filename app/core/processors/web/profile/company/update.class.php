<?php

namespace App\Processors\Profile\Company;
use MODX\Revolution\Processors\Model\UpdateProcessor;

class Update extends UpdateProcessor
{
    public $app;

    public $classKey = \App\Model\Profile\Company::class;
    public $primaryKeyField = 'where';
    public $beforeSaveEvent = 'onAppProfileCompanyBeforeSave';
    public $afterSaveEvent = 'onAppProfileCompanyAfterSave';

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->app = $this->modx->services->get('app');
        $this->setProperties([
            'name' => $this->getProperty('name', ''),
            'ogrn' => $this->getProperty('ogrn', ''),
            'kpp' => $this->getProperty('kpp', ''),
            'phone' => $this->getProperty('phone', ''),
            'comment' => $this->getProperty('comment', ''),
            'address_required' => $this->getProperty('address_required', 0),
            'address_text' => $this->getProperty('address_text', ''),
            'address_country' => $this->getProperty('address_country', ''),
            'address_index' => $this->getProperty('address_index', ''),
            'address_region' => $this->getProperty('address_region', ''),
            'address_city' => $this->getProperty('address_city', ''),
            'address_street' => $this->getProperty('address_street', ''),
            'address_building' => $this->getProperty('address_building', ''),
            'address_room' => $this->getProperty('address_room', ''),
            'address_corpus' => $this->getProperty('address_corpus', ''),
            'address_floor' => $this->getProperty('address_floor', ''),
            'address_premise' => $this->getProperty('address_premise', ''),

            'where' => [
                'user_id' => $this->modx->user->get('id'),
            ],
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function beforeSet() 
    {
        $this->beforeValidate();

        if ($this->validate() === false) {
            return $this->modx->lexicon('app.form_has_errors');
        }

        if ($this->doesExist() === false) {
            return $this->modx->lexicon('app.profile_company_already_exists');
        }

        $this->prepare();

        return parent::beforeSet();
    }

    public function validate()
    {
        $validator = $this->app->getValidator();
        $validator->validate($this->getProperties(), $this->getProperty('validation'));

        return !$this->hasErrors();
    }

    public function prepare()
    {
        $properties = $this->getProperties();
        $properties['updatedon'] = time();

        $this->setProperties($properties);
    }

    public function beforeValidate()
    {
        $formater = $this->app->getFormater();
        $properties = $this->getProperties();

        $validation = [
            'name' => 'required',
            'ogrn' => 'required',
            'inn' => 'required',
            'phone' => 'mobilephone',
        ];

        if ((int) $properties['address_required']) {
            $validation['address_country'] = 'required';
            $validation['address_index'] = 'required';
            $validation['address_region'] = 'required';
            $validation['address_city'] = 'required';
            $validation['address_street'] = 'required';
            $validation['address_building'] = 'required';
        } else {
            $properties['address_text'] = '';
            $properties['address_country'] = '';
            $properties['address_index'] = '';
            $properties['address_region'] = '';
            $properties['address_city'] = '';
            $properties['address_street'] = '';
            $properties['address_building'] = '';
            $properties['address_room'] = '';
            $properties['address_corpus'] = '';
            $properties['address_floor'] = '';
            $properties['address_premise'] = '';
        }

        $properties['validation'] = $validation;
        $properties['phone'] = $formater->trimPhone($properties['phone']);
        $properties['name'] = $formater->trimSpaces($properties['name']);
        $this->setProperties($properties);
    }

    public function doesExist()
    {
        return $this->doesAlreadyExist([
            'user_id' => $this->modx->user->get('id'), 
            'id:!=' => $this->object->get('id'),
            'name' => strtolower($this->getProperty('name')),
        ]);
    }

    public function cleanup()
    {
        return $this->success(
            $this->modx->lexicon('app.profile_company_updated'),
            [ 'id' => $this->object->get('id') ]
        );
    }
}

return Update::class;
