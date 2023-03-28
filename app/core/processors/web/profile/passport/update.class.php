<?php

namespace App\Processors\Web\Profile\Passport;
use MODX\Revolution\Processors\Processor;

class UpdateProcessor extends Processor
{
    public $classKey = \App\Model\Profile\Passport::class;

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }
        
        $this->app = $this->modx->services->get('app');
        $this->object = $this->modx->getObject($this->classKey, 
            ['user_id' => $this->modx->user->id]);
        if (empty($this->object)) {
            $this->object = $this->modx->newObject($this->classKey);
            $this->object->set('user_id', $this->modx->user->id);
        }

        $this->setProperties([
            'validation' => [
                'gender' => 'required',
                'date_of_birth' => 'required',
                'place_of_birth' => 'required',
                'sitizenship' => 'required',
                'seria' => 'required',
                'num' => 'required',
                'dep_issued' => 'required',
                'date_issued' => 'required',
                // 'dep_code' => 'required',
                // 'place_of_reg' => 'required',
            ]
        ]);

        return true;
    }

    public function process()
    {
        if ($this->validate() === false) {
            return $this->failure($this->modx->lexicon('erro'));
        }

        $this->prepare();

        $this->object->fromArray($this->getProperties());
        if (!$this->saveObject()) {
            return $this->failure($this->modx->lexicon('undef_err'));
        }

        $this->modx->user->Profile->save();

        return $this->cleanup();
    }

    public function saveObject() 
    {
        return $this->object->save();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }

    public function validate()
    {
        $validator = $this->app->getValidator();

        if ($validator->validate($this->getProperties(), $this->getProperty('validation'))) {
            return true;
        }

        return false;
    }

    public function prepare()
    {
        $properties = $this->getProperties();
        $properties['dob'] = $properties['date_of_birth'];

        $this->modx->user->Profile->fromArray($properties);
    }

    public function cleanup()
    {
        return $this->success(
            $this->modx->lexicon('app.profile_passport_updated'),
            [ 'id' => $this->object->get('id') ]
        );
    }
}

return UpdateProcessor::class;
