<?php

namespace App\Processors\Web\Profile\Address;
use MODX\Revolution\Processors\Model\UpdateProcessor;

class Update extends UpdateProcessor
{
    public $app;

    public $classKey = \App\Model\Profile\Address::class;
    public $primaryKeyField = 'where';
    public $beforeSaveEvent = 'onAppProfileAddressBeforeSave';
    public $afterSaveEvent = 'onAppProfileAddressAfterSave';

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->app = $this->modx->services->get('app');
        $this->setProperties([
            'title' => $this->getProperty('title', ''),
            'text' => $this->getProperty('address', ''),
            'country' => $this->getProperty('', 'Россия'),
            'region' => $this->getProperty('region', ''),
            'district' => $this->getProperty('district', ''),
            'city' => $this->getProperty('city', ''),
            'metro' => $this->getProperty('metro', ''),
            'street' => $this->getProperty('street', ''),
            'building' => $this->getProperty('building', ''),
            'coords' => $this->getProperty('coords', ''),
            'comment' => $this->getProperty('comment', ''),
            'map_zoom' => $this->getProperty('map_zoom', 
                $this->modx->getOption('app.profile_address_default_map_zoom', null, 15)),

            'where' => [
                'user_id' => $this->modx->user->id,
                'id' => $this->getProperty('id'),
            ],

            'validation' => [
                'region' => 'required',
                'district' => 'required',
                'city' => 'required',
                'street' => 'required',
                'building' => 'required',
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

        if ($this->_doesAlreadyExists()) {
            return $this->modx->lexicon('app.profile_address_already_exists');
        }

        return parent::beforeSet();
    }
    
    public function afterSave()
    {
        $extended = $this->modx->user->Profile->get('extended') ?: [];
        $isDefault = (int)$extended['delivery_address'] === $this->object->get('id');

        if (!$isDefault && !empty($this->getProperty('is_default'))) {
            $profile = $this->modx->user->getOne('Profile');
            $extended = $profile->get('extended') ?: [];
            $extended['delivery_address'] = $this->object->get('id');

            $profile->set('extended', $extended);
            $profile->save();
        }

        parent::afterSave();
    }

    public function validate()
    {   
        $validator = $this->app->getValidator();
        if (!$validator->validate($this->getProperties(), $this->getProperty('validation'))) {
            return false;
        }

        return true;
    }

    public function prepare()
    {
        $formatter = $this->app->getService('formatter', \App\Formater::class);

        $properties = $this->getProperties();
        $properties['updatedon'] = time();
        $properties['country'] = $formatter->trimSpaces($properties['country']);
        $properties['region'] = $formatter->trimSpaces($properties['region']);
        $properties['district'] = $formatter->trimSpaces($properties['district']);
        $properties['city'] = $formatter->trimSpaces($properties['city']);
        $properties['street'] = $formatter->trimSpaces($properties['street']);
        $properties['comment'] = substr($formatter->trimSpaces($properties['comment']), 0, 255);
        $properties['text'] = empty($properties['text']) ? implode(', ', [
            $properties['country'], 
            $properties['region'], 
            $properties['district'], 
            $properties['city'], 
            $properties['street'], 
            $properties['building'], 
        ]) : $properties['text'];

        $this->setProperties($properties);
    }

    public function _doesAlreadyExists()
    {
        return $this->doesAlreadyExist([
            'id:!=' => $this->getProperty('id'),
            'text' => $this->getProperty('text'), 
            'user_id' => $this->modx->user->id,
        ]);
    }

    public function cleanup()
    {
        return $this->success(
            $this->modx->lexicon('app.profile_address_updated'),
            [ 'id' => $this->object->get('id') ]
        );
    }
}

return Update::class;
