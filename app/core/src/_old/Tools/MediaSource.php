<?php

namespace WF\Tools;

use MODX\Revolution\modX;

class MediaSource extends WF\Tools 
{ 
    function __construct (modX &$modx, array $config = []) 
    {
        parent :: __construct($modx, array_merge([

        ], $config));


    }
  
    public function initialize () {

        $this->mediaSource = modMediaSource::getDefaultSource($this->modx, $this->config['mediaSourceId']);
        
        if (!$this->mediaSource) {
        $this->log(xPDO::LOG_LEVEL_ERROR, '[initialize] Media source not found [#' . $this->config['mediaSourceId'] . '].');
        return false;
        }

        if (!$this->mediaSource->initialize()) {
        $this->log(xPDO::LOG_LEVEL_ERROR, '[initialize] Media source could\'t initialized [#' . $this->config['mediaSourceId'] . '].');
        return false;
        }
        
        return true;
    }
  
  public function removeFiles ($files) {
    
    foreach ($files as $file) {
      if (!$this->removeObject($file)) {
        $this->error->addField($file['name'], 'ms_err_file_removed');
      }
    }
    
    return !$this->error->hasError();
  }
  
  public function uploadFiles ($path, $files, $pathCreate=false) {

    if ($pathCreate) {
      if (!$this->objectExists($path)) { 
        if (!$this->createContainer($path)) {
          return false;
        }
      }
    }

    $this->mediaSource->uploadObjectsToContainer($path, $files);
    
    return !$this->hasErrors();
  }
  
  public function getFiles ($path='/', $config=[]) {
    
    $objs = [];
    $list = $this->mediaSource->getContainerList($path);
    foreach ($list as $item) {
      
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
            
            $objs[] = $item;
          }
          
          break;
          
        case 'dir':
          
          if ($config['recursive'] === true) {
            $list_ = $this->getFiles($item['path'], $config);
            foreach ($list_ as $item_) {
              $objs[] = $item_;
            }
          }
          
          break;
          
      }
      
    }
    
    return $objs;
  }
  
  public function getFile ($file) {
    
    $filedir = dirname($file);
    $filename = pathinfo($file, PATHINFO_BASENAME);
    
    return $this->getFiles($filedir, ['like' => '(' . $filename . ')'])[0]?:[];
  }
  
  public function removeObjectFiles ($path, $like='', $recursive=false) {
   
    $objects = $this->getFiles($path, ['like' => $like, 'recursive' => $recursive]);
    foreach ($objects as $object) {
      $this->removeObject($object['file']);
    }
    
    return !$this->hasErrors();
  }
  
  public function removeObject ($file) {
    if ($this->objectExists($file)) {
      $this->mediaSource->removeObject($file);
      //$this->mediaSource->clearCache();
    }
    return !$this->hasErrors();
  }
  
  public function getDirs ($path, $config=[]) {
   
    $objs = [];
    $list = $this->mediaSource->getContainerList($path);
    foreach ($list as $item) {
      
      if ($item['type'] == 'dir') {
        
        if ($config['recursive'] === true) {
          $list_ = $this->getDirs($item['path'], $config);
          foreach ($list_ as $item_) {
            $objs[] = $item_;
          }
        } else {
          $objs[] = $item;
        }
        
      }
      
    }
    
    return $objs;
  }
  
  public function createContainer ($name, $parent="/") {
    
    $path = trim(trim($parent,'/').'/'. $name, '/');
    $paths = explode('/', $path); 
    
    $parent = '';
    foreach ($paths as $path_) {
      if (!$this->objectExists($parent . '/' . $path_)) {
        $this->mediaSource->createContainer($path_, $parent);
      }
      $parent .= '/' . $path_;
    }
    
    return !$this->hasErrors();
  }
  
  public function removeContainer ($name, $inc_files=false) {
    
    if ($inc_files === true) {
      $objects = $this->getFiles($name);
      foreach ($objects as $object) {
        if ($object['type'] == 'file') {
          if ($this->objectExists($object['file'])) {
            $this->mediaSource->removeObject($object['file']);
          }
        }
      }
    }
    
    $name = trim($name, '/');
    if ($this->objectExists($name)) {
      $this->mediaSource->removeContainer($name);
    }
    
    return !$this->hasErrors();
  }
  
  public function moveObject ($src, $dest, $point='append') {
    
    if (is_file($dest)) {
      $dest = dirname($dest);
    }
    
    if (!$this->objectExists($dest)) {
      $this->createContainer($dest);
    }
    
    if ($this->objectExists($src)) {
      $this->mediaSource->moveObject($src, $dest, $point);
    }
    
    return !$this->hasErrors();
  }
  
  public function copyObject ($src, $dest) {
    
    $dst_dir = dirname($dest);
    $dst_filename = pathinfo($dest, PATHINFO_BASENAME);
    
    $file = $this->getFile($src);
    
    return;
    $this->modx->log(xPDO::LOG_LEVEL_ERROR, print_r([
      'dst_dir' => $dst_dir, 
      'dst_filename' => $dst_filename, 
      'file' => $file
    ], true));
    
    return;
    
    if (!$this->objectExists($dst_dir)) {
      $this->createContainer($dst_dir);
    }
    
    if ($this->objectExists($src)) {
      $this->mediaSource->createObject($dst_dir, $dst_filename, $content);
    }
    
    return !$this->hasErrors();
  }
  
  public function renameContainer ($path, $name) {
    
    
    
  }
  
  public function clearCache ($options=[]) {
    
    $cacheManager = $this->modx->getCacheManager();
    if (empty($cacheManager)) {
      return;
    }
    
    $options = [
      xPDO::OPT_CACHE_KEY => $this->modx->getOption('cache_media_sources_key', $options, 'media_sources'),
      xPDO::OPT_CACHE_HANDLER => $this->modx->getOption('cache_media_sources_handler', $options, $this->modx->getOption(xPDO::OPT_CACHE_HANDLER, $options)),
      xPDO::OPT_CACHE_FORMAT => (integer) $this->modx->getOption('cache_media_sources_format', $options, $this->modx->getOption(xPDO::OPT_CACHE_FORMAT, $options, xPDOCacheManager::CACHE_PHP)),
      xPDO::OPT_CACHE_ATTEMPTS => (integer) $this->modx->getOption('cache_media_sources_attempts', $options, $this->modx->getOption(xPDO::OPT_CACHE_ATTEMPTS, $options, 10)),
      xPDO::OPT_CACHE_ATTEMPT_DELAY => (integer) $this->modx->getOption('cache_media_sources_attempt_delay', $options, $this->modx->getOption(xPDO::OPT_CACHE_ATTEMPT_DELAY, $options, 1000))
    ];
    
    $cacheManager->delete('sources/swift-' . $this->mediaSource->get('id'), $options);
    
  }
  
  public function objectExists ($path) {
    return !empty($path) && $this->mediaSource->container->objectExists($path);
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