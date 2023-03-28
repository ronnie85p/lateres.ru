<?php

namespace App\Processors\Profile\Passport\File;

require_once dirname(__DIR__, 3) . '/file/setRank.class.php';
use App\Processors\File;

class SetRankProcessor extends File\SetRankProcessor
{
    public $classKey = \App\Model\Profile\Passport\File::class;

    public function initialize() 
    {
        $passport = $this->modx->getObject(\App\Model\Profile\Passport::class, 
            ['user_id' => $this->modx->user->id]);
        if (empty($passport)) {
            return $this->modx->lexicon('app.profile_passport_not_found');
        }

        $this->setProperties([
            'criteria' => [
                'id' => $this->getProperty('id'),
                'passport_id' => $passport->get('id'),    
            ]
        ]);

        return parent::initialize();
    }
}

return SetRankProcessor::class;