<?php

namespace WF\Tools\Processors\Manager\Package;

use MODX\Revolution\Processors\Processor;

class GetObjectsProcessor extends Processor
{
    public $package;
    public $packagePath;

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

        $this->packagePath = MODX_BASE_PATH . "core/components/{$this->package}/";
        if (!file_exists($this->packagePath)) {
            return "Component not found {$this->packagePath}";
        }

        return parent::initialize();
    }

    /**
     * @return array
     */
    public function process() 
    {

        // $package = 'WF\\Auth\\Model';
        // $this->modx->addPackage($package, $this->packagePath . 'src/', $this->tablePrefix, $this->namespacePrefix);

        // return $this->success('', [
        //     'packages' => $this->modx->packages,
        //     'class_map' => $this->modx->classMap,
        //     'pkg_classes' => $this->getPackageClasses($package, $this->packagePath . 'src/', $this->namespacePrefix)
        // ]);


        // return $this->test();
        $prevent = $this->getObjects();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        } 

        $pls = [
            'package' => $this->package,
            'objects' => $this->objects 
        ];

        return $this->outputChunk($this->getProperty('tplPackageObjects'), $pls);
    }

    public function getPackageClasses(string $pkg, string $path, $namespacePrefix= null)
    {
        $xpdo_meta_map = array();

        $pkgPath = str_replace(array('.', '\\'), array('/', '/'), $pkg);
        $namespacePrefixPath = !empty($namespacePrefix) ? str_replace('\\', '/', $namespacePrefix) : '';
        if (!empty($namespacePrefixPath) && strpos($pkgPath, $namespacePrefixPath) === 0) {
            $pkgPath = substr($pkgPath, strlen($namespacePrefixPath));
        }

        $mapFile = $path . $pkgPath . '/metadata.' . $this->modx->config['dbtype'] . '.php';
        if (file_exists($mapFile)) {
            include $mapFile;
            if (!empty($xpdo_meta_map)) {
                $xpdo_meta_map = $xpdo_meta_map['class_map'];
            }
        }

        return $xpdo_meta_map;
    }

    public function outputChunk(string $chunk, array $pls = [])
    {
        if (!$this->modx->services->has('pdofetch')) {
            return '';
        }

        $pdoTools = $this->modx->services->get('pdofetch');
        $output = $pdoTools->getChunk($chunk, $pls);

        return $this->success('', [
            'html' => $output
        ]);
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
            'objects' => $this->objects,
        ]);
    }

    public function getObjects()
    {

        // $metaObjects = $this->parseMetadata($this->package, $this->packagePath . 'src/');
        // if ($metaObjects === false) {
        //     return $this->modx->error->message;
        // }

        $schemaObjects = $this->parseSchema($this->package, $this->packagePath . 'model/');
        if ($schemaObjects === false) {
            return $this->modx->error->message;
        }
        
        $this->objects = array_merge($schemaObjects ?: [], $metaObjects ?: []);
        $this->addFieldError('', $this->objects);
    }
    
    public function parseMetadata($package, $path)
    {
        $xpdo_meta_map = [];

        $metadataFile = "{$path}{$package}/metadata.{$this->modx->config['dbtype']}.php";
        if (file_exists($metadataFile)) {
            if (!@include($metadataFile)) {
                $this->modx->error->message = "Could not load metadata from {$metadataFile}.";
                return false;
            }
        } else {
            // $this->modx->error->message = "Metadata is not exists {$metadataFile}.";
            return [];
        }
        
        $this->modx->addPackage($package, $path, $this->tablePrefix, $this->namespacePrefix);

        $objects = [];
        if (!empty($xpdo_meta_map)) {
            foreach ($xpdo_meta_map['class_map'] as $classes) {
                foreach ($classes as $class) {
                    $namespace = preg_replace('/\\\.+$/', '', $class);
                    $className = trim(str_replace($namespace, '', $class), '\\\\');
                    $dbClass = $namespace .'\\'. $this->modx->config['dbtype'] . '\\' . $className;

                    $metaMap = [];
                    if ($this->modx->loadClass($dbClass, $path)) {
                        $metaMap = $dbClass::$metaMap;
                    }

                    $metaMap['class'] = $className;
                    $metaMap['table_exists'] = $this->tableExists($class);
                    $objects[$class] = $metaMap;
                }
            }
        }

        return $objects;
    }

    public function parseSchema($package, $modelPath)
    {
        $schemaFile = $modelPath .'schema/'. $package .'.'. $this->modx->config['dbtype'] .'.schema.xml';

        if (file_exists($schemaFile)) {
            $schema = new \SimpleXMLElement($schemaFile, 0, true);
            if (!isset($schema)) {
                $this->modx->error->message = "Could not read schema from {$schemaFile}.";
                return false;
            }
        } else {
            $this->modx->error->message = "Schema is not exists {$schemaFile}.";
            return false;
        }
        
        $model = [];
        foreach ($schema->attributes() as $key => $value) {
            $model[$key] = (string)$value;
        }
        
        $objects = [];
        if (isset($schema->object)) {
            foreach ($schema->object as $object) {
                $map = [];
                foreach ($object->attributes() as $key => $value) {
                    $map[$key] = (string)$value;
                }
                $map = array_merge($map, [
                    'package' => $model['package'],
                    'version' => $model['version'],
                    'aggregates' => []
                ]);
                $objects[$map['package'] . '\\' . $map['class']] = $map;
            }
        }

        return $objects;
    }

    public function tableExists($className)
    {
        return is_object($this->modx->query("SELECT * FROM {$this->modx->getTableName($className)}"));
    }
}

return 'WF\\Tools\\Processors\\Manager\\Package\\GetObjectsProcessor';