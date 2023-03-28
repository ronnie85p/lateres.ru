<?php

namespace App\Processors\Profile\Passport\File;

require_once dirname(__DIR__, 3) . '/file/updateInfo.class.php';
use App\Processors\File;

class UpdateInfoProcessor extends File\UpdateInfoProcessor
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
            ],
            'name' => $this->getProperty('name'),
            'description' => $this->getProperty('description'),
        ]);

        return parent::initialize();
    }

    public function prepareProperties()
    {
        $properties = $this->getProperties();

        $properties['name'] = mb_substr(trim($properties['name']), 0, 120);
        $properties['description'] = mb_substr(trim($properties['name']), 0, 200);
        $properties['updatedon'] = time();
        $properties['updatedby'] = $this->modx->user->id;

        $this->setProperties($properties);
    }
}

return UpdateInfoProcessor::class;