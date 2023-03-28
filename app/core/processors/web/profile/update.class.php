<?php

namespace App\Processors\Web\Profile;
use MODX\Revolution\Processors\Processor;

class Update extends Processor
{
    public $app;
    public $profile;

    public function initialize()
    {
        $this->profile = $this->modx->user->getOne('Profile');
        if ($this->profile === null) {
            return $this->modx->lexicon('user_profile_err_not_found');
        }

        $this->app = $this->modx->services->get('app');

        $this->setProperties([
            'validationCompany' => [
                'company_name' => 'required',
                'company_inn' => 'required',
                'company_ogrn' => 'required',
                'company_phone' => 'mobilephone',
            ],
            'validationCompanyAddress' => [
                'company_address_country' => 'required',
                'company_address_region' => 'required',
                'company_address_index' => 'required',
                'company_address_city' => 'required',
                'company_address_street' => 'required',
                'company_address_building' => 'required',
            ],
            'validation' => [
                'fullname' => 'required'
            ]
        ]);

        return parent::initialize();
    }

    public function process()
    {
        if ($this->validate() !== true) {
            return $this->failure();
        }

        $this->prepare();

        if ($this->updateCompany() !== true) {
            return $this->failure($this->modx->lexicon('user_profile_err_save'));
        }

        $this->profile->fromArray($this->getProperties());

        if ($this->profile->save() !== true) {
            return $this->failure($this->modx->lexicon('user_profile_err_save'));
        }

        return $this->cleanup();
    }

    public function getLanguageTopics()
    {
        return ['user', 'app.profile'];
    }

    public function checkPermissions()
    {
        return true;
    }

    public function validate()
    {
        $validation = $this->getProperty('validation');
        if (!empty($this->getProperty('user_type'))) {
            $validation = array_merge($validation, $this->getProperty('validationCompany'));
            if (!empty($this->getProperty('company_address_required'))) {
                $validation = array_merge($validation, $this->getProperty('validationCompanyAddress'));
            }
        }

        $validator = $this->app->getValidator();
        if (!$validator->validate($this->getProperties(), $validation)) {
            return false;
        }

        if (!empty($this->getProperty('mobilephone'))) {
            if ($this->checkMobilePhone() !== true) {
                return false;
            }
        }

        return true;
    }

    public function checkMobilePhone()
    {
        if (empty($this->modx->getCount(\App\Model\Profile\Phone::class, [
            'id' => $this->getProperty('mobilephone'), 
            'user_id' => $this->modx->user->get('id'),
        ]))) {
            $this->addFieldError('mobilephone', 
                $this->modx->lexicon('app.profile_mobilephone_required'));       
        }
        
        return true;
    }

    public function prepare()
    {
        $formatter = $this->app->getService('formater', \App\Formater::class);
        $properties = $this->getProperties();

        $fullname = array_slice(array_map('ucfirst', explode(' ', 
            $formatter->trimSpaces($properties['fullname']))), 0, 3);
        $properties['fullname'] = implode(' ', $fullname);
        $properties['extended'] = array_merge($this->profile->get('extended') ?: [], [
            'user_type' => (int) $properties['user_type'],
        ]);

        $properties['company'] = [
            'name' => $properties['company_name'],
            'inn' => $properties['company_inn'],
            'ogrn' => $properties['company_ogrn'],
            'kpp' => $properties['company_kpp'],
            'phone' => $formatter->trimPhone($properties['company_phone']),
            'address_required' => (int) $properties['company_address_required'],
            'address_country' => $properties['company_address_country'],
            'address_index' => $properties['company_address_index'],
            'address_region' => $properties['company_address_region'],
            'address_city' => $properties['company_address_city'],
            'address_street' => $properties['company_address_street'],
            'address_building' => $properties['company_address_building'],
            'address_floor' => $properties['company_address_floor'],
            'address_corpus' => $properties['company_address_corpus'],
            'address_room' => $properties['company_address_room'],
            'address_premise' => $properties['company_address_premise'],
        ];
        
        $this->setProperties($properties);
    }

    public function updateCompany()
    {
        $company = $this->modx->getObject(\App\Model\Profile\Company::class, [
            'user_id' => $this->modx->user->get('id')]);
        if (empty($company)) {
            $company = $this->modx->newObject(\App\Model\Profile\Company::class, [
                'user_id' => $this->modx->user->get('id'),
                'createdon' => time(),
            ]);
        } else {
            $company->set('updatedon', time());
        }

        $company->fromArray($this->getProperty('company'));

        return $company->save();
    }

    public function cleanup()
    {
        return $this->success($this->modx->lexicon('app.profile_updated'));
    }
}

return Update::class;
