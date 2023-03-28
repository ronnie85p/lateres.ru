<?php

namespace App\Components\Extra\Processors;

use MODX\Revolution\Processors\Processor;
use MODX\Revolution\File\modFileHandler;

class CreateObjectsProcessor extends Processor
{
    /** @var string $packagePath */
    public $packagePath = 'app/core';

    /** @var string $packageName */
    public $packageName;

    public $modelPath;
    public $srcPath;

    /** @var string $namespacePrefix */
    public $namespacePrefix = 'App';

    /** @var string $tablePrefix */
    public $tablePrefix = '';

    /** @var modManager $manager */
    public $manager;

    /** @var modGenerator $generator */
    public $generator;

    /**
     * @return bool
     */
    public function initialize() 
    {
        $this->packageName = $this->getProperty('package_name');
        if (empty($this->packageName)) {
            return 'Enter package name';
        }

        $this->packageClasses = array_map('trim', $this->getProperty('package_object', []));
        if (empty($this->packageClasses) || !is_array($this->packageClasses)) {
            return 'Choose class that you want to create.';
        }

        $this->packagePath = MODX_BASE_PATH . trim($this->packagePath, '/') . '/';
        $this->modelPath = $this->packagePath . '/model/';
        $this->srcPath = $this->packagePath . '/src/';

        $this->tablePrefix = $this->modx->getOption('app.table_prefix', null, 'app_');

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
        $prevent = $this->parseSchema(
            $this->packageName, 
            $this->modelPath, 
            $this->srcPath
        );

        if ($prevent !== true) {
            return $this->failure($prevent);
        }

        // return $this->failure('We are called the test mode. The test is failure', ['classes' => $this->packageClasses]);
        // return $this->success('We are called the test mode. The test is success');

        $packageName = trim((string) $this->generator->schema['package'], '\\');
        $prevent = $this->createObjectTables(
            $packageName, 
            $this->srcPath, 
            $this->packageClasses
        );
        
        if ($prevent !== true) {
            return $this->failure($prevent);
        }

        return $this->cleanup();
    }

    public function cleanup() 
    {
        return $this->success('Object(s) will be created successfully!');
    }

    /**
     * @return array
     */
    public function test() 
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties()
        ]);
    }
    
    public function getLanguageTopics()
    {
        return [];
    }
    
    public function parseSchema(string $pkg, string $path, string $outputDir) 
    {
        $options = [
            'update' => (int)$this->getProperty('parse_update', 1),
            'compile' => (int)$this->getProperty('parse_compile', 0),
            'regenerate' => (int)$this->getProperty('parse_generate', 0),
            'namespacePrefix' => $this->namespacePrefix
        ];

        $schemaFile = trim($path, '/') . '/schema/'. $pkg .'.'. $this->modx->config['dbtype'] .'.schema.xml';
        if (file_exists($schemaFile)) {
            if (!$this->generator->parseSchema($schemaFile, $outputDir, $options)) {
                return "Error parse the schema {$schemaFile}";
            }
        } else {
            return "Schema xml is not exists {$schemaFile}.";
        }

        return true;
    }

    public function createObjectTables(string $pkg, string $path, array $classes)
    {
        $this->modx->addPackage($pkg, $path, $this->tablePrefix, $this->namespacePrefix);

        foreach ($classes as $class) {
            $className = "{$pkg}\\{$class}";
            if (!$this->manager->createObjectContainer($className)) {
                $this->addFieldError($className, "Table is not created");
            } 
        }
        
        if ($this->hasErrors()) {
            return 'Some objects are not created.';
        }

        return true;
    }
}

return CreateObjectsProcessor::class;