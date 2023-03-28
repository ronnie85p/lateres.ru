<?php

namespace App\Processors\Web\Profile\Phone;
use MODX\Revolution\Processors\Model\CreateProcessor;

class Create extends CreateProcessor
{
    public $classKey = \App\Model\Profile\Phone::class;
    public $beforeSaveEvent = 'onAppProfilePhoneBeforeSave';
    public $afterSaveEvent = 'onAppProfilePhoneAfterSave';

    public $app;
    public $givenPhone;

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->app = $this->modx->services->get('app');
        $this->givenPhone = trim($this->getProperty('phone'));

        $this->setProperties([
            'validation' => [
                'phone' => 'required:mobilephone'
            ]
        ]);

        return parent::initialize();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function beforeSet()
    {
        if ($this->validate() !== true) {
            return false;
        }

        $this->prepare();

        if ($this->doesAlreadyExist(['id' => $this->getProperty('id')])) {
            $this->addFieldError('phone', 
                $this->modx->lexicon('app.profile_phone_already_exists'));
            return false;
        }

        return true;
    }

    public function afterSave()
    {
        if (!empty($this->getProperty('is_default'))) {
            $this->modx->user->Profile->set('mobilephone', $this->object->get('id'));
            $this->modx->user->Profile->save();
        }
    }

    public function validate()
    {
        $validator = $this->app->getValidator();

        return $validator->validate($this->getProperties(), 
            $this->getProperty('validation'));
    }

    public function prepare()
    {
        $formatter = $this->app->getService('formater', 
            \App\Formater::class);

        $properties = $this->getProperties();
        $rawPhone = $formatter->trimPhone($this->givenPhone);
        $properties['id'] = $rawPhone;
        $properties['text'] = $this->givenPhone;
        $properties['user_id'] = $this->modx->user->get('id');
        $properties['createdon'] = time();

        $this->setProperties($properties);
    }

    public function cleanup()
    {
        return $this->success(
            $this->modx->lexicon('app.profile_phone_сreated'),
            $this->object
        );
    }
}

return Create::class;
