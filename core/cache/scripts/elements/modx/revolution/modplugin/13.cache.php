<?php  return '
switch ($modx->event->name) {
    case \'OnHandleRequest\':

        
        break;
    
    case \'OnPageNotFound\':
        if (in_array($modx->context->key, [\'mgr\'])) {
            break;
        }
        
        $uri = $_REQUEST[\'q\'];
        if (!preg_match(\'/^([a-z_0-9]+(?=\\/)?){1}/i\', $uri, $matches)) {
            break;
        }
     
        $context = $matches[0];
        if ($modx->getCount(modContext::class, [\'key\' => $context])) {
            $contexts = array_keys($modx->user->getSessionContexts());
            if (in_array($context, $contexts)) {
                $modx->switchContext($context);
                // $uri = ltrim(str_replace($context, \'\', $uri), \'/\');
                // $uri = empty($uri) ? $modx->makeUrl($modx->getOption(\'site_start\'), $context) : $uri;
                // $_REQUEST[\'q\'] = $uri;
                $modx->handleRequest();
                exit();
            } else {
                $siteUrl = $modx->makeUrl($modx->getOption(\'login_page\', null, 
                    $modx->getOption(\'site_start\')));
                $modx->sendRedirect($siteUrl);
            }
        } 
        break;
}
return;
';