<?php  return array (
  'config' => 
  array (
    'base_url' => '/',
    'http_host' => 'dev.lateres.ru/',
    'index_page' => '395',
    'site_start' => '1',
    'site_url' => 'http://dev.lateres.ru/',
  ),
  'aliasMap' => 
  array (
    'lk' => 395,
    'lk/profile/' => 72,
    'lk/orders' => 58,
    'lk/order/' => 401,
    'lk/addresses/' => 59,
    'lk/address/' => 402,
    'lk/cards/' => 60,
    'lk/companies/' => 415,
    'lk/contacts' => 392,
    'lk/company/' => 412,
    'lk/favorites' => 416,
    'lk/settings/' => 61,
    'lk/addresses/item' => 400,
    'lk/cards/novaya' => 91,
    'lk/settings/login' => 81,
    'lk/settings/security' => 78,
    'lk/settings/sessions' => 79,
    'lk/settings/password' => 80,
    'lk/profile/edit' => 73,
    'lk/profile/contacts' => 77,
    'lk/profile/passport' => 56,
    'lk/addresses/item/edit' => 99,
    'lk/order/edit' => 440,
    'lk/order/success' => 439,
    'lk/address/new' => 441,
    'lk/address/edit' => 403,
    'lk/company/edit' => 413,
    'lk/companies/item' => 98,
  ),
  'resourceMap' => 
  array (
    0 => 
    array (
      0 => 395,
      1 => 72,
      2 => 58,
      3 => 401,
      4 => 59,
      5 => 402,
      6 => 60,
      7 => 415,
      8 => 392,
      9 => 412,
      10 => 416,
      11 => 61,
    ),
    59 => 
    array (
      0 => 400,
    ),
    60 => 
    array (
      0 => 91,
    ),
    61 => 
    array (
      0 => 81,
      1 => 78,
      2 => 79,
      3 => 80,
    ),
    72 => 
    array (
      0 => 73,
      1 => 77,
      2 => 56,
    ),
    400 => 
    array (
      0 => 99,
    ),
    401 => 
    array (
      0 => 440,
      1 => 439,
    ),
    402 => 
    array (
      0 => 441,
      1 => 403,
    ),
    412 => 
    array (
      0 => 413,
      1 => 414,
    ),
    415 => 
    array (
      0 => 98,
    ),
  ),
  'webLinkMap' => 
  array (
  ),
  'eventMap' => 
  array (
    'msOnChangeOrderStatus' => 
    array (
      9 => '9',
    ),
    'OnBeforeDocFormSave' => 
    array (
      10 => '10',
    ),
    'OnBeforeEmptyTrash' => 
    array (
      10 => '10',
    ),
    'OnBeforeWebLogin' => 
    array (
      20 => '20',
    ),
    'OnChunkFormPrerender' => 
    array (
      4 => '4',
    ),
    'OnDocFormPrerender' => 
    array (
      4 => '4',
      10 => '10',
    ),
    'OnDocFormRender' => 
    array (
      10 => '10',
    ),
    'OnFileCreateFormPrerender' => 
    array (
      4 => '4',
    ),
    'OnFileEditFormPrerender' => 
    array (
      4 => '4',
    ),
    'OnHandleRequest' => 
    array (
      13 => '13',
      9 => '9',
      7 => '7',
    ),
    'OnLoadWebDocument' => 
    array (
      7 => '7',
      18 => '18',
      9 => '9',
    ),
    'OnMODXInit' => 
    array (
      9 => '9',
    ),
    'OnPageNotFound' => 
    array (
      18 => '18',
      13 => '13',
    ),
    'OnPluginFormPrerender' => 
    array (
      4 => '4',
    ),
    'OnResourceBeforeSort' => 
    array (
      10 => '10',
    ),
    'OnResourceDuplicate' => 
    array (
      10 => '10',
    ),
    'OnRichTextEditorRegister' => 
    array (
      4 => '4',
    ),
    'OnSiteRefresh' => 
    array (
      1 => '1',
    ),
    'OnSnipFormPrerender' => 
    array (
      4 => '4',
    ),
    'OnTempFormPrerender' => 
    array (
      4 => '4',
    ),
    'OnTVInputRenderList' => 
    array (
      4 => '4',
    ),
    'OnUserRemove' => 
    array (
      19 => '19',
    ),
    'OnUserSave' => 
    array (
      9 => '9',
    ),
    'OnWebLogin' => 
    array (
      20 => '20',
    ),
    'OnWebPageInit' => 
    array (
      9 => '9',
    ),
    'OnWebPagePrerender' => 
    array (
      1 => '1',
    ),
  ),
  'pluginCache' => 
  array (
    1 => 
    array (
      'id' => 1,
      'source' => 1,
      'property_preprocess' => 0,
      'name' => 'pdoTools',
      'description' => '',
      'editor_type' => 0,
      'category' => 1,
      'cache_type' => 0,
      'plugincode' => '/** @var \\MODX\\Revolution\\modX $modx */

switch ($modx->event->name) {
    case \'OnSiteRefresh\':
        /** @var ModxPro\\PdoTools\\CoreTools $coreTools */
        if ($coreTools = $modx->services->get(\'pdotools\')) {
            if ($coreTools->clearFileCache()) {
                $modx->log(modX::LOG_LEVEL_INFO, $modx->lexicon(\'refresh_default\') . \': pdoTools\');
            }
        }
        break;
    case \'OnWebPagePrerender\':
        /** @var ModxPro\\PdoTools\\Parsing\\Parser $parser */
        $parser = $modx->getParser();
        if ($parser instanceof ModxPro\\PdoTools\\Parsing\\Parser) {
            foreach ($parser->ignores as $key => $val) {
                $modx->resource->_output = str_replace($key, $val, $modx->resource->_output);
            }
        }
        break;
}',
      'locked' => 0,
      'properties' => NULL,
      'disabled' => 0,
      'moduleguid' => '',
      'static' => 0,
      'static_file' => 'core/components/pdotools/elements/plugins/plugin.pdotools.php',
    ),
    4 => 
    array (
      'id' => 4,
      'source' => 0,
      'property_preprocess' => 0,
      'name' => 'Ace',
      'description' => 'Ace code editor plugin for MODx Revolution',
      'editor_type' => 0,
      'category' => 0,
      'cache_type' => 0,
      'plugincode' => '/**
 * Ace Source Editor Plugin
 *
 * Events: OnManagerPageBeforeRender, OnRichTextEditorRegister, OnSnipFormPrerender,
 * OnTempFormPrerender, OnChunkFormPrerender, OnPluginFormPrerender,
 * OnFileCreateFormPrerender, OnFileEditFormPrerender, OnDocFormPrerender
 *
 * @author Danil Kostin <danya.postfactum(at)gmail.com>
 *
 * @package ace
 *
 * @var array $scriptProperties
 * @var Ace $ace
 */
if ($modx->event->name == \'OnRichTextEditorRegister\') {
    $modx->event->output(\'Ace\');
    return;
}

if ($modx->getOption(\'which_element_editor\', null, \'Ace\') !== \'Ace\') {
    return;
}

$corePath = $modx->getOption(\'ace.core_path\', null, $modx->getOption(\'core_path\').\'components/ace/\');
$ace = $modx->getService(\'ace\', \'Ace\', $corePath.\'model/ace/\');
$ace->initialize();

$extensionMap = array(
    \'tpl\'   => \'text/x-smarty\',
    \'htm\'   => \'text/html\',
    \'html\'  => \'text/html\',
    \'css\'   => \'text/css\',
    \'scss\'  => \'text/x-scss\',
    \'less\'  => \'text/x-less\',
    \'svg\'   => \'image/svg+xml\',
    \'xml\'   => \'application/xml\',
    \'xsl\'   => \'application/xml\',
    \'js\'    => \'application/javascript\',
    \'json\'  => \'application/json\',
    \'php\'   => \'application/x-php\',
    \'sql\'   => \'text/x-sql\',
    \'md\'    => \'text/x-markdown\',
    \'txt\'   => \'text/plain\',
    \'twig\'  => \'text/x-twig\'
);

// Define default mime for html elements(templates, chunks and html resources)
$html_elements_mime=$modx->getOption(\'ace.html_elements_mime\',null,false);
if(!$html_elements_mime){
    // this may deprecated in future because components may set ace.html_elements_mime option now
    switch (true) {
        case $modx->getOption(\'twiggy_class\'):
            $html_elements_mime = \'text/x-twig\';
            break;
        case $modx->getOption(\'pdotools_fenom_parser\'):
            $html_elements_mime = \'text/x-smarty\';
            break;
        default:
            $html_elements_mime = \'text/html\';
    }
}

// Defines wether we should highlight modx tags
$modxTags = false;
switch ($modx->event->name) {
    case \'OnSnipFormPrerender\':
        $field = \'modx-snippet-snippet\';
        $mimeType = \'application/x-php\';
        break;
    case \'OnTempFormPrerender\':
        $field = \'modx-template-content\';
        $modxTags = true;
        $mimeType = $html_elements_mime;
        break;
    case \'OnChunkFormPrerender\':
        $field = \'modx-chunk-snippet\';
        if ($modx->controller->chunk && $modx->controller->chunk->isStatic()) {
            $extension = pathinfo($modx->controller->chunk->name, PATHINFO_EXTENSION);
            if(!$extension||!isset($extensionMap[$extension])){
                $extension = pathinfo($modx->controller->chunk->getSourceFile(), PATHINFO_EXTENSION);
            }
            $mimeType = isset($extensionMap[$extension]) ? $extensionMap[$extension] : \'text/plain\';
        } else {
            $mimeType = $html_elements_mime;
        }
        $modxTags = true;
        break;
    case \'OnPluginFormPrerender\':
        $field = \'modx-plugin-plugincode\';
        $mimeType = \'application/x-php\';
        break;
    case \'OnFileCreateFormPrerender\':
        $field = \'modx-file-content\';
        $mimeType = \'text/plain\';
        break;
    case \'OnFileEditFormPrerender\':
        $field = \'modx-file-content\';
        $extension = pathinfo($scriptProperties[\'file\'], PATHINFO_EXTENSION);
        $mimeType = isset($extensionMap[$extension])
            ? $extensionMap[$extension]
            : (\'@FILE:\'.pathinfo($scriptProperties[\'file\'], PATHINFO_BASENAME));
        $modxTags = $extension == \'tpl\';
        break;
    case \'OnDocFormPrerender\':
        if (!$modx->controller->resourceArray) {
            return;
        }
        $field = \'ta\';
        $mimeType = $modx->getObject(\'modContentType\', $modx->controller->resourceArray[\'content_type\'])->get(\'mime_type\');

        if($mimeType == \'text/html\')$mimeType = $html_elements_mime;

        if ($modx->getOption(\'use_editor\')){
            $richText = $modx->controller->resourceArray[\'richtext\'];
            $classKey = $modx->controller->resourceArray[\'class_key\'];
            if ($richText || in_array($classKey, array(\'modStaticResource\',\'modSymLink\',\'modWebLink\',\'modXMLRPCResource\'))) {
                $field = false;
            }
        }
        $modxTags = true;
        break;
    case \'OnTVInputRenderList\':
        $modx->event->output($corePath . \'elements/tv/input/\');
        break;
    default:
        return;
}

$modxTags = (int) $modxTags;
$script = \'\';
if (!empty($field)) {
    $script .= "MODx.ux.Ace.replaceComponent(\'$field\', \'$mimeType\', $modxTags);";
}

if ($modx->event->name == \'OnDocFormPrerender\' && !$modx->getOption(\'use_editor\')) {
    $script .= "MODx.ux.Ace.replaceTextAreas(Ext.query(\'.modx-richtext\'));";
}

if ($script) {
    $modx->controller->addHtml(\'<script>Ext.onReady(function() {\' . $script . \'});</script>\');
}',
      'locked' => 0,
      'properties' => NULL,
      'disabled' => 0,
      'moduleguid' => '',
      'static' => 0,
      'static_file' => 'ace/elements/plugins/ace.plugin.php',
    ),
    7 => 
    array (
      'id' => 7,
      'source' => 1,
      'property_preprocess' => 0,
      'name' => 'Dev',
      'description' => '',
      'editor_type' => 0,
      'category' => 37,
      'cache_type' => 0,
      'plugincode' => '$templateCacheable = false;

switch ($modx->event->name) {
    
    case \'OnHandleRequest\':


        break;
    
    case \'OnLoadWebDocument\':
        
        if ($baseElement = $modx->resource->getOne(\'Template\')) {
            $baseElement->setCacheable($templateCacheable);
            if ($baseElement->process()) {
                $modx->resource->_content = $baseElement->_output;
                $modx->resource->_processed = true;
            }
        }
        
        break;
    
}',
      'locked' => 0,
      'properties' => 'a:0:{}',
      'disabled' => 0,
      'moduleguid' => '',
      'static' => 1,
      'static_file' => 'core/elements/plugins/app/dev/dev.plugin.php',
    ),
    9 => 
    array (
      'id' => 9,
      'source' => 1,
      'property_preprocess' => 0,
      'name' => 'miniShop2',
      'description' => '',
      'editor_type' => 0,
      'category' => 9,
      'cache_type' => 0,
      'plugincode' => '/** @var modX $modx */
switch ($modx->event->name) {
    case \'OnMODXInit\':
        // Load extensions
        /** @var miniShop2 $miniShop2 */
        // if ($miniShop2 = $modx->getService(\'miniShop2\')) {
            // $miniShop2->loadMap();
        // }
        break;

    case \'OnHandleRequest\':
        // Handle ajax requests
        // $isAjax = !empty($_SERVER[\'HTTP_X_REQUESTED_WITH\']) && $_SERVER[\'HTTP_X_REQUESTED_WITH\'] == \'XMLHttpRequest\';
        // if (empty($_REQUEST[\'ms2_action\']) || !$isAjax) {
        //     return;
        // }
        // /** @var miniShop2 $miniShop2 */
        // if ($miniShop2 = $modx->services->get(\'minishop2\')) {
        //     $response = $miniShop2->handleRequest($_REQUEST[\'ms2_action\'], @$_POST);
        //     @session_write_close();
        //     exit($response);
        // }
        break;

    case \'OnManagerPageBeforeRender\':
        /** @var miniShop2 $miniShop2 */
        // if ($miniShop2 = $modx->services->get(\'minishop2\')) {
        //     $modx->controller->addLexiconTopic(\'minishop2:default\');
        //     $modx->regClientStartupScript($miniShop2->config[\'jsUrl\'] . \'mgr/misc/ms2.manager.js\');
        // }
        break;

    case \'OnLoadWebDocument\':
        /** @var miniShop2 $miniShop2 */
        // $miniShop2 = $modx->services->get(\'minishop2\');
        // $registerFrontend = $modx->getOption(\'ms2_register_frontend\', null, \'1\');
        // if ($miniShop2 && $registerFrontend) {
        //     // $miniShop2->registerFrontend();
        // }
        // Handle non-ajax requests
        // if (!empty($_REQUEST[\'ms2_action\'])) {
        //     if ($miniShop2) {
        //         $miniShop2->handleRequest($_REQUEST[\'ms2_action\'], @$_POST);
        //     }
        // }
        // Set product fields as [[*resource]] tags
        if ($modx->resource->get(\'class_key\') == \'msProduct\') {
            if ($dataMeta = $modx->getFieldMeta(\'msProductData\')) {
                unset($dataMeta[\'id\']);
                $modx->resource->_fieldMeta = array_merge(
                    $modx->resource->_fieldMeta,
                    $dataMeta
                );
            }
        }
        break;

    case \'OnWebPageInit\':
        // Set referrer cookie
        /** @var msCustomerProfile $profile */
        $referrerVar = $modx->getOption(\'ms2_referrer_code_var\', null, \'msfrom\', true);
        $cookieVar = $modx->getOption(\'ms2_referrer_cookie_var\', null, \'msreferrer\', true);
        $cookieTime = $modx->getOption(\'ms2_referrer_time\', null, 86400 * 365, true);

        if (!$modx->user->isAuthenticated() && !empty($_REQUEST[$referrerVar])) {
            $code = trim($_REQUEST[$referrerVar]);
            if ($profile = $modx->getObject(\'msCustomerProfile\', array(\'referrer_code\' => $code))) {
                $referrer = $profile->get(\'id\');
                setcookie($cookieVar, $referrer, time() + $cookieTime);
            }
        }
        break;

    case \'OnUserSave\':
        // Save referrer id
        /** @var string $mode */
        if ($mode == modSystemEvent::MODE_NEW) {
            /** @var modUser $user */
            $cookieVar = $modx->getOption(\'ms2_referrer_cookie_var\', null, \'msreferrer\', true);
            $cookieTime = $modx->getOption(\'ms2_referrer_time\', null, 86400 * 365, true);
            if ($modx->context->key != \'mgr\' && !empty($_COOKIE[$cookieVar])) {
                if ($profile = $modx->getObject(\'msCustomerProfile\', array(\'id\' => $user->get(\'id\')))) {
                    if (!$profile->get(\'referrer_id\') && $_COOKIE[$cookieVar] != $user->get(\'id\')) {
                        $profile->set(\'referrer_id\', (int)$_COOKIE[$cookieVar]);
                        $profile->save();
                    }
                }
                setcookie($cookieVar, \'\', time() - $cookieTime);
            }
        }
        break;

    case \'msOnChangeOrderStatus\':
        // Update customer stat
        if (empty($status) || $status != 2) {
            return;
        }

        /** @var modUser $user */
        /** @var msOrder $order */
        if ($user = $order->getOne(\'User\')) {
            $q = $modx->newQuery(\'msOrder\', array(\'type\' => 0));
            $q->innerJoin(\'modUser\', \'modUser\', array(\'modUser.id = msOrder.user_id\'));
            $q->innerJoin(\'msOrderLog\', \'msOrderLog\', array(
                \'msOrderLog.order_id = msOrder.id\',
                \'msOrderLog.action\' => \'status\',
                \'msOrderLog.entry\' => $status,
            ));
            $q->where(array(\'msOrder.user_id\' => $user->get(\'id\')));
            $q->groupby(\'msOrder.user_id\');
            $q->select(\'SUM(msOrder.cost)\');
            if ($q->prepare() && $q->stmt->execute()) {
                $spent = $q->stmt->fetchColumn();
                /** @var msCustomerProfile $profile */
                if ($profile = $modx->getObject(\'msCustomerProfile\', array(\'id\' => $user->get(\'id\')))) {
                    $profile->set(\'spent\', $spent);
                    $profile->save();
                }
            }
        }
        break;
}',
      'locked' => 0,
      'properties' => 'a:0:{}',
      'disabled' => 0,
      'moduleguid' => '',
      'static' => 0,
      'static_file' => 'core/components/minishop2/elements/plugins/plugin.minishop2.php',
    ),
    10 => 
    array (
      'id' => 10,
      'source' => 0,
      'property_preprocess' => 0,
      'name' => 'Collections',
      'description' => '',
      'editor_type' => 0,
      'category' => 10,
      'cache_type' => 0,
      'plugincode' => '/**
 * Collections
 *
 * DESCRIPTION
 *
 * This plugin inject JS to handle proper working of close buttons in Resource\'s panel (OnDocFormPrerender)
 * This plugin handles setting proper show_in_tree parameter (OnBeforeDocFormSave, OnResourceSort)
 *
 * @var \\MODX\\Revolution\\modX $modx
 * @var array $scriptProperties
 */

if (!$modx->services->has(\'collections\')) {
    return;
}

/** @var Collections\\Collections $collections */
$collections = $modx->services->get(\'collections\');
if (!($collections instanceof Collections\\Collections)) return \'\';

$className = "\\\\Collections\\\\Events\\\\{$modx->event->name}";
if (class_exists($className)) {
    /** @var \\Collections\\Events\\Event $handler */
    $handler = new $className($modx, $scriptProperties);
    $handler->run();
}

return;',
      'locked' => 0,
      'properties' => 'a:0:{}',
      'disabled' => 0,
      'moduleguid' => '',
      'static' => 0,
      'static_file' => '',
    ),
    13 => 
    array (
      'id' => 13,
      'source' => 1,
      'property_preprocess' => 0,
      'name' => 'ContextLoad',
      'description' => '',
      'editor_type' => 0,
      'category' => 35,
      'cache_type' => 0,
      'plugincode' => 'switch ($modx->event->name) {
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
}',
      'locked' => 0,
      'properties' => 'a:0:{}',
      'disabled' => 0,
      'moduleguid' => '',
      'static' => 1,
      'static_file' => 'core/elements/plugins/app/contextload.plugin.php',
    ),
    18 => 
    array (
      'id' => 18,
      'source' => 0,
      'property_preprocess' => 0,
      'name' => 'TempPages',
      'description' => '',
      'editor_type' => 0,
      'category' => 35,
      'cache_type' => 0,
      'plugincode' => 'if (!$modx->services->has(\'app\')) { return; }

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
}',
      'locked' => 0,
      'properties' => 'a:0:{}',
      'disabled' => 0,
      'moduleguid' => '',
      'static' => 0,
      'static_file' => '',
    ),
    19 => 
    array (
      'id' => 19,
      'source' => 0,
      'property_preprocess' => 0,
      'name' => 'Profile',
      'description' => '',
      'editor_type' => 0,
      'category' => 35,
      'cache_type' => 0,
      'plugincode' => 'switch ($modx->event->name) {
    case \'OnUserRemove\':
        
        removeObjects($modx, App\\Model\\Profile\\Phone::class, [\'user_id\' => $user->id]);
        removeObjects($modx, App\\Model\\Profile\\Company::class, [\'user_id\' => $user->id]);
        removeObjects($modx, App\\Model\\Profile\\Passport::class, [\'user_id\' => $user->id]);
        removeObjects($modx, modResource::class, [
            \'parent\' => $modx->getOption(\'app.profile_pages_parent\'), 
            \'template\' => $modx->getOption(\'app.profile_page_template\'),
            \'createdby\' => $user->id,
        ]);

        break;
}

function removeObjects($modx, $classKey, $where)
{
    if ($modx->newObject($classKey)) {
        $objects = $modx->getCollection($classKey, $where);
        foreach ($objects as $object) {
            $object->remove();
        }
    }
}',
      'locked' => 0,
      'properties' => 'a:0:{}',
      'disabled' => 0,
      'moduleguid' => '',
      'static' => 0,
      'static_file' => '',
    ),
    20 => 
    array (
      'id' => 20,
      'source' => 0,
      'property_preprocess' => 0,
      'name' => 'Cart',
      'description' => '',
      'editor_type' => 0,
      'category' => 35,
      'cache_type' => 0,
      'plugincode' => 'if (!$modx->services->has(\'app\')) return;
$app = $modx->services->get(\'app\');

switch ($modx->event->name) {
    case \'OnBeforeWebLogin\':
        
        $response = $app->runProcessor(\'web/cart/getList\', [
            \'all\' => true
        ])->getResponse();
        
        $modx->cartItems = $response[\'results\'];
        
        break;
        
    case \'OnWebLogin\':
        
        if ($modx->cartItems) {
            foreach ($modx->cartItems as $item) {
                $obj = $modx->newObject(\\App\\Model\\Cart\\Item::class);
                if ($obj) {
                    $obj->fromArray([
                        \'user_id\' => $user->get(\'id\'),
                        \'id\' => $item[\'id\'],
                        \'name\' => $item[\'name\'],
                        \'product_id\' => $item[\'product_id\'],
                        \'image\' => $item[\'image\'],
                        \'count\' => $item[\'count\'],
                        \'checked\' => $item[\'checked\'],
                        \'createdon\' => time(),
                    ]);
                    $obj->save();
                }
            }
        }
        
        break;
}',
      'locked' => 0,
      'properties' => 'a:0:{}',
      'disabled' => 0,
      'moduleguid' => '',
      'static' => 0,
      'static_file' => '',
    ),
  ),
  'policies' => 
  array (
    'MODX\\Revolution\\modAccessContext' => 
    array (
      'lk' => 
      array (
        0 => 
        array (
          'principal' => 1,
          'authority' => 9999,
          'policy' => 
          array (
            'load' => true,
            'list' => true,
            'view' => true,
            'save' => true,
            'remove' => true,
            'copy' => true,
            'view_unpublished' => true,
            'formit' => true,
            'formit_encryptions' => false,
          ),
        ),
        1 => 
        array (
          'principal' => 3,
          'authority' => 9999,
          'policy' => 
          array (
            'load' => true,
            'list' => true,
            'view' => true,
            'save' => true,
            'remove' => true,
            'formit' => true,
            'formit_encryptions' => false,
          ),
        ),
      ),
    ),
  ),
);