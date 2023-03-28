<?php

use MODX\Revolution\Processors\Processor;
use MODX\Revolution\modX;
use MODX\Revolution\modPhpThumb;

class PhpThumbHandler extends modPhpThumb 
{
    function __construct(modX &$modx, array $config = []) 
    {
        parent::__construct($modx, array_merge([
            'config_imagemagick_path' => 'usr/bin/convert',
            'config_imagemagick_use_thumbnail' => true,
            'config_prefer_imagemagick' => true,
            'config_allow_src_above_docroot' => true,
            'config_disable_debug' => true,
            'config_cache_disable_warning' => true,
            'config_cache_source_enabled' => false,
            'config_output_interlace' => true,
        ], $config));
    }

    public function initialize()
    {
        parent::initialize();
        $this->setParameters($this->config);

        return true;
    }
    
    public function setParameters(array $params) 
    {
      foreach ($params as $key => $value) {
        $this->setParameter($key, $value);
      }
    }
    
    public function generateToFile(string $src, string $filename, array $params = []) 
    {
        // $this->resetObject();
        $this->setParameters($params);
        $this->setSourceFilename($src); 

        if (!$this->GenerateThumbnail()) {
            if (!$this->config_disable_debug) {
                $this->modx->log(modX::LOG_LEVEL_ERROR, "[PhpThumbHandler][generateThumbnail] \"{$src}\"");
            }

            return false;
        }

        if (!$this->RenderToFile($filename)) {
            $this->modx->log(modX::LOG_LEVEL_ERROR, "[PhpThumbHandler][renderToFile] \"{$filename}\"");

            return false;
        }

        return true;
    }
}

class wf_ShopProductPhotoUpdate extends Processor 
{
    public $source;
    public $phpThumbHandler;

    public $id;

    public $file = [];
    public $thumbParams = [];
    public $objectArray = [];

    public $DIRECTORY_SEPARATOR = '/';

    public function initialize()
    {
        $this->file = $_FILES[0];
        $this->thumbParams = (array) $this->getProperty('thumbParams', []);

        return true;
    }

    public function process()
    {
        // return $this->test();
        if (!$this->getSource()) {
            return $this->failure();
        }

        $this->object = $this->modx->getObject('msProductFile', [
            'id' => $this->getProperty('id'),
            'product_id' => $this->getProperty('resource'),
            'source' => $this->getProperty('source'),
            'path' => $this->getProperty('container') . '/'
        ]);

        if (!$this->object) {
            return $this->failure();
        }

        $prevent = $this->checkUploadedFiles();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $this->getPhpThumbHandler();
        $this->source->clearCache();

        if (!$this->generateThumbnails([$this->file], $this->thumbParams)){
            return $this->failure('Ошибка. Повторите запрос позже.');
        }

        // return $this->test();
        if (!$this->source->uploadObjectsToContainer($this->object->get('path'), $this->thumbnails)) {
            return $this->failure('Ошибка загрузки файла.');
        }

        $this->updateObject();
        $this->removeFile();
    
        // return $this->test();
        return $this->success('Файл успешно обновлен.', $this->objectArray);
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'id' => $this->id,
            'thumbParams' => $this->thumbParams,
            'file' => $this->file,
            'thumbnails' => $this->thumbnails,
            'object' => $this->objectArray
        ]);
    }

    public function removeFile()
    {
        return $this->source->removeObject($this->oldUrl);
    }

    public function updateObject()
    {
        $this->oldUrl = $this->object->get('url');

        $thumbnail = $this->thumbnails[0];
        $this->object->fromArray([
            'type' => $thumbnail['type'],
            'hash' => $thumbnail['orig_hash'],
            'file' => $thumbnail['name'],
            // 'hash' => $thumbnail['hash'],
            // 'orig_hash' => $thumbnail['orig_hash'],
            // 'size' => $thumbnail['size'],
            'url' => $this->object->get('path') . $thumbnail['name'],
            // 'updatedon' => time(),
            // 'updatedby' => $this->modx->user->id
        ]);

        $this->object->save();

        $url = $this->source->getPropertyList()['url'];
        $this->objectArray = $this->object->toArray();
        $this->objectArray['url'] = rtrim($url, '/') . '/' . $this->objectArray['url'];
    }

    public function generateThumbnails(array $files, array $params)
    {
        $this->thumbnails = [];
        foreach ($files as $file) {
            $extension = !empty($params['f']) 
                ? $params['f'] 
                : preg_replace('/^\w+\//', '', mime_content_type($file['tmp_name']))
            ;

            $filename = md5(rand(1, 9) * microtime());
            $filename = substr($filename, -(strlen($filename) - 1), 25) . '.' . $extension;
            $tmpname = tempnam('tmp', 'thumb');

            if (!$this->phpThumbHandler->generateToFile($file['tmp_name'], $tmpname, $params)) {
                $this->modx->error->addError('file_error', $tmpname);
                continue;
            }

            $this->thumbnails[] = [
                'error' => 0,
                'orig_hash' => md5_file($file['tmp_name']),
                'hash' => md5_file($tmpname),
                'tmp_name' => $tmpname,
                'name' => $filename,
                'type' => mime_content_type($tmpname),
                'size' => filesize($tmpname),
            ];
        }

        return !$this->modx->error->hasError();
    }

    public function getSource()
    {
        $this->source = modMediaSource::getDefaultSource($this->modx, 
            $this->getProperty('source'), false);
        if (!$this->source) {
            return false;
        }

        $this->source->initialize();
        return $this->source;
    }

    public function getPhpThumbHandler()
    {
        $this->phpThumbHandler = new PhpThumbHandler($this->modx, [
            'config_disable_debug' => false
        ]);

        $this->phpThumbHandler->initialize();
        return $this->getPhpThumbHandler;
    }

    public function checkUploadedFiles()
    {
        if (empty($_FILES)) {
            return 'Files was not uploaded.';
        }

        foreach ($_FILES as $file) {
            $prevent = $this->checkUploadedFile($file);
            if (!empty($prevent)) {
                $this->modx->error->addField($file['name'], $prevent);
                break;
            }
        }

        if ($this->modx->error->hasError()) {
            return 'Some files was not uploaded.';
        }
    }

    public function checkUploadedFile($file) 
    {
        try {
      
            if (!is_uploaded_file($file['tmp_name'])) {
                throw new RuntimeException('File not uploaded.');
            }
            
            // Undefined | Multiple Files | $_FILES Corruption Attack
            // If this request falls under any of them, treat it invalid.
            if (!isset($file['error']) || is_array($file['error'])) {
              throw new RuntimeException('Invalid parameters.');
            }
            
            switch ($file['error']) {
              
                case UPLOAD_ERR_OK:
                    break;
              
                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    throw new RuntimeException("Exceeded filesize limit. [0x{$file['error']}]");
              
                case UPLOAD_ERR_NO_FILE:
                    throw new RuntimeException('No file sent.');
                
                default:
                    $this->modx->log(xPDO::LOG_LEVEL_ERROR, "File error. [0x{$file['error']}]");
                    throw new RuntimeException('Unknown errors.');
                
            }
            
        } catch (Exception $e) {
            return $e->getMessage();
        }
    }
}

return 'wf_ShopProductPhotoUpdate';