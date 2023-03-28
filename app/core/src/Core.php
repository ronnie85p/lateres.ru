<?php

namespace App;

use MODX\Revolution\modX;
use MODX\Revolution\modLexicon;
use MODX\Revolution\Error\modError;
use MODX\Revolution\Mail\modMail;
use MODX\Revolution\Mail\modPHPMailer;

class Core {

    /** @var modX $modx */
    public $modx;

    /** @var pdoFetch $pdoTools */
    public $pdoTools;

    /** @var array $config */
    public $config = [];

    function __construct(modX & $modx, array $config = [])
    {
        $basePath = $modx->getOption('app.base_path');
        $corePath = $modx->getOption('app.core_path');
        $assetsPath = $modx->getOption('app.assets_path');

        $this->modx =& $modx;
        $this->config = array_merge([
            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'processorsPath' => $corePath . 'processors/',
            'assetsUrl' => $assetsPath,
            'cssUrl' => $assetsPath . 'css/',
            'jsUrl' => $assetsPath . 'js/'
        ], $config);
        
        if (!$this->modx->services->has('error')) {
            $this->modx->services->add('error', new modError($modx));
        }

        if (!$this->modx->services->has('lexicon')) {
            $this->modx->services->add('lexicon', new modLexicon($modx));
        }

        if (!$this->modx->services->has('mailer')) {
            $this->modx->services->add('mailer', new modPHPMailer($modx));
        }

        if ($this->modx->services->has('pdotools')) {
            $this->pdoTools = $this->modx->services->get('pdotools');
        }
    }

    public function setConfig(array $config)
    {
        $this->config = array_merge($this->config, $config);
    }

    public function getCache(string $key)
    {
        $pathinfo = pathinfo($key);

        $options = [
            \xPDO::OPT_CACHE_KEY => $pathinfo['dirname']
        ];

        return $this->modx->cacheManager->get($pathinfo['basename'], $options); 
    }

    public function setCache(string $key, $data, $lifetime = 0)
    {
        $pathinfo = pathinfo($key);

        $options = [
            \xPDO::OPT_CACHE_KEY => $pathinfo['dirname']
        ];

        return $this->modx->cacheManager->set($pathinfo['basename'], $data, $lifetime, $options);    
    }

    public function deleteCache(string $key)
    {
        $pathinfo = pathinfo($key);

        $options = [
            \xPDO::OPT_CACHE_KEY => $pathinfo['dirname']
        ];

        return $this->modx->cacheManager->delete($pathinfo['basename'], $options);    
    }

    public function saveTempPage($data, string $path, int $lifetime = 0)
    {
        if (!is_array($data)) {
            if (!($data instanceof \modResource)) {
                if (!$data = $this->modx->getObject(\modResource::class, $data)) {
                    return false;
                }
            }

            $data = $this->toArray($data, true, 'properties');
        }

        return $this->setCache("app/pages/$path", $data, $lifetime);
    }

    public function deleteTempPage(string $path)
    {
        return $this->deleteCache("app/pages/$path");
    }

    public function getTempPage(string $path)
    {
        return $this->getCache("app/pages/$path");
    }

    public function loadClass(string $className)
    {
        $path = $this->modx->getOption('app.core_path') . 'src/' . 
            preg_replace(['/App\\\/', '/\\\/'], ['', '/'], $className);
    
        if (!class_exists($className)) {
            if (!require_once $path . '.php') {
                $this->modx->log(modX::LOG_LEVEL_ERROR, "Class {$className} could not load from {$path}");
                return false;
            }
        }
    
        return $className;
    }

    public function getService(string $name, string $className, array $config = [])
    {
        if (empty($this->$name)) {
            if ($className = $this->loadClass($className)) {
                $config = array_merge($this->config, $config);
                $this->$name = new $className($this->modx, $config);
            }
        }

        return $this->$name;
    }

    public function getValidator(array $config = [])
    {
        return $this->getService('validator', Validator::class, $config);
    }

    public function getFormater(array $config = [])
    {
        return $this->getService('formater', Formater::class, $config);
    }

    public function getClient(array $config = [])
    {
        return $this->getService('client', Client::class, $config);
    }

    public function runProcessor(string $action, array $data = [])
    {
        $response = $this->modx->runProcessor($action, $data, [
            'processors_path' => $this->config['processorsPath']
        ]);

        return $response;
    }

    public function runController(string $action, array $data = []) 
    {
        $response = $this->modx->runProcessor($action, $data, [
            'processors_path' => MODX_BASE_PATH . $this->config['corePath'] . 'controllers/'
        ]);

        return $response;
    }

    public function formatPrint($data)
    {
        $data = is_array($data) ? 
            print_r($data, true) : $data;

        echo "<pre>{$data}</pre>";
    }

    // public function getCache(string $name = 'cache')
    // {
    //     return $this->getService($name, 'App\\Cache');
    // }

    public function saveScriptProperties(string $key, array $scriptProperties, &$hash = null)
    {
        $hash = md5(json_encode($scriptProperties));
        if (empty($_SESSION['app.script_properties'][$key])) {
            $_SESSION['app.script_properties'][$key] = [];
        }

        $_SESSION['app.script_properties'][$key][$hash] = $scriptProperties;
    }
    
    public function getScriptProperties(string $key, string $hash)
    {
        if (!empty($_SESSION['app.script_properties'][$key]) && !empty($_SESSION['app.script_properties'][$key][$hash])) {
            return $_SESSION['app.script_properties'][$key][$hash];
        }

        return [];
    }

    public function parseContent(string &$content, array $pls = [])
    {
        $this->modx->toPlaceholders(array_merge($this->modx->config, $pls));

        $this->modx->getParser()->processElementTags('', $content, true, false, '[[', ']]', [], 10);
        $this->modx->getParser()->processElementTags('', $content, true, true, '[[', ']]', [], 10);
    }

    public function toArray($object, $processTvs = false, string $mergeWith='')
    {
        if (is_object($object)) {
            $array = $object->toArray();
            
            if (!empty($mergeWith) && is_array($array[$mergeWith])) {
                $array = array_merge($array, $array[$mergeWith]);

                unset($array[$mergeWith]);
            }

            if ($processTvs === true) {
                foreach ($object->getMany('TemplateVars') as $tv) {
                    $array[$tv->get('name')] = $tv->get('value');
                }
            }

            return $array;
        }

        return [];
    }

    public function getChunk(string $chunk, array $pls=[], array $options=[])
    {
        if (strpos($chunk, '@FILE') !== false) {
            $file = preg_replace('/(@FILE|\s+)', '', $chunk);
            if (!file_exists($this->modx->getOption('pdotools_elements_path') . $file)) {
                return 'Not found.';
            } 
        }
        
        $output = $this->pdoTools->getChunk($chunk, $pls);
        if ($options['debug'] !== true && strpos($output, 'Array') === 0) {
            $output = '';
        }
            
        return $output;
    }

    public function isAjax()
    {
        return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
            strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
    }

    public function isClientApiRequest() 
    {
        return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
            strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest' ||
            !empty($_SERVER['HTTP_SEC_FETCH_DEST']) && $_SERVER['HTTP_SEC_FETCH_DEST'] == 'empty';
    }

    public function getUserInfo()
    {
        $isAuth = $this->modx->user->isAuthenticated('web');
        $userInfo = [
            'isAuth' => $isAuth,
        ];

        if ($isAuth) {
            $userInfo = array_merge($userInfo, 
                $this->modx->user->toArray(), 
                $this->modx->user->Profile->toArray()
            );

            $userInfo['settings'] = $this->modx->user->getSettings();
            
            if (!empty($userInfo['photo'])) {
                $userInfo['photo'] = $this->modx->getOption('site_url') . $userInfo['photo'];
            }

            unset($userInfo['password'], $userInfo['hash_class'], $userInfo['class_key']);
        }

        return $userInfo;
    }

    public function getSystemConfig(string $namespace)
    {
        return empty($namespace) 
            ? $this->modx->config 
            : array_filter($this->modx->config, function ($k) use ($namespace) {
                return strpos($k, $namespace) === 0;
            }, \ARRAY_FILTER_USE_KEY);
    }

    public function getLanguageLexicons($language, $namespace)
    {
        $topicList = $this->modx->lexicon->getTopicList($language, $namespace);
        foreach ($topicList as $topic) {
            $this->modx->lexicon->load($namespace . ':' . $topic);
        }
        
        return $this->modx->lexicon->fetch($namespace . '.', false);
    }

    public function formatNumber($number, $options = [])
    {
        $options = is_array($options) ? $options : json_decode($options, true);
        $decimals = $options[0] ?? 0;
        $decimalSeparator = $options[1] ?? '.';
        $thousandsSeparator = $options[2] ?? ',';

        return number_format((float)$number, $decimals, $decimalSeparator, $thousandsSeparator);
    }

    public function formatPrice($number, $useCurrency = false)
    {
        $formatted = $this->formatNumber($number, $this->modx->getOption('app.price_format'));

        if (!empty($this->modx->getOption('app.price_format_no_zeros'))) {
            $formatted = rtrim(rtrim($formatted, '0'), '.');
        }

        if ($useCurrency) {
            $currency = html_entity_decode($this->modx->getOption('app.currency_html_code'));
            $formatted .= ' ' . $currency;
        }

        return $formatted;
    }

    public function formatWeight($number, $useUnit = false)
    {
        $formatted = $this->formatNumber($number, $this->modx->getOption('app.weight_format'));

        if (!empty($this->modx->getOption('app.weight_format_no_zeros'))) {
            $formatted = rtrim(rtrim($formatted, '0'), '.');
        }

        if ($useUnit) {
            $unit = $this->modx->getOption('app.weight_unit');
            $formatted .= ' ' . $unit;
        }

        return $formatted;
    }

    /**
    * @param string|array $addresses
    * @param $options['attach']
    * 1. ['name' => 'file', 'src' => 'path/file']
    * 2. 'path/file'
    * 3. [['name' => 'file', 'src' => 'path/file'], ['name' => 'file2', 'src' => 'path/file2']]
    * 4. ['path/file', 'path/file']
    * 5. [['path/file', 'file'], ['path/file2', 'file2']]
    * 
    * @param $options['parseChunk']
    * if true $message will be parse to chunk
    * 
    * @usage mail.modPHPMailer, pdoTools
    * @return boolean
    */
    public function sendEmail($addrs, array $options = []) 
    {
        $mailer = $this->modx->services->get('mailer');
        
        $addrs = !is_array($addrs) ? [$addrs] : $addrs;
            
        $attach = $options['attach'] ?? [];
        $subject = $options['subject'] ?? '';
        $message = $options['message'] ?? ''; 
        
        if (strpos(trim($message),'@') === 0) {
            $message = $this->pdoTools->getChunk($message, $options);
        }
        
        $mailer->set(modMail::MAIL_FROM, $this->modx->getOption('from', $options, $this->modx->getOption('emailsender')));
        $mailer->set(modMail::MAIL_FROM_NAME, $this->modx->getOption('from_name', $options, $this->modx->getOption('site_name')));
        $mailer->set(modMail::MAIL_SENDER, $this->modx->getOption('sender', $options, $this->modx->getOption('emailsender')));
        $mailer->set(modMail::MAIL_SUBJECT, $subject);
        $mailer->set(modMail::MAIL_BODY, $message);
        $mailer->setHTML(true);

        $mailer->address('reply-to', $this->modx->getOption('sender', $options, $this->modx->getOption('emailsender')));
        
        foreach ($addrs as $addr) {
            $mailer->address('to', $addr);
        }

        if (!empty($attach)) {

            if (is_array($attach) && is_assoc_array($attach) || !is_array($attach)) {
                $attach = [$attach];
            }

            foreach ($attach as $att) {
                if (is_array($att)) {
                    if (is_assoc_array($att)) {
                        $src = $att['src'] ?? '';
                        $name = $att['name'] ?? '';
                    } else {
                        $src = $att[0] ?? '';
                        $name = $att[1] ?? '';
                    }
                } else {
                    $src = $att;
                    $name = '';
                }

                $mailer->attach($src, $name);
            }

        }
        
        if (!$sent = $mailer->send()) {
            $errInfo = ['addresses' => $addrs, 'attributes' => $mailer->attributes];

            $this->modx->log(
                modX::LOG_LEVEL_ERROR, 
                "[mailer] An error has occurred: \n". print_r($errInfo, true)
            );
        }
            
        $mailer->reset();
            
        return $sent;
    }

      /**
    * @usage PDFResource
    * @return boolean
    */
    public function makePDF(array $params=[]) 
    {
        // https://mpdf.github.io/

        if (!class_exists(\Mpdf\Mpdf::class)) {
            $this->modx->log(xPDO::LOG_LEVEL_ERROR, 'Class Mpdf not exists');
            return false;
        }

        $params = array_merge([

        ], $params);

        $mpdf = new \Mpdf\Mpdf($params);


        return 'mdf initi';
            
        if (empty($params['out'])) {
            if ((bool)$_REQUEST['download'] === true) {
                $params['out'] = 'D';
            }      
        }
        
        if (!empty($params['margin'])) {
            
        $margin = $params['margin'];
        if (is_string($margin)) {
            $margin = explode(' ', preg_replace('/(px)/mui', '', $margin));
        } else if (is_numeric($margin)) {
            $margin[0] = $margin;
        }
            
        switch (count($margin)) {
                
            case 1:
                
            $params['mgt'] = intval(trim($margin[0]));
            $params['mgr'] = intval(trim($margin[0]));
            $params['mgb'] = intval(trim($margin[0]));
            $params['mgl'] = intval(trim($margin[0]));
                
            break;
                
            case 2:
                
            $params['mgt'] = intval(trim($margin[0]));
            $params['mgb'] = intval(trim($margin[0]));
            $params['mgl'] = intval(trim($margin[1]));
            $params['mgr'] = intval(trim($margin[1]));
                
            break;
                
            default:
                
            $params['mgt'] = intval(trim($margin[0]));
            $params['mgr'] = intval(trim($margin[1]));
            $params['mgb'] = intval(trim($margin[2]));
            $params['mgl'] = intval(trim($margin[3]));
                    
        }
            
        }
        
        $params = array_merge([
        'mode' => $this->modx->getOption('helper_pdf_mode', $params, 'utf-8'),
        'format' => $this->modx->getOption('helper_pdf_format', $params, 'A4'),
        'defaultFontSize' => intval($this->modx->getOption('pdfresource.defaultFontSize', $params, 8)),
        'defaultFont' => $this->modx->getOption('pdfresource.defaultFont', $params, ''),
        'mgl' => intval($this->modx->getOption('pdfresource.mgl', $params, 10)),    // margin left
        'mgr' => intval($this->modx->getOption('pdfresource.mgr', $params, 10)),    // margin right
        'mgt' => intval($this->modx->getOption('pdfresource.mgt', $params, 7)),     // margin top
        'mgb' => intval($this->modx->getOption('pdfresource.mgb', $params, 7)),     // margin bottom
        'mgh' => intval($this->modx->getOption('pdfresource.mgr', $params, 10)),    // margin header
        'mgf' => intval($this->modx->getOption('pdfresource.mgf', $params, 10)),    // margin footer
        'orientation' => $this->modx->getOption('pdfresource.orientation', $params, 'P'),   // ориентация PDF
        'customFonts' => $this->modx->getOption('pdfresource.customFonts', $params, '[]'),
        'title'   => $this->modx->getOption('site_url', [], ''),
        'author'  => $this->modx->getOption('site_name', [], ''),
        'creator' => $this->modx->getOption('site_name', [], ''),
        'out'     => $this->modx->getOption('pdfresource.out', $params, 'I'),
        'outFile'    => $this->modx->getOption('pdfresource.outFile', $params, ''),
        'cssTpl' => $this->modx->getOption('pdfresource.cssTpl', $params, ''),
        'pdfTpl' => $this->modx->getOption('pdfresource.pdfTpl', $params, ''),
        'headerTpl' => $this->modx->getOption('pdfresource.headerTpl', $params, ''),
        'footerTpl' => $this->modx->getOption('pdfresource.footerTpl', $params, ''),
        'properties' => []
        ], $params);
        
        if (strtoupper($params['out']) === 'F' && !empty($params['outFile'])) {
        @mkdir(dirname($params['outFile']), 0777, true);
        }
            
        $this->modx->pdfresource->initPDF($params);
            
        $this->modx->pdfresource->pdf->SetTitle($params['title']);
        $this->modx->pdfresource->pdf->SetAuthor($params['author']);
        $this->modx->pdfresource->pdf->SetCreator($params['creator']);
            
        if (!empty($params['properties']) && is_array($params['properties'])) {
        foreach ($params['properties'] as $prop => $value) {
            $this->modx->pdfresource->pdf->$prop = $value;
        }
        }
        
        if (!empty($params['cssTpl'])) {
        $this->modx->pdfresource->pdf->WriteHTML($this->pdoTools->getChunk($params['cssTpl'], $params), 1);
        }
        
        if (!empty($params['pdfTpl'])) {
        $this->modx->pdfresource->pdf->WriteHTML($this->pdoTools->getChunk($params['pdfTpl'], $params), 2);
        }
        
        if (!empty($params['headerTpl'])) {
        $this->modx->pdfresource->pdf->SetHeader($this->pdoTools->getChunk($params['headerTpl'], $params));
        }
            
        if (!empty($params['footerTpl'])) {
        $this->modx->pdfresource->pdf->SetFooter($this->pdoTools->getChunk($params['footerTpl'], $params));
        }
        
        try {
        return $this->modx->pdfresource->pdf->Output($params['outFile'], $params['out']);
        } catch (Exception $e) {
        $this->modx->log(modX::LOG_LEVEL_ERROR, "[" . __CLASS__ . "][" . __LINE__ . "] " . __FUNCTION__ . ": " . $e->getMessage());
        return false;
        }
            
        return true;
            
    } 

    public function success($msg="", $data=[])
    {
        return $this->modx->error->success($msg, $data);
    }
    
    public function failure($msg="", $data=[])
    {
        return $this->modx->error->failure($msg, $data);
    }

    public function addFieldError($id, $msg='')
    {
        $this->modx->error->addField($id, $msg);
    }

    public function hasErrors()
    {
        return $this->modx->error->hasError();
    }
}