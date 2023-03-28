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
            'config_disable_debug' => false,
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

class wf_ShopProductPhotosUpload extends Processor 
{
    public $source;
    public $phpThumbHandler;

    public $container = '';
    public $thumbParams = [];

    public $files = [];
    public $thumbnails = [];

    public $count = 0;
    public $DIRECTORY_SEPARATOR = '/';

    public function initialize()
    {       
        $this->container = (string) $this->getProperty('container', 'files/' . uniqid());
        $this->thumbParams = (array) $this->getProperty('thumbParams', []);

        $this->files = $_FILES;
        $this->count = count($this->files);

        return true;
    }

    public function process()
    {
        if (!$this->getSource()) {
            return $this->failure('Ошибка. Повторите запрос позже.');
        }

        $prevent = $this->checkUploadedFiles();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }
    
        // return $this->test();
        $this->getPhpThumbHandler();
        $this->source->clearCache();

        if (!$this->generateThumbnails($this->files, $this->thumbParams)){
            return $this->failure('Ошибка. Повторите запрос позже.');
        }

        if (!$this->source->uploadObjectsToContainer($this->container, $this->thumbnails)) {
            return $this->failure($this->count > 1 ? 'Ошибка загрузки некоторых файлов.' : 'Ошибка загрузки файла.');
        }

        $this->saveThumbnails();

        // return $this->test();
        return $this->success($this->count > 1 ? 'Файлы успешно загружены!' : 'Файл успешно загружен!', [
            'results' => $this->objects
        ]);
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'container' => $this->container,
            'thumbParams' => $this->thumbParams,
            'files' => $this->files,
            'count' => $this->count,
            'thumbnails' => $this->thumbnails,
            'objects' => $this->objects
            // 'fatalerror' => $this->phpThumbHandler->fatalerror,
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

    public function getPhpThumbHandler()
    {
        $this->phpThumbHandler = new PhpThumbHandler($this->modx, [
            'config_disable_debug' => false
        ]);

        $this->phpThumbHandler->initialize();
        return $this->getPhpThumbHandler;
    }

    public function saveThumbnails()
    {
        foreach ($this->thumbnails as $thumbnail) {

            $path = trim($this->container, $this->DIRECTORY_SEPARATOR) . '/';
            $object = $this->modx->newObject('msProductFile', [
                'product_id' => $this->getProperty('resource'),
                'source' => $this->source->get('id'),
                'parent' => $this->getProperty('parent', 0),
                'type' => $thumbnail['type'],
                'hash' => $thumbnail['orig_hash'],
                'file' => $thumbnail['name'],
                // 'hash' => $thumbnail['hash'],
                // 'orig_hash' => $thumbnail['orig_hash'],
                // 'size' => $thumbnail['size'],
                'path' => $path,
                'url' => $path . $thumbnail['name'],
                'createdon' => time(),
                'createdby' => $this->modx->user->id
            ]);
            $object->save();

            $object = $object->toArray();
            $url = $this->source->getPropertyList()['url'];
            $object['url'] = rtrim($url, '/') . '/' . $object['url'];
            $this->objects[] = $object;
        }
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

return 'wf_ShopProductPhotosUpload';