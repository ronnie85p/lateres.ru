<?php

namespace App\Processors\Profile\Passport\File;

require_once dirname(__DIR__, 3) . '/file/change.class.php';
use App\Processors\File;

class ChangeProcessor extends File\ChangeProcessor
{
    public $classKey = \App\Model\Profile\Passport\File::class;

    public function initialize() 
    {
        $passport = $this->modx->getObject(\App\Model\Profile\Passport::class, 
            ['user_id' => $this->modx->user->id]);
        if (empty($passport)) {
            return $this->modx->lexicon('app.unknown_err', ['code' => 1]);
        }

        $container = $this->modx->getOption('app.profile_passport_file_uploads_container', 
            null, "profiles/[[+user_id]]/passport/scans/");
        $this->app->parseContent($container, ['user_id' => $this->modx->user->id]);  

        $criteria = [
            'id' => $this->getProperty('id'),
            'passport_id' => $passport->get('id'),
        ];

        $this->setProperties([
            'hashField' => 'orig_hash',
            'container' => $container,
            'criteria' => $criteria,
            'filename' => uniqid('_'),
            'allowedTypes' => $this->modx->getOption('app.profile_passport_file_allowed_types', 
                null, 'image/png, image/jpeg'),
            'minSize' => $this->modx->getOption('app.profile_passport_file_min_size', null, 0),        
            'maxSize' => $this->modx->getOption('app.profile_passport_file_max_size', null, 0),   
            'thumbParams' => $this->modx->getOption('app.profile_passport_file_thumb_params', null, '{
                "f": "png",
                "w": 1920,
                "h": 1080,
                "bg": "f0f0f0",
                "far": "C",
                "watermark": {}
            }'),
        ]);

        return parent::initialize();
    }

    public function beforeUpload()
    {
        $properties = $this->getProperties();

        $properties['source_id'] = $properties['source'];
        $properties['path'] = $properties['container'];
        $properties['file'] = $this->uploadedFile['full_path'];
        $properties['type'] = $this->uploadedFile['type'];
        $properties['size'] = $this->uploadedFile['size'];
        $properties['url'] = $this->uploadedFile['full_path'];
        $properties['hash'] = $this->uploadedFile['hash'];
        $properties['orig_hash'] = empty($this->uploadedFile['orig_hash']) 
            ? $this->uploadedFile['hash'] : $this->uploadedFile['orig_hash'];

        $properties['updatedon'] = time();
        $properties['updatedby'] = $this->modx->user->id;

        $this->setProperties($properties);
        return parent::beforeUpload();
    }
}

return ChangeProcessor::class;