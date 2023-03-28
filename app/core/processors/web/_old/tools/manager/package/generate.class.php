<?php

namespace WF\Tools\Processors\Manager\Package;

use MODX\Revolution\Processors\Processor;
use MODX\Revolution\File\modFileHandler;

class GenerateProcessor extends Processor
{
    public $pdoTools;
    public $package;
    public $packageDir;
    public $updateContent;
    public $coreComponentPath;
    public $assetsComponentPath;
    public $paths;
    public $settings;
    public $fileHandler;

    /**
     * @return bool
     */
    public function initialize() 
    {
        $this->pdoTools = $this->modx->services->get('pdofetch');

        $this->package = strtolower(trim($this->getProperty('package', '')));
        if (empty($this->package)) {
            return 'Укажите пакет';
        }

        $this->packageDir = strtolower($this->package);
        $this->updateContent = (int) $this->getProperty('update_content', 0);
        $this->coreComponentPath = MODX_CORE_PATH . 'components/' . $this->packageDir . '/';
        $this->assetsComponentPath = MODX_ASSETS_PATH . 'components/' . $this->packageDir . '/';
        
        $this->paths = [
            'core' => [
                [
                    'type' => 'file',
                    'source' => 'model/schema/' . $this->packageDir . '.' . $this->modx->config['dbtype'] . '.schema.xml',
                    'content' => '<?xml version="1.0" encoding="UTF-8"?>
<model package="' . $this->package .'" baseClass="xPDO\Om\xPDOSimpleObject" platform="mysql" defaultEngine="InnoDB" phpdoc-package="' .$this->package .'" version="3.0">
</model>
                    '
                ],
                [
                    'type' => 'file',
                    'source' => 'lexicon/' . $this->modx->getOption('cultureKey') . '/default.inc.php',
                    'content' => "<?php \n\n"
                ],  
                [
                    'type' => 'dir',
                    'source' => 'src/'
                ],
                [
                    'type' => 'dir',
                    'source' => 'processors/'
                ],   
                [
                    'type' => 'file',
                    'source' => 'vendor/autoload.php',
                    'content' => "<?php \n\n"
                ],  
                [
                    'type' => 'file',
                    'source' => 'bootstrap.php',
                    'content' => "<?php \n\n"
                ] 
            ],

            'assets' => [
                [
                    'type' => 'dir',
                    'source' => 'js/'
                ],
                [
                    'type' => 'dir',
                    'source' => 'css/'
                ],
                [
                    'type' => 'file',
                    'source' => 'connector.php',
                    'content' => "<?php \n
require_once dirname(__FILE__, 4) . '/config.core.php';
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';
                    
\$modx = new modX();
\$modx->initialize('web');
\$modx->services->add('error', new MODX\Revolution\Error\modError(\$modx));
\$modx->error = \$modx->services->get('error');

                    "
                ],
                [
                    'type' => 'file',
                    'source' => 'js/default.js'
                ],
                [
                    'type' => 'file',
                    'source' => 'css/default.css'
                ]
            ],
            'elements' => [
                [
                    'type' => 'dir',
                    'source' => 'chunks/' . $this->packageDir
                ],
                [
                    'type' => 'dir',
                    'snippets' => 'snippets/' . $this->packageDir
                ],
                [
                    'type' => 'dir',
                    'source' => 'plugins/' . $this->packageDir
                ],
            ]
        ];

        $this->settings = [
            [
                'key' => $this->packageDir . '.core_path',
                'value' => $this->coreComponentPath,
                'xtype' => 'textfield',
                'namespace' => $this->packageDir    
            ],
            [
                'key' => $this->packageDir . '.assets_path',
                'value' => $this->assetsComponentPath,
                'xtype' => 'textfield',
                'namespace' => $this->packageDir    
            ],
        ];

        $this->modx->services->add('file', new modFileHandler($this->modx));
        
        return parent::initialize();
    }

    /**
     * @return array
     */
    public function process() 
    {
        // return $this->test();
        
        if (!$this->createPaths($this->coreComponentPath, $this->paths['core'])) {
            return $this->failure();
        }

        if (!$this->createPaths($this->assetsComponentPath, $this->paths['assets'])) {
            return $this->failure();
        }

        if (!$this->createPaths(MODX_CORE_PATH . 'elements/', $this->paths['elements'])) {
            return $this->failure();
        }

        // $this->createCategory();
        // $this->updateSystemSettings($this->settings);
        // $this->updateNamespace();

        return $this->test();
        return $this->success('', [
            
        ]);
    }

    /**
     * @return array
     */
    public function test() 
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'paths' => $this->paths,
            'componentPath' => $this->componentPath,
            'fileHandler' => is_object($this->fileHandler)
        ]);
    }
    
    public function getLanguageTopics()
    {
        return ['rytools.manager'];
    }

    public function createPaths($container, $paths)
    {
        $permissions = $this->modx->getOption('new_file_permissions', null, '0644');
        foreach ($paths as $path) {
            $file = $container . $path['source'];
            $dirname = $path['type'] == 'dir' ? $file : dirname($file);

            if (!empty($dirname)) {
                if (!file_exists($dirname) && !@mkdir($dirname, $permissions, true)) {
                    $this->modx->error->addField('create_error', $dirname);
                    break;
                }
            }

            if ($path['type'] == 'file') {
                if ($this->updateContent && !empty($path['content'])) {
                    $fp = @fopen($file, 'w+');
                    if ($fp) {
                        @fwrite($fp, $path['content']);
                        @fclose($fp);
                    }
                }
            }
        }

        return !$this->modx->error->hasError();
    }

    public function createCategory()
    {
        $category = $this->modx->getObject('modCategory', ['category' => $this->package]);
        if (!$category) {
            $category = $this->modx->newObject('modCategry', ['category' => $this->package]);
            return $category->save();
        }
    }

    public function updateSystemSettings($settings)
    {
        foreach ($settings as $setting) {
            $sysSetting = $this->modx->getObject('modSystemSetting', ['key' => $setting['key']]);
            if (!$sysSetting) {
                $sysSetting = $this->modx->newObject('modSystemSetting');
            }

            $sysSetting->fromArray($setting);
            $sysSetting->save();
        }
    }

    public function updateNamespace()
    {
        $namespace = $this->modx->getObject('modNamespace', ['name' => $this->packageDir]);
        if (!$namespace) {
            $namespace = $this->modx->newObject('modNamespace');
        }

        $namespace->fromArray([
            'name' => $this->packageDir,
            'path' => '{core_path}' . $this->coreComponentPath,
            'assets_path' => '{assets_path}' . $this->assetsComponentPath
        ]);
        $namespace->save();
    }
}

return 'WF\\Tools\\Processors\\Manager\\Package\\GenerateProcessor';