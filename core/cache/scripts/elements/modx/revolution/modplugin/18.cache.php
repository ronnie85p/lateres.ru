<?php  return 'if (!$modx->services->has(\'app\')) { return; }

$app = $modx->services->get(\'app\');
switch ($modx->event->name) {
    
    case \'OnPageNotFound\': 

        $uri = trim(rawurldecode($_SERVER[\'REQUEST_URI\']), \'/\'); 
        $cache = $app->getTempPage($uri);
        if (empty($cache)) break;

        if ($modx->getObject(modResource::class, $cache[\'id\'])) {
            $_REQUEST[\'id\'] = $cache[\'id\'];
            $_REQUEST[\'cache_key\'] = $uri;
            unset($_REQUEST[\'q\']);
 
            $modx->handleRequest();
            exit();
        }
        
        break;
        
    case \'OnLoadWebDocument\':

        if (!empty($_REQUEST[\'cache_key\'])) {
            $modx->resource->set(\'cacheable\', 0);
            
            $cache = $app->getTempPage($_REQUEST[\'cache_key\']);
            $modx->resource->fromArray($cache);
        }
        
        break;
}
return;
';