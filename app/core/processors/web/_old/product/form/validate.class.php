<?php

use MODX\Revolution\Processors\Processor;

class mShopProductFormValidate extends Processor 
{

    public function initialize()
    {
        $this->mShop = $this->modx->services->get('mshop');
        $this->validator = $this->mShop->mTools->loadValidator();

        $this->fields = $_POST;

        return true;
    }

    public function process()
    {
        // return $this->test();

        if (!$this->validate()) {
            return $this->failure();
        }

        return $this->success();
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'validator' => is_object($this->validator)
        ]);
    }

    public function validate()
    {

        switch ($this->getProperty('type')) {

            case 'category':

                $validation = [
                    'category' => 'required',
                    'category_group' => 'required',
                    'vendor' => 'required',
                    'trademark' => 'required',
                    'made_in' => 'required'
                ];
                
                if (!$validity = $this->validator->validate($this->fields, $validation)) {
                    break;
                }

                if (!$this->modx->getObject('modResource', ['id' => $this->fields['category'], 'parent' => 103])) {
                    return 'Выберите категорию.';
                }

                if (!$this->modx->getObject('modResource', ['id' => $this->field['category_group'], 'parent' => $this->fields['category']])) {
                    return 'Выберите раздел категории.';
                }

                if (!$this->modx->getObject('msVendor', $this->fields['vendor'])) {
                    return 'Выберите производителя.';
                }

                break;

            case 'content':

                $validation = [
                    'pagetitle' => 'required',
                    'longtitle' => 'required',
                    'description' => 'required',
                    'content' => 'required',
                    'benefits' => 'required'
                ];

                if (!$validity = $this->validator->validate($this->fields, $validation)) {
                    break;
                }

                break;

            case 'features':

                $validation = [
                    'product_material' => 'required',
                    'product_type' => 'required',
                    'product_brand_strength' => 'required',
                    'qty_per_pallet' => 'required',
                    'color' => 'required',
                    'width' => 'required',
                    'height' => 'required',
                    'length' => 'required',
                    'unit_measure' => 'required'
                ];

                if (!$validity = $this->validator->validate($this->fields, $validation)) {
                    break;
                }

                break;

            case 'prices':

                $validation = [
                    'purchase_price' => 'required',
                    'purchase_currency' => 'required',
                    'wholesale_price' => 'required',
                    'wholesale_count' => 'required',
                    'small_wholesale_price' => 'required',
                    'small_wholesale_count' => 'required',
                ];

                if (!$validity = $this->validator->validate($this->fields, $validation)) {
                    break;
                }

                break;

        }

        return $validity;
    }
}

return 'mShopProductFormValidate';