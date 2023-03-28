<?php

// public function getMediaSource($mediaSourceId = null)
// {   
//     $mediaSourceId = $mediaSourceId ?: $this->get('source_id');
//     $mediaSource = modMediaSource::getDefaultSource($this->xpdo, $mediaSourceId, false);

//     if ($mediaSource) {
//         $mediaSource->initialize();
//     }

//     return $mediaSource;
// }

// public function getUrl()
// {
//     $mediaSource = $this->getMediaSource();
//     if (!$mediaSource) {
//         return false;
//     }

//     $url = trim($mediaSource->getPropertyList()['url'], '/') . '/';
//     return $url . trim($this->get('url'), '/');
// }

// public function getLastRank()
// {
//     $rslt = $this->xpdo->query('SELECT MAX(rank) from ' . 
//         $this->xpdo->getTableName($this::class) . ' WHERE path=\'' .
//         $this->get('path') . '\''
//     );

//     $rank = 0;
//     if ($rslt !== false) {
//         $rank = (int)$rslt->fetch(PDO::FETCH_NUM)[0];
//     }

//     return $rank;
// }

// public function makeThumbnail(array $params = [])
// {
//     if (empty($this->get('url'))) {
//         return false;
//     }
//     // return $this->get('url');
//     $phpThumb = new modPhpThumb($this->xpdo, $params);
//     $phpThumb->initialize();

//     $phpThumb->setParameter('config_imagemagick_path', 'usr/bin/convert');
//     $phpThumb->setParameter('config_imagemagick_use_thumbnail', true);
//     $phpThumb->setParameter('config_prefer_imagemagick', true);
//     $phpThumb->setParameter('config_allow_src_above_docroot', true);
//     $phpThumb->setParameter('config_disable_debug', false);
//     $phpThumb->setParameter('config_cache_disable_warning', true);
//     $phpThumb->setParameter('config_cache_source_enabled', false);
//     $phpThumb->setParameter('config_output_interlace', true);

//     $phpThumb->set($this->get('url')); 
//     if (!$phpThumb->generate()) {
//         return 'no generate';
//     }

//     $extension = !empty($params['f']) 
//         ? $params['f'] 
//         : preg_replace('/^\w+\//', '', mime_content_type($src))
//     ;

//     $filename = md5(rand(1, 9) * microtime());
//     $filename = substr($filename, -(strlen($filename) - 1), 25) . '.' . $extension;
//     $tmpname = tempnam('tmp', 'thumb');

//     if (!$phpThumb->RenderToFile($tmpname)) {
//         $this->modx->log(modX::LOG_LEVEL_ERROR, "[PhpThumbHandler][RenderToFile] \"{$tmpname}\"");
//         return false;
//     }

//     $this->fromArray([
//         'file' => $filename,
//         'orig_hash' => md5_file($this->get('url')),
//         'hash' => md5($tmpname),
//         'type' => mime_content_type($tmpname),
//         'size' => filesize($tmpname),
//         'url' => $tmpname
//     ]);

//     return true;
// }

// public function save($cacheFlag = null)
// {
//     if ($this->_new) {
//         $this->fromArray([
//             'createdon' => time(),
//             'createdby' => $this->xpdo->user->get('id')
//         ]);
//     } else {
//         $this->fromArray([
//             'updatedon' => time(),
//             'updatedby' => $this->xpdo->user->get('id')
//         ]);
//     }

//     $url = $this->get('path') . '/' . $this->get('file');

//     if ($url != $this->get('url')) {
//         $source = $this->getMediaSource();

//         if (!$source->container->objectExists($url)) {
//             $file = [
//                 'type' => $this->get('type'),
//                 'size' => $this->get('size'),
//                 'name' => $this->get('file'),
//                 'tmp_name' => $this->get('url')
//             ];

//             $source->clearCache();
//             if (!$source->uploadObjectsToContainer($this->get('path'), [$file])) {
//                 return false;
//             }
//         }

//         $this->set('url', $url);
//     }

//     return parent::save($cacheFlag);
// }

// public function remove(array $ancestors = [])
// {
//     $url = $this->get('url');

//     if (!parent::remove($ancestors)) {
//         return false;
//     }

//     $mediaSource = $this->getMediaSource();
//     if ($mediaSource) {
//         if ($mediaSource->container->objectExists($url)) {
//             $mediaSource->removeObject($url);
//         }
//     }

//     return true;
// }

// public function saveChanged($cacheFlag = null)
// {
//     $url = $this->get('url');
//     if (!parent::save($cacheFlag)) {
//         return false;
//     }

//     $mediaSource = $this->getMediaSource();
//     if ($mediaSource) {
//         if ($mediaSource->container->objectExists($url)) {
//             $mediaSource->removeObject($url);
//         }
//     }
// }