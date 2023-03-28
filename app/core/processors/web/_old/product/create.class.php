<?php

namespace WF\Shop\Processors\Product;

use MODX\Revolution\Processors\Resource\Create as CreateProcessor;

class Create extends CreateProcessor
{
    public $wfTools;

    public $validator;

    public function initialize()
    {
        $this->wfTools = $this->modx->services->get('wf_tools');
        $this->validator = $this->wfTools->loadValidator();

        return parent::initialize();
    }

    /**
     * Allow for Resources to use derivative classes for their processors
     *
     * @static
     * @param modX $modx
     * @param $className
     * @param array $properties
     * @return CreateProcessor
     */
    public static function getInstance(\modX $modx, $className, $properties = []): CreateProcessor
    {
        $classKey = !empty($properties['class_key']) ? $properties['class_key'] : \modDocument::class;

        if (!in_array($classKey, [\modDocument::class, \modResource::class, ''], true)) {
            $className = $classKey . 'CreateProcessor';
            if (!class_exists($className)) {
                $className = __CLASS__;
            }
        }

        return new $className($modx, $properties);
    }

    public function setFieldDefaults()
    {   
        $properties = $this->getProperties();
        $validation = $properties['validation'] ?: [];
        $introtextValidation = $validation['introtext'] ?? [];

        $properties['introtext'] = array_map(
            function ($txt) { 
                if (!empty($introtextValidation['maxLength'])) {
                    $txt = substr($txt, 0, (int)$introtextValidation['maxLength']);
                }
                return trim($txt); 
            }, 
            explode(',', $properties['introtext'])
        );

        if (!empty($introtextValidation['maxCount'])) {
            $properties['introtext'] = array_slice($properties['introtext'], 0, (int)$introtextValidation['maxCount']);
        }

        $pagetitleValidation = $validation['pagetitle'] ?? [];
        if (!empty($pagetitleValidation['maxLength'])) {
            $properties['pagetitle'] = substr($properties['pagetitle'], 0, (int)$pagetitleValidation['maxLength']);
        }

        $longtitleValidation = $validation['longtitle'] ?? [];
        if (!empty($longtitleValidation['maxLength'])) {
            $properties['longtitle'] = substr($properties['longtitle'], 0, (int)$longtitleValidation['maxLength']);
        }

        $descriptionValidation = $validation['description'] ?? [];
        if (!empty($descriptionValidation['maxLength'])) {
            $properties['description'] = substr($properties['description'], 0, (int)$descriptionValidation['maxLength']);
        }

        $contentValidation = $validation['content'] ?? [];
        if (!empty($contentValidation['maxLength'])) {
            $properties['content'] = substr($properties['content'], 0, $contentValidation['maxLength']);
        }

        $properties['content'] = preg_replace(["/\n/"], ["<br/>"], $properties['content']);
        $properties['introtext'] = implode(',', $properties['introtext']);

        $this->setProperties($properties);
        return parent::setFieldDefaults();
    }

    public function beforeSet() 
    {
        $this->cleanProperties(['pagetitle', 'longtitle', 'description', 'content']);

        $content = $this->getProperty('content', '');
        $this->stripTags('content');

        if (!$this->validate()) {
            return 'Проверьте поля';
        }

        $this->setProperty('content', $content);
        return parent::beforeSet();
    }

    public function beforeSave()
    {
        return '[beforeSave]';
        return parent::beforeSave();
    }

    public function afterSave()
    {
        return parent::afterSave();
    }

        /**
     * Cleanup the processor and return the resulting object
     *
     * @return array
     */
    public function cleanup()
    {
        $this->object->removeLock();
        $this->clearCache();

        $redirectUrl = $this->getProperty('redirectTo', null);
        if (!empty($redirectUrl)) {
            if (is_numeric($redirectUrl)) {
                $redirectUrl = $this->modx->makeUrl($redirectUrl, '', '', 'full');
            }

            $queryStr = http_build_query(['id' => $this->object->get('id'), 'status' => 'success']);
            $redirectUrl .= (strpos($redirectUrl, '?') === false ? '?' : '&') . $queryStr;
        }

        return $this->success('', ['redirect_url' => $redirectUrl]);
    }

    public function cleanProperties(array $names)
    {
        foreach ($names as $name) {
            if (isset($this->properties[$name])) {
                $this->properties[$name] = trim(preg_replace('/\s{2,}/', ' ', $this->properties[$name]));
            }
        }
    }

    public function stripTags(string $propertyName)
    {
        $value = preg_replace('/\&\w+\;/', '', strip_tags($this->getProperty($propertyName)));
        $this->setProperty($propertyName, $value);
    }

    public function checkFiles()
    {
        return true;
    }

    public function validate()
    {
        $validation = $this->properties['validation'] ?: [];
        if (!$this->validator->validate($this->properties, $validation)) {
            return false;
        }

        // if ($this->doesAlreadyExist([
        //     'parent' => $this->properties['parent'], 
        //     'pagetitle' => $this->properties['pagetitle']
        // ])) {
        //     $this->addFieldError('pagetitle', 'Такая новость уже существует.');
        //     return false;
        // }

        return true;
    }
}

return 'WF\\Shop\\Processors\\Product\\Create';