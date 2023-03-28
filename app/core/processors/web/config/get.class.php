<?php

namespace App\Processors\Config;
use MODX\Revolution\Processors\Processor;

class GetProcessor extends Processor
{
    public $configName;
    public $configPath;

    public function initialize() 
    {
        $this->configName = $this->getProperty('context', 
            $this->modx->getOption('app.config_name_default', null, 'web'));
        $this->configPath = MODX_BASE_PATH . $this->modx->getOption('app.config_path', null, 
            'app/core/config/');

        return parent::initialize();
    }

    public function process()
    {
        $configFile = "{$this->configPath}{$this->configName}.config.php";
        if (!file_exists($configFile)) {
            return $this->failure("Config {$this->configName} not exists");
        }

        $config = include_once $configFile;

        return $this->success('', $config);
    }
}

return GetProcessor::class;
