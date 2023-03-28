<?php

namespace App\Processors\Web\Profile\Phone;
use MODX\Revolution\Processors\Model\GetProcessor;

class Get extends GetProcessor
{
    public $classKey = \App\Model\Profile\Phone::class;
    public $primaryKeyField = 'where';

    public function initialize() 
    {
        if (!$this->modx->user->isAuthenticated('web')) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $id = $this->getProperty('id');
        if (empty($id)) {
            $profile = $this->modx->user->getOne('Profile');
            $id = $profile->get('mobilephone');
        }

        $this->setProperties([
            'where' => [
                'user_id' => $this->modx->user->get('id'),
                'id' => $id,
            ]
        ]);

        return parent::initialize();
    }
}

return Get::class;
