<?php
namespace App\Files;
use MODX\Revolution\modX;

class Source
{
    public $mediaSource;

    function __construct(modX & $modx, array $config = []) 
    {
        $this->modx =&$modx;
        $this->config = array_merge([
            'source' => $modx->getOption('default_media_source', null, 1),
        ], $config);
    }

    /**
     * @return boolean
     */
    public function initialize() 
    {
        $this->modx->loadClass('sources.modMediaSource');
        $this->mediaSource = \modMediaSource::getDefaultSource($this->modx, $this->config['source']);
        
        if (!$this->mediaSource) {
            $this->log(xPDO::LOG_LEVEL_ERROR, 
                "Media source not found [#{$this->config['source']}]");
            return false;
        }
    
        if (!$this->mediaSource->initialize()) {
            $this->log(xPDO::LOG_LEVEL_ERROR, 
                "Media source could\'t initialized [#{$this->config['mediaSourceId']}]");
            return false;
        }
        
        return true;
    }

    /**
     * @param string $src
     * @return boolean
     */
    public function objectExists(string $src)
    {
        return !empty($src) && $this->mediaSource->container->objectExists($src);
    }

    /**
     * @param string $container
     * @param array $objects like $_FILES
     * @param boolean $createContainer
     * @return boolean
     */
    public function uploadObjects(string $container, array $objects, $createContainer = false) 
    {
        if ($createContainer ===  true) {
            if (!$this->objectExists($container)) { 
                if (!$this->createContainer($container)) {
                    return false;
                }
            }
        }
      
        $this->mediaSource->uploadObjectsToContainer($container, $objects);
          
        return !$this->hasErrors();
    }

    public function getObjects(string $container, array $config = [])
    {
        $objects = [];
        $containerList = $this->mediaSource->getContainerList($container);
        foreach ($containerList as $item) {
          
          switch ($item['type']) {
            case 'file':
              
              $matched = true;
              if (!empty($config['like'])) {
                $matched = preg_match('/'.$config['like'].'/mui', basename($item['file']));
              }
              
              if ($matched) {
                
                if (!empty($config['return'])) {
                  $item = (!empty($this->config['return_prefix'])?$this->config['return_prefix']:'') . $item[$config['return']];
                }
                
                $objects[] = $item;
              }
              
              break;
              
            case 'dir':
              
              if ($config['recursive'] === true) {
                $list_ = $this->getFiles($item['path'], $config);
                foreach ($list_ as $item_) {
                  $objects[] = $item_;
                }
              }
              
              break;
              
          }
        }
        
        return $objects;
    }

    /**
     * @param string $src
     * @return boolean
     */
    public function removeObject(string $src)
    {
        if ($this->objectExists($src)) {
            $this->mediaSource->removeObject($src);
        }

        return !$this->hasErrors();
    }

    /**
     * @param string $src
     * @param string $dest
     * @param string $point
     * @return boolean
     */
    public function moveObject (string $src, string $dest, string $point = 'append') 
    {
        $dest = is_file($dest) ? dirname($dest) : $dest;
        
        if ($this->objectExists($src)) {
            $this->mediaSource->moveObject($src, $dest, $point);
        }
        
        return !$this->hasErrors();
    }

    /**
     * @param string $name
     * @param string|null $parent
     * @return boolean
    */
    public function createContainer(string $name, $parent = "/") 
    {
        $parent = empty($parent) ? '/' : $parent;
        $parent = trim($parent, '/') . '/';
        $newPath = $parent . trim($name, '/');

        $parent = '';
        $dirs = explode('/', $newPath);
        foreach ($dirs as $dir) {
            if (!$this->objectExists($parent . $dir)) {
                if (!$this->mediaSource->createContainer($dir, $parent)) {
                    break;
                }
            }

            $parent .= $dir . '/';
        }

        return !$this->hasErrors();
    }

    /**
     * @param $name
     * @return boolean
     */
    public function removeContainer (string $name) 
    {   
        $name = trim($name, '/');
        if ($this->objectExists($name)) {
            $this->mediaSource->removeContainer($name);
        }
        
        return !$this->hasErrors();
    }

    public function clearErrors () {
        $this->mediaSource->errors = [];
    }
      
    public function hasErrors () {
        return $this->mediaSource->hasErrors();
    }
      
    public function getErrors () {
        return $this->mediaSource->getErrors();
    }
}