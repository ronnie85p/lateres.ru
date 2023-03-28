<?php

namespace App\Processors\Web\Profile\Address;
use MODX\Revolution\Processors\Processor;

class SetDefault extends Processor
{
    public $classKey = \App\Model\Profile\Address::class;
    public $object;

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->object = $this->modx->getObject($this->classKey, [
            'id' => $this->getProperty('id'),
            'user_id' => $this->modx->user->get('id'),
        ]);

        if (empty($this->object)) {
            return $this->modx->lexicon('app.profile_address_not_found');
        }

        return parent::initialize();
    }

    public function process()
    {
        $profile = $this->modx->user->getOne('Profile');
        $extended = $profile->get('extended') ?: [];
        $extended['delivery_address'] = $this->object->get('id');

        $profile->set('extended', $extended);
        if ($profile->save() !== true) {
            return $this->failure($this->modx->lexicon('app.profile_address_set_default_err'));
        }

        return $this->success();
    }

    public function getLanguageTopics() {
        return ['app:profile', 'app'];
    }
}

return SetDefault::class;
