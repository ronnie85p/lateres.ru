<?php

namespace App\Processors\Profile\Passport\File;

require_once dirname(__DIR__, 3) . '/file/upload.class.php';
use App\Processors\File;

class UploadProcessor extends File\UploadProcessor
{
    public $classKey = \App\Model\Profile\Passport\File::class;

    public function initialize() 
    {
        $passport = $this->modx->getObject(\App\Model\Profile\Passport::class, 
            ['user_id' => $this->modx->user->id]);
        if (empty($passport)) {
            return $this->modx->lexicon('app.profile_passport_not_found');
        }

        $container = $this->modx->getOption('app.profile_passport_file_uploads_container', 
            null, "profiles/[[+user_id]]/passport/scans/");
        $this->app->parseContent($container, ['user_id' => $this->modx->user->id]);  

        $this->setProperties([
            'hashField' => 'orig_hash',
            'container' => $container,
            'passport_id' => $passport->id,
            'rank' => $this->getProperty('rank', 0),
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
        // $_SERVER['HTTP_MODAUTH'] = $this->modx->user->getUserToken($this->modx->context->get('key'));

        $properties = $this->getProperties();

        $properties['source_id'] = $properties['source'];
        $properties['path'] = $properties['container'];
        $properties['id'] = md5($this->uploadedFile['full_path']);
        $properties['name'] = $this->uploadedFile['name'];
        $properties['file'] = $this->uploadedFile['full_path'];
        $properties['type'] = $this->uploadedFile['type'];
        $properties['size'] = $this->uploadedFile['size'];
        $properties['url'] = $this->uploadedFile['full_path'];
        $properties['hash'] = $this->uploadedFile['hash'];
        $properties['orig_hash'] = empty($this->uploadedFile['orig_hash']) 
            ? $this->uploadedFile['hash'] : $this->uploadedFile['orig_hash'];

        $properties['createdon'] = time();
        $properties['createdby'] = $this->modx->user->id;

        $this->setProperties($properties);
        return parent::beforeUpload();
    }
}

return UploadProcessor::class;