<?php

namespace App\Processors\Web\File;
require_once __DIR__ . '/base.class.php';

class Change extends BaseProcessor
{
    public $classKey = \App\Model\Resource\File::class;

    /**@var array $uploadedFile */
    public $uploadedFile;
    public $oldFileUrl;
    public $object;

    public function initialize() 
    {
        $this->object = $this->modx->getObject($this->classKey, [
            'file' => $this->getProperty('file'), 
            'createdby' => $this->modx->user->get('id')
        ]);
        if (empty($this->object)) {
            return $this->modx->lexicon('app.file_not_found');
        }

        if (empty($this->getProperty('path'))) {
            return $this->modx->lexicon('app.file_no_path');
        }
        $this->container = trim($this->getProperty('path'), '/') . '/';

        $this->setProperties([
            'source' => $this->modx->getOption('app.file_default_media_source', 
                null, 3),

            /**@var string $allowedTypes. Ex: 'image/jpeg, image/png' */
            'allowedTypes' => $this->modx->getOption('app.file_allowed_types', 
                null, ''),

            /**@var int $minSize  */
            'minSize' => $this->modx->getOption('app.file_min_size', 
                null, 0),

            /**@var int $maxSize  */
            'maxSize' => $this->modx->getOption('app.file_max_size', 
                null, 0),

            /**@var string $thumbParams */
            'thumbParams' => $this->modx->getOption('app.file_thumb_params', 
                null, '{}'),
        ]);

        $this->loadFileHandler();

        $this->uploadedFile = $_FILES[0];
        return parent::initialize();
    }

    public function process()
    {
        $this->prepareProperties();

        $validated = $this->validate();
        if ($validated !== true) {
            return $this->failure($validated);
        }

        $this->getHash();

        if (!empty($this->getProperty('thumbParams'))) {
            $prevent = $this->makeThumb($this->getProperty('thumbParams'));
            if (!empty($prevent)) {
                return $this->failure($prevent);
            }
        }

        $this->getFileName();
        $this->getFullPath(); 

        $prevent = $this->uploadToContainer();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $this->getOldFileUrl();
        $this->setFields();

        if (!$this->saveObject()) {
            return $this->failure($this->modx->lexicon('app.unknown_err', ['code' => 1]));
        }

        $this->removeOldFile();

        return $this->cleanup();
    }

    public function prepareProperties()
    {
        $properties = $this->getProperties();

        $properties['container'] = trim($properties['container'], '/') . '/';
        $properties['source'] = (int) $properties['source'];
        $properties['minSize'] = (int) $properties['minSize'];
        $properties['maxSize'] = (int) $properties['maxSize'];

        $properties['allowedTypes'] = is_array($properties['allowedTypes']) 
            ? $properties['allowedTypes'] 
            : array_map('trim', explode(',', $properties['allowedTypes']));

        $properties['thumbParams'] = is_array($properties['thumbParams']) 
            ? $properties['thumbParams']
            : json_decode($properties['thumbParams'], true);

        $this->setProperties($properties);
    }

    public function validate()
    {
        $validator = $this->app->getService('validator', 
            \App\Files\File\Validator::class, $this->getProperties());

        $validated = $validator->checkUploadedFile($this->uploadedFile);
        if ($validated !== true) {
            return $validated;
        }

        $validated = $validator->validateFile($this->uploadedFile);
        return $validated;
    }

    public function getHash()
    {
        $hash = md5_file($this->uploadedFile['tmp_name']);
        $this->uploadedFile['hash'] = $hash;
        $this->uploadedFile['orig_hash'] = $hash;
    }

    public function makeThumb(array $params)
    {
        $this->loadPhpThumb($params);

        $src = $this->uploadedFile['tmp_name'];
        $dest = tempnam('/tmp', 'thumb_');

        if (!$this->phpThumb->make($src, $dest)) {
            return $this->modx->lexicon('app.file_upload_err', ['code' => 2]);
        }

        clearstatcache();

        $this->uploadedFile['type'] = mime_content_type($dest);
        $this->uploadedFile['size'] = filesize($dest);
        $this->uploadedFile['hash'] = md5_file($dest);
        $this->uploadedFile['tmp_name'] = $dest;
    }

    public function getFileName()
    {
        $extension = preg_replace('/^.+\//', '', $this->uploadedFile['type']);
        $filename = empty($this->getProperty('filename')) 
            ? preg_replace('/\..+$/', '', $this->uploadedFile['name'])
            : $this->getProperty('filename');   

        $this->uploadedFile['name'] = $filename . '.' . $extension;
    }

    public function getFullPath()
    {
        $this->uploadedFile['full_path'] = $this->container . $this->uploadedFile['name'];
    }

    public function uploadToContainer()
    {
        if (!$this->fileHandler->upload($this->container, $this->uploadedFile)) {
            return $this->modx->lexicon('app.file_upload_err', ['code' => 3]);
        }
    }

    public function getOldFileUrl()
    {
        $this->oldFileUrl = $this->object->get('url');
    }

    public function setFields()
    {
        $this->object->fromArray([
            'updatedon' => time(),
            'updatedby' => $this->modx->user->get('id'),
            'source_id' => $this->getProperty('source'),
            'path' => $this->container,
            'file' => $this->uploadedFile['name'],
            'url' => $this->uploadedFile['full_path'],
            'type' => $this->uploadedFile['type'],
            'size' => $this->uploadedFile['size'],
            'hash' => $this->uploadedFile['hash'],
            'orig_hash' => $this->uploadedFile['orig_hash'],
        ]);
    }

    public function saveObject()
    {
        return $this->object->save();
    }

    public function removeOldFile()
    {
        $this->fileHandler->remove($this->oldFileUrl);
    }

    public function cleanup()
    {
        $array = $this->fileHandler->prepareArray($this->object);
        return $this->success('', $array);
    }
}

return Change::class;