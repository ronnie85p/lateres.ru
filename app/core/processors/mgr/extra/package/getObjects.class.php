<?php

namespace App\Components\Extra\Processors\Package;

use MODX\Revolution\Processors\Processor;

class GetObjectsProcessor extends Processor
{
    /** @var string $packagePath */
    public $packagePath = 'app/core';

    /** @var string $packageName */
    public $packageName;

    /** @var int $parseSchema */
    public $parseSchema;

    public $schema;

    /**
     * @return bool
     */
    public function initialize() 
    {
        $this->packageName = $this->getProperty('package_name');
        if (empty($this->packageName)) {
            return 'Enter package name';
        }

        $this->packagePath = MODX_BASE_PATH . trim($this->packagePath, '/') . '/';
        // $this->packageName = $this->getProperty('pkg_name', basename($this->packagePath));
        $this->parseSchema = (int) $this->getProperty('parse_schema', 1);

        return parent::initialize();
    }

    /**
     * @return array
     */
    public function process() 
    {
        if ($this->parseSchema) {
            $prevent = $this->parseSchema(
                $this->packageName, 
                $this->packagePath . 'model/', 
                $schemaModel
            );

            if ($prevent !== true) {
                return $this->failure($prevent);
            }

            // $this->packageName = $schemaModel['package'];
        }

        return $this->cleanup($schemaModel);
    }

    public function cleanup($model)
    {
        return $this->success('', [
            'model' => $model,
            'package_name' => $this->packageName
        ]);
    }

    public function getLanguageTopics()
    {
        return [];
    }

    /**
     * @return array
     */
    public function test() 
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'packagePath' => $this->packagePath,
            'packageName' => $this->packageName
        ]);
    }

    public function parseMetaData(string $pkg, string $path, &$model = [])
    {
        $xpdo_meta_map = [];

        $metadataFile = trim($path, '/') .'/'. $pkg . '/metadata.'. $this->modx->config['dbtype'] . '.php';
        if (file_exists($metadataFile)) {
            if (!@include($metadataFile)) {
                return "Could not load metadata from {$metadataFile}.";
            }
        } else {
            return "Metadata is not exists {$metadataFile}.";
        }

        if (empty($xpdo_meta_map)) {
            return "Metadata is empty {$metadataFile}";
        }

        $model = $xpdo_meta_map;
        // $this->modx->addPackage($pkg, $path, $tablePrefix, $namespacePrefix);

        return true;
        $objects = [];
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

        return true;
        $pkgPath = str_replace(array('.', '\\'), array('/', '/'), $pkg);
        $namespacePrefixPath = !empty($namespacePrefix) ? str_replace('\\', '/', $namespacePrefix) : '';
        if (!empty($namespacePrefixPath) && strpos($pkgPath, $namespacePrefixPath) === 0) {
            $pkgPath = substr($pkgPath, strlen($namespacePrefixPath));
        }
    }

    public function parseSchema(string $pkg, string $path, &$model = [])
    {
        $schemaFile = trim($path, '/') . '/schema/'. $pkg .'.'. $this->modx->config['dbtype'] .'.schema.xml';

        if (file_exists($schemaFile)) {
            $schema = new \SimpleXMLElement($schemaFile, 0, true);
            if (!isset($schema)) {
                return "Could not read schema from {$schemaFile}.";
            }
        } else {
            return "Schema is not exists {$schemaFile}.";
        }
        
        $model = [];
        foreach ($schema->attributes() as $key => $value) {
            $model[$key] = (string)$value;
        }
        
        $model['objects'] = [];
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

                $model['objects'][$map['package'] . '\\' . $map['class']] = $map;
            }
        }

        return true;
    }

    // public function getPackageClasses(string $pkg, string $path, $namespacePrefix= null)
    // {
    //     $xpdo_meta_map = array();

    //     $pkgPath = str_replace(array('.', '\\'), array('/', '/'), $pkg);
    //     $namespacePrefixPath = !empty($namespacePrefix) ? str_replace('\\', '/', $namespacePrefix) : '';
    //     if (!empty($namespacePrefixPath) && strpos($pkgPath, $namespacePrefixPath) === 0) {
    //         $pkgPath = substr($pkgPath, strlen($namespacePrefixPath));
    //     }

    //     $mapFile = $path . $pkgPath . '/metadata.' . $this->modx->config['dbtype'] . '.php';
    //     if (file_exists($mapFile)) {
    //         include $mapFile;
    //         if (!empty($xpdo_meta_map)) {
    //             $xpdo_meta_map = $xpdo_meta_map['class_map'];
    //         }
    //     }

    //     return $xpdo_meta_map;
    // }
}

return GetObjectsProcessor::class;