<?php

namespace WF\Resources\Processors\Object;

use MODX\Revolution\Processors\Resource\Update;

class UpdateProcessor extends Update
{
    public $wfTools;

    public $validator;

    public function initialize()
    {
        $this->wfTools = $this->modx->services->get('wf_tools');
        $this->validator = $this->wfTools->loadValidator();

        $primaryKey = $this->getProperty($this->primaryKeyField, false);
        if (empty($primaryKey)) {
            return $this->modx->lexicon($this->objectType . '_err_ns');
        }
        $this->object = $this->modx->getObject($this->classKey, [
            $this->primaryKeyField => $primaryKey,
            'createdby' => $this->modx->user->id
        ]);
        if (empty($this->object)) {
            return $this->modx->lexicon($this->objectType . '_err_nfs', [$this->primaryKeyField => $primaryKey]);
        }

        if ($this->checkSavePermission && $this->object instanceof \modAccessibleObject && !$this->object->checkPolicy('save')) {
            return $this->modx->lexicon('access_denied');
        }

        $properties = array_merge($this->object->toArray(), $this->getProperties());
        $this->setProperties($properties);
        return true;
    }

    /**
     * Allow for Resources to use derivative classes for their processors
     *
     * @static
     * @param modX $modx
     * @param string $className
     * @param array $properties
     * @return Processor
     */
    public static function getInstance(\modX $modx, $className, $properties = []) 
    {   
        $className = __CLASS__;

        /** @var Processor $processor */
        $processor = new $className($modx, $properties);
        return $processor;
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

return 'WF\\Resources\\Processors\\Object\\UpdateProcessor';