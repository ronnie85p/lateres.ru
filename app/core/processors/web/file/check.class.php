<?php

namespace App\Processors\Web\File;
require_once __DIR__ . '/base.class.php';

class Check extends BaseProcessor
{
    public $classKey = \App\Model\Resource\File::class;
    public $path = '';
    public $data = [];
    public $count;
    public $files;

    public function initialize() 
    {
        if (empty($this->getProperty('path'))) {
            return $this->modx->lexicon('app.file_no_path');
        }

        $this->path = trim($this->getProperty('path'), '/') . '/';
        $this->data = $this->getProperty('data', []);
        $this->data = is_array($this->data) ? $this->data 
            : json_decode($this->data, true);

        if (empty($this->data)) {
            return $this->modx->lexicon('app.file_check_no_data');
        }

        $this->setProperties([
            /**@var string $allowedTypes. Ex: 'image/jpeg, image/png' */
            'allowedTypes' => $this->modx->getOption('app.file_allowed_types', 
                null, 'image/jpeg'),

            /**@var int $minSize  */
            'minSize' => $this->modx->getOption('app.file_min_size', 
                null, 0),

            /**@var int $maxSize  */
            'maxSize' => $this->modx->getOption('app.file_max_size', 
                null, 0),

            'maxCount' => $this->modx->getOption('app.file_max_count', 
                null, 0)
        ]);

        return parent::initialize();
    }

    public function process()
    {
        $this->prepareProperties();
        $this->getCount();

        if (!$this->validate()) {
            return $this->response(false);
        }

        return $this->response(false);
    }

    public function prepareProperties()
    {
        $properties = $this->getProperties();
        $properties['minSize'] = (int) $properties['minSize'];
        $properties['maxSize'] = (int) $properties['maxSize'];

        $properties['allowedTypes'] = is_array($properties['allowedTypes']) 
            ? $properties['allowedTypes'] 
            : array_map('trim', explode(',', $properties['allowedTypes']));

        $this->setProperties($properties);
    }

    public function validate() 
    {
        $validator = $this->app->getService('validator', 
            \App\Files\File\Validator::class, $this->getProperties());

        if (empty($validator)) {
            return false;
        }

        $this->files = [];
        $count = $this->count;
        foreach ($this->data as $item) {
            if (!$this->reachMaxCount($count)) {
                $validated = $validator->validateFile($item);
                if ($validated === true) {
                    $this->files[] = $item;
                } else {
                    $this->addFieldError($item, $validated);
                }
            } else {
                $this->addFieldError($item, $this->modx->lexicon('app.file_validate_err_max_count'));
            }

            $count++;
        }

        return !$this->hasErrors();
    }

    public function reachMaxCount($count)
    {
        $maxCount = (int) $this->getProperty('maxCount');
        return $maxCount > 0 && $count > $maxCount;
    }

    public function getCount() 
    {
        $this->count = $this->modx->getCount($this->classKey, ['path' => $this->path]);
    }

    public function response($success)
    {
        $errors = $this->modx->error->getErrors(true);
        $total = count($errors);

        return [
            'success' => !$total,
            'errors' => $errors,
            'total' => $total,
            'files' => $this->files,
            'count' => $this->count,
            'limit' => $this->getProperty('maxCount'),
        ];
    }
}

return Check::class;