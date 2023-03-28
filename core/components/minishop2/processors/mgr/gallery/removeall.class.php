<?php

require_once 'removecatalogs.class.php';

use MODX\Revolution\Processors\ModelProcessor;

class msProductFileRemoveAllProcessor extends ModelProcessor
{
    public $classKey = 'msProductFile';
    public $languageTopics = ['minishop2:default'];
    public $permission = 'msproductfile_save';

    /**
    * @return bool|null|string
    */
    public function initialize()
    {
        if (!$this->modx->hasPermission($this->permission)) {
            return $this->modx->lexicon('access_denied');
        }

        return parent::initialize();
    }

    /**
    * @return array|string
    */
    public function process()
    {
        $product_id = (int)$this->getProperty('product_id');
        if (empty($product_id)) {
            return $this->failure($this->modx->lexicon('ms2_gallery_err_ns'));
        }

        /** @var msProductFile $file */
        foreach ($this->modx->getCollection('msProductFile', ['product_id' => $product_id, 'parent' => 0]) as $file) {
            $file->remove();
        }

        /** @var msProductData $product */
        if ($product = $this->modx->getObject('msProductData', ['id' => $product_id])) {
            $thumb = $product->updateProductImage();
            /** @var miniShop2 $miniShop2 */
            if (empty($thumb) && $miniShop2 = $this->modx->services->get('minishop2')) {
                $thumb = $miniShop2->config['defaultThumb'];
            }
            return $this->success('', ['thumb' => $thumb]);
        }

        if (empty($product->getMany('Files'))) {
            RemoveCatalogs::process($this->modx, $product_id);
        }

        return $this->success();
    }
}

return 'msProductFileRemoveAllProcessor';
