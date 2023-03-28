<?php

use MODX\Revolution\Processors\Processor;

class wf_ShopProductPhotosValidate extends Processor 
{
    public $source;

    public $data = [];
    public $valids = [];
    public $count = 0;

    public $container = '';
    public $allowedTypes = [];
    public $minSize = 0;
    public $maxSize = 0;
    public $maxCount = 100;
    public $minImageSizes = [];
    public $maxImageSizes = [];

    public $DIRECTORY_SEPARATOR = '/';

    public function initialize()
    {
        $this->container = (string) $this->getProperty('container', 'files');
        $this->allowedTypes = (array) array_map('strtolower', $this->getProperty('types', []));
        $this->minSize = (int) $this->getProperty('minSize', 0) * pow(1024, 2);
        $this->maxSize = (int) $this->getProperty('maxSize', 0) * pow(1024, 2);
        $this->maxCount = (int) $this->getProperty('maxCount', 0);
        $this->minImageSizes = (array) $this->getProperty('minImageSizes', []);
        $this->maxImageSizes = (array) $this->getProperty('maxImageSizes', []);

        // $this->object = $this->modx->getObject('modResource', [
        //     // 'createdby' => $this->modx->user->id,
        //     'id' => (int) $this->getProperty('resource', 0)
        // ]);
        
        // if (!$this->object) {
        //     // return 'Такой товар не найден.';
        // }

        $this->data = json_decode($this->getProperty('data', []), true);
        if (!is_array($this->data)) {
            return 'Требуются данные для проверки.';
        }

        return true;
    }

    public function process()
    {
        if (!$this->getSource()) {
            return $this->failure();
        }

        $this->validate();

        // return $this->test();
        if (!empty($this->valids)) {
            $this->source->clearCache();
            $this->createContainer($this->container);
        }

        return $this->success('', [
            'data' => $this->valids,
            'count' => $this->count
        ]);
    }

    public function hasPermissions() 
    {
        return [];
    }

    public function test()
    {
        return $this->failure('Test mode', [
            'properties' => $this->getProperties(),
            'container' => $this->container,
            'allowedTypes' => $this->allowedTypes,
            'minSize' => $this->minSize,
            'maxSize' => $this->maxSize,
            'maxCount' => $this->maxCount,
            'minImageSizes' => $this->minImageSizes,
            'maxImageSizes' => $this->maxImageSizes,
            'data' => $this->data,
            'valids' => $this->valids,
            'types' => $this->types
        ]);
    }

    public function getSource() 
    {
        $this->source = modMediaSource::getDefaultSource($this->modx, (int) $this->getProperty('source'), false);

        if (!$this->source) {
            return false;
        }

        $this->source->initialize();
        return $this->source;
    }

    public function objectExists($object)
    {
        return !empty($object) && $this->source->container->objectExists($object);
    }

    public function createContainer(string $container, bool $recursive = true) 
    {
        $container = trim($container, $this->DIRECTORY_SEPARATOR);
        $directories = array_map('trim', explode($this->DIRECTORY_SEPARATOR, $container));
       
        if ($recursive) {

            $parent = '';
            foreach ($directories as $directory) {
                if (empty($directory)) continue;
                if (!$this->objectExists($parent . $directory)) {
                    $this->modx->log(modX::LOG_LEVEL_ERROR, 'object not exists: ' . $parent . $directory);
                    if (!$this->source->createContainer($directory, $parent)) {
                        return false;
                    }
                }
                $parent .= $directory . $this->DIRECTORY_SEPARATOR;
            }

        } else {

            $lastIdx = count($directories) - 1;
            $container = $directories[$lastIdx];
            $parent = implode($this->DIRECTORY_SEPARATOR, array_slice($directories, 0, $lastIdx)) . $this->DIRECTORY_SEPARATOR;
            // return [$lastIdx, $parent, $container, $parent . $container, $this->objectExists($parent . $container)];
            if (!$this->objectExists($parent . $container)) {
                $this->modx->log(modX::LOG_LEVEL_ERROR, 'object not exists2: ' . $parent . $container);
                if (!$this->source->createContainer($container, $parent)) {
                    return false;
                }
            }
            return [$lastIdx, $parent, $container, $parent . $container, $this->objectExists($parent . $container)];
        }

        return true;
    }

    public function validate()
    {
        $this->count = $this->modx->getCount('modResourceFile', ['product_id' => $this->getProperty('resource')]);
        $this->valids= [];
        foreach ($this->data as $item) {

            if (!$this->checkMaxCount()) {
                $this->modx->error->addField($item['name'], 'max_count_more');
                break;
            }

            $prevent = $this->validateFile($item);
            if (!empty($prevent)) {
                $this->modx->error->addField($item['name'], $prevent);
                break;
            }

            $this->valids[] = $item;
            $this->count++;
        }

        return !$this->modx->error->hasError();
    }

    public function validateFile($file)
    {   
        try {
          
            if (!$this->checkMinSize($file['size'])) {
                throw new RuntimeException("File size is less than allowed.");
            }
          
            // You should also check filesize here.
            if (!$this->checkMaxSize($file['size'])) {
                throw new RuntimeException("Exceeded filesize limit.");
            }
          
            // DO NOT TRUST $_FILES['upfile']['mime'] VALUE !!
            // Check MIME Type by yourself.
            $mimeType = strtolower(!empty($file['tmp_name']) ? mime_content_type($file['tmp_name']) : $file['type']);
          
            if (!empty($allowedTypes)) {
                if (array_search($mimeType, $allowedTypes) === false) {
                    throw new RuntimeException('Invalid file format.');
                }
            }
          
            if (strpos($mimeType, 'image/') !== false) {
                
                $imageSize = !empty($file['tmp_name']) ? getimagesize($file['tmp_name']) : $file['image_size'];
                
                if (!empty($imageSize)) {
                
                    if (!empty($this->minImageSizes[0]) && !empty($this->minImageSizes[1])) {
                        if ($imageSize[0] < $this->minImageSizes[0] || $this->minImageSizes[1] < $this->minImageSizes[1]) {
                            throw new RuntimeException('Image size does not meet the requirements. ' . implode('x', $this->minImageSizes));
                        }
                    }
                    
                    if (!empty($this->maxImageSizes[0]) && !empty($this->maxImageSizes[1])) {
                        if ($imageSize[0] > $this->maxImageSizes[0] || $imageSize[1] > $this->maxImageSizes[1]) {
                            throw new RuntimeException('Image size does not meet the requirements. '. implode('x', $this->maxImageSizes));
                        }
                    }
                    
                }
                    
            }
          
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }

    public function checkMinSize($size)
    {
        return $this->minSize > 0 ? $size >= $this->minSize : true;
    }

    public function checkMaxSize($size)
    {
        return $this->maxSize > 0 ? $size <= $this->maxSize : true;
    }

    public function checkMaxCount()
    {
        return $this->maxCount > 0 ? $this->count <= $this->maxCount : true;
    }

    public function checkType($type)
    {
        $type = preg_replace('/^\w+\//i', '', $type);
        return in_array($type, $this->types);
    }
}

return 'wf_ShopProductPhotosValidate';