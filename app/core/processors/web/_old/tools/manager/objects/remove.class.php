<?php

namespace WF\Tools\Processors\Manager\Objects;

use MODX\Revolution\Processors\Processor;

class RemoveProcessor extends Processor
{
    public $manager;

    public $package;
    public $packageDir;

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
        
        $this->classes = $this->getProperty('classes', []);
        if (empty($this->classes) || !is_array($this->classes)) {
            return 'Choose object that you want to create.';
        }

        $this->packagePath = MODX_BASE_PATH . "core/components/{$this->package}/";
        if (!file_exists($this->packagePath)) {
            return "Package not found {$this->packagePath}";
        }

        $this->manager = $this->modx->getManager();
        
        return parent::initialize();
    }

    /**
     * @return array
     */
    public function process() 
    {
        // return $this->test();
        $prevent = $this->removeObjects($this->package, $this->packagePath . 'src/', $this->classes);
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        return $this->cleanup('Objects removed successfully!');
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
            'classes' => $this->classes
        ]);
    }

    public function removeObjects(string $package, string $path, array $classes)
    {
        $this->modx->addPackage($package, $path, $this->tablePrefix, $this->namespacePrefix);

        foreach ($classes as $class) {
            $className = "{$package}\\{$class}";
            if ($this->manager->removeObjectContainer($className)) {
                // $dbClassFile = $packagePath . $this->modx->config['dbtype'] . '/' . $class . '.php';
                // $this->modx->error->addField('classFile', $classFile);
                // if (file_exists($dbClassFile)) {
                //     unlink($dbClassFile);
                // }
                // $classFile = $packagePath . $class . '.php';
                // if (file_exists($classFile)) {
                //     unlink($classFile);
                // }
            } else {
                $this->addFieldError('table_not_removed', "Could not object {$className} removed");
            }
        }
        
        if ($this->hasErrors()) {
            return 'Some objects are not removed.';
        }
    }
}

return 'WF\\Tools\\Processors\\Manager\\Objects\\RemoveProcessor';