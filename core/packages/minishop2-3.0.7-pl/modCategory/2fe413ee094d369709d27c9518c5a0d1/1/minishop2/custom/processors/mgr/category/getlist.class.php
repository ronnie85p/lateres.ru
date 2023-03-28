<?php

use MODX\Revolution\Processors\Model\GetListProcessor;

class msCategoryGetListProcessor extends GetListProcessor
{
    public $classKey = 'msCategory';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'ASC';


    /**
    * @param xPDOQuery $c
    *
    * @return xPDOQuery
    */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $c->where([
            'class_key' => 'msCategory',
        ]);

        if ($query = $this->getProperty('query')) {
            $c->where(['pagetitle:LIKE' => "%$query%"]);
        }

        return $c;
    }


    /**
    * @param xPDOObject $object
    *
    * @return array
    */
    public function prepareRow(xPDOObject $object)
    {
        return $object->toArray();
    }
}

return 'msCategoryGetListProcessor';
