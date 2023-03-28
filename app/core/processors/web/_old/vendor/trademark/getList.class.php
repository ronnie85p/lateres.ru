<?php

use MODX\Revolution\Processors\Processor;

class mShopVendorTrademarkGetList extends Processor 
{
    public function initialize()
    {
        return true;
    }

    public function process()
    {
        // return $this->test();

        $prevent = $this->getVendor();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $trademarkList = $this->getTrademarkList();
        // return $this->test($trademarkList);
        $trademarks = [];
        foreach ($trademarkList as $trademark) {
            $trademarks[] = [
                'text' => $trademark['pagetitle'],
                'value' => $trademark['pagetitle']
            ];
        }

        return $this->success('', [
            'results' => $trademarks
        ]);
    }

    public function test($trademarkList)
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'trademarkList' => $trademarkList,
            'vendor.resource' => $this->vendor->resource
        ]);
    }

    public function getVendor() 
    {
        $this->vendor = $this->modx->getObject('msVendor', ['name' => trim($this->getProperty('vendor'))]);
        if (!$this->vendor) {
            return 'Производитель не найден.';
        }
    }

    public function getTrademarkList()
    {
        $q = $this->modx->newQuery('modResource');
        $q->select($this->modx->getSelectColumns('modResource', '', '', ['pagetitle', 'id']));

        $q->where(['parent' => $this->vendor->resource]);

        if (!empty($this->getProperty('query'))) {
            $q->where(['name:LIKE' => $this->getProperty('query') . '%']);
        }

        if (!empty($this->getProperty('exclude'))) {
            $q->where(['name:!=' => trim($this->getProperty('exclude'))]);
        }

        $trademarks = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $trademarks = $q->stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return $trademarks;
    }
}

return 'mShopVendorTrademarkGetList';