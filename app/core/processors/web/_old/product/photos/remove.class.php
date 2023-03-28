<?php

use MODX\Revolution\Processors\Processor;

class wf_ShopProductPhotosRemove extends Processor 
{
    public $ids;

    public function initialize()
    {
        $this->ids = (array) array_map('intval', explode(',', $this->getProperty('ids', '')));

        return true;
    }

    public function process()
    {
        // return $this->test();
        if (!$this->getSource()) {
            return $this->failure();
        }

        foreach ($this->ids as $id) {
            $object = $this->modx->getObject('msProductFile', [
                'id' => $id,
                'product_id' => $this->getProperty('resource'),
                'source' => $this->getProperty('source'),
                'path' => $this->getProperty('container') . '/'
            ]);

            if ($object) {
                $object->prepareSource($this->source);
                if (!$object->remove()) {
                    $this->modx->error->addField('file_err_remove', $object->get('url'));
                    continue;
                }
            }
        }

        if ($this->modx->error->hasError()) {
            return $this->failure('Ошибка при удалении файлов.');
        }
    
        // return $this->test();
        return $this->success('Файлы успешно удалены.', [
            'count' => $this->modx->getCount('msProductFile', [
                'source' => $this->getProperty('source'),
                'path' => $this->getProperty('container') . '/'
            ])
        ]);
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'ids' => $this->ids
        ]);
    }

    public function getSource()
    {
        $this->source = modMediaSource::getDefaultSource($this->modx, 
            $this->getProperty('source'), false);
        if (!$this->source) {
            return false;
        }

        $this->source->initialize();
        return $this->source;
    }
}

return 'wf_ShopProductPhotosRemove';