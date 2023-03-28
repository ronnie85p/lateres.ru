<?php

use MODX\Revolution\Processors\Resource\Update;

class mShopCategoryUpdate extends Update
{
    public $classKey = 'msCategory';
    public $languageTopics = ['resource', 'minishop2:default'];
    public $permission = 'mscategory_save';
    public $beforeSaveEvent = 'OnBeforeDocFormSave';
    public $afterSaveEvent = 'OnDocFormSave';

    public function initialize()
    {

        return true;
        $this->mTools = $this->modx->services->get('mtools');
        $this->validator = $this->mTools->loadValidator();

        $this->msCategory = $this->modx->getObject('msCategory', $this->getProperty('id'));
        if (!$this->msCategory) {
            return 'Категория не найдена.';
        }

        $this->validationFields = [
            'pagetitle' => 'required',
            'longtitle' => 'required',
            'description' => 'required',
            'introtext' => 'required',
            'content' => 'required'
        ];

        $this->fields = $_POST;

        return true;
    }

    public function beforeSave()
    {
        
        $this->prepare();

        // return $this->test();

        $prevent = $this->validate();
        if (!empty($prevent)) {
            return $prevent;
        }

        $prevent = $this->update();
        if (!empty($prevent)) {
            $prevent;
        }

        return parent::beforeSave();
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'fields' => $this->fields
        ]);
    }

    public function update()
    {
        $this->msCategory->fromArray([
            'pagetitle' => ' '
        ]);
    }

    public function prepare()
    {
        $this->fields['parent'] = (int) $this->fields['parent'] ?? $this->modx->getOption('_mshop.categories_parent', null, 103);

        foreach (['pagetitle', 'longtitle', 'description', 'introtext', 'content'] as $field) {
            if (isset($this->fields[$field])) {
                $this->fields[$field] = $this->mTools->normalizeText($this->fields[$field]);
            }
        }

    }

    public function validate()
    {
        if (!$this->validator->validate($this->fields, $this->validationFields)) {
            return 'Проверьте поля.';
        }

        if ($this->modx->getCount('msCategory', [
            'parent' => $this->fields['parent'], 
            'pagetitle' => $this->fields['pagetitle']
        ])) {
            return 'Такая категория уже существует.';
        }
    }
}

return 'mShopCategoryUpdate';