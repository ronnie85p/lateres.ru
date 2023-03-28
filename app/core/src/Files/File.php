<?php

namespace App\Files;
use MODX\Revolution\modX;

class File extends \App\Core 
{
    public $source;

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, array_merge([
            // etc...
        ], $config));

        $this->modx->lexicon('app:file');
    }

    public function initialize()
    {
        $this->source = $this->getService('source', \App\Files\Source::class, $this->config);

        return $this->source->initialize();
    }

    /**
     * @return App\Files\File\Validator
     */
    public function getValidator(array $config = [])
    {
        return $this->getService('validator', 
            \App\Files\File\Validator::class, $config);
    }

    public function validate(array $file)
    {
        $this->getValidator();
        
        $validated = $this->validator->checkUploaded($file);
        if ($validated !== true) {
            return $validated;
        }

        return $this->validator->validate($file);
    }

    /**
     * @param string $path
     * @param array $files
     * @return boolean
     */
    public function upload(string $path, array $file)
    {
        return $this->source->uploadObjects($path, [ $file ], true);
    }

    public function remove(string $file)
    {
        return $this->source->removeObject($file);
    }

    public function prepareArray($object)
    {
        $array = $object->toArray();
        $source = $object->getOne('Source');
        if ($source) {
            $properties = $source->getPropertyList();
            $array['url'] = trim($properties['url'], '/') . '/' . $array['url'];
        }

        return $array;
    }
}