<?php

namespace WF\Tools\Processors\Manager\Objects;

use MODX\Revolution\Processors\Processor;

class CreateProcessor extends Processor
{

    public $manager;
    public $generator;

    public $package;
    public $packagePath;

    public $classes = [];
    public $namespacePrefix = 'WF\\';
    public $tablePrefix = 'wf_';

    /**
     * @return bool
     */
    public function initialize() 
    {
        $this->package = strtolower(trim($this->getProperty('package', '')));
        if (empty($this->package)) {
            return 'Укажите пакет';
        }
        
        $this->classes = array_map('trim', $this->getProperty('classes', []));
        if (empty($this->classes) || !is_array($this->classes)) {
            return 'Choose object that you want to create.';
        }

        $this->packagePath = MODX_BASE_PATH . "core/components/{$this->package}/";
        if (!file_exists($this->packagePath)) {
            return "Package not found {$this->packagePath}";
        }

        $this->manager = $this->modx->getManager();
        $this->generator = $this->modx->manager->getGenerator();

        return parent::initialize();
    }

    /**
     * @return array
     */
    public function process() 
    {
        // return $this->test();
        $prevent = $this->parseSchema($this->package, $this->packagePath . 'model/', $this->packagePath . 'src/');
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $package = trim((string)$this->generator->schema['package'], '\\');
        $prevent = $this->createObjectContainers($package, $this->packagePath . 'src/', $this->classes);
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        return $this->cleanup('Object(s) created successfully!');
    }

    public function cleanup(string $msg = '', $object = []) 
    {
        return $this->success($msg, $object);
    }

    public function getLanguageTopics()
    {
        return ['wf_tools.manager'];
    }

    /**
     * @return array
     */
    public function test() 
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'package' => $this->package,
            'schema' => (string)$this->generator->schema['package']
        ]);
    }

    public function parseSchema(string $package, string $path, string $outputDir) 
    {
        $options = [
            'update' => (int)$this->getProperty('parse_update', 1),
            'compile' => (int)$this->getProperty('parse_compile', 0),
            'regenerate' => (int)$this->getProperty('parse_generate', 0),
            'namespacePrefix' => $this->namespacePrefix
        ];

        $schemaFile = "{$path}schema/{$package}.{$this->modx->config['dbtype']}.schema.xml";
        if (!file_exists($schemaFile)) {
            return "Schema xml is not exists {$schemaFile}.";
        }
        
        if (!$this->generator->parseSchema($schemaFile, $outputDir, $options)) {
            return "Error parse the schema {$schemaFile}";
        }
    }

    public function createObjectContainers(string $package, string $path, array $classes)
    {
        $this->modx->addPackage($package, $path, $this->tablePrefix, $this->namespacePrefix);

        foreach ($classes as $class) {
            $className = "{$package}\\{$class}";
            if (!$this->manager->createObjectContainer($className)) {
                $this->addFieldError('table_not_created', "{$className} Could not object created");
            } 
        }
        
        if ($this->hasErrors()) {
            return 'Some objects are not created.';
        }
    }
}

return 'WF\\Tools\\Processors\\Manager\\Objects\\CreateProcessor';