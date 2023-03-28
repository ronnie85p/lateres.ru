<?php

namespace App\Processors\Profile\Passport\File;

require_once dirname(__DIR__, 3) . '/file/check.class.php';
use App\Processors\File;

class Check2Processor extends File\CheckProcessor
{
    public $classKey = \App\Model\Profile\Passport\File::class;

    public function initialize() 
    {
        $criteria = ['user_id' => $this->modx->user->id];
        $classKey = \App\Model\Profile\Passport::class;

        $passport = $this->modx->getObject($classKey, $criteria);
        if (empty($passport)) {
            $passport = $this->modx->newObject($classKey, $criteria);
            if (!$passport->save()) {
                return $this->modx->lexicon('app.unknown_err');
            }
        }

        $this->setProperties([
            'criteria' => [
                'passport_id' => $passport->get('id'),
            ],
            'allowedTypes' => $this->modx->getOption('app.profile_passport_file_allowed_types', 
                null, 'image/png, image/jpeg'),
            'minSize' => $this->modx->getOption('app.profile_passport_file_min_size', null, 0),        
            'maxSize' => $this->modx->getOption('app.profile_passport_file_max_size', null, 0), 
        ]);

        return parent::initialize();
    }
}

return Check2Processor::class;