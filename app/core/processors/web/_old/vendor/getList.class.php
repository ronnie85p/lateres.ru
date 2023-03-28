<?php

use MODX\Revolution\Processors\Processor;

class mShopVendorGetList extends Processor 
{
    public function initialize()
    {
        return true;
    }

    public function process()
    {
        // return $this->test();

        $vendorList = $this->getVendorList();
        // return $this->test($vendorList);
        $vendors = [];
        foreach ($vendorList as $vendor) {
            $trademark = $this->getTrademark($vendor['resource']);
            $vendors[] = [
                'text' => $vendor['name'],
                'value' => $vendor['name'],
                'data' => [
                    'trademark' => $trademark,
                    'country' => $vendor['country']
                ]
            ];
        }

        return $this->success('', [
            'results' => $vendors
        ]);
    }

    public function test($vendorList)
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'vendorList' => $vendorList,
            'msvendor' => is_object($this->modx->newObject('msVendor'))
        ]);
    }

    public function getTrademark($vendorResource) 
    {
        if ($trademark = $this->modx->getObject('modResource', ['parent' => $vendorResource])) {
            return $trademark->pagetitle;
        }
    }

    public function getVendorList()
    {
        $q = $this->modx->newQuery('msVendor');
        $q->select($this->modx->getSelectColumns('msVendor', '', '', ['name', 'id', 'country', 'resource']));

        if (!empty($this->getProperty('query'))) {
            $q->where(['name:LIKE' => $this->getProperty('query') . '%']);
        }

        if (!empty($this->getProperty('exclude'))) {
            $q->where(['name:!=' => trim($this->getProperty('exclude'))]);
        }

        $vendors = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $vendors = $q->stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return $vendors;
    }
}

return 'mShopVendorGetList';