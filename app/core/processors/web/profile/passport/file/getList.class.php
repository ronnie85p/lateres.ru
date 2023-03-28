<?php

namespace App\Processors\Profile\Passport\File;

require_once dirname(__DIR__, 3) . '/file/getList.class.php';
use App\Processors\File;

class GetListProcessor extends File\GetListProcessor
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
                'passport_id' => $passport->get('id'),
            ]
        ]);

        return parent::initialize();
    }
}

return GetListProcessor::class;