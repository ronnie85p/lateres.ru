<?php

use MODX\Revolution\Processors\Model\GetListProcessor;

class msChunkGetListProcessor extends GetListProcessor
{
    public $classKey = 'modChunk';
    public $languageTopics = ['chunk'];
    public $defaultSortField = 'name';

    /**
    * @param xPDOQuery $c
    *
    * @return xPDOQuery
    */
    public function prepareQueryBeforeCount(xPDO\Om\xPDOQuery $c)
    {
        $categories = $this->modx->getOption('ms2_chunks_categories');
        if (!empty($categories)) {
            $c->where([
                'category:IN' => explode(',', $categories)
            ]);
        }
        if ($id = (int)$this->getProperty('id')) {
            $c->where(['id' => $id]);
        }
        if ($query = trim($this->getProperty('query'))) {
            $c->where([
                'name:LIKE' => "%{$query}%",
                'OR:description:LIKE' => "%{$query}%",
            ]);
        }

        return $c;
    }

    /**
    * @param xPDOObject $object
    *
    * @return array
    */
    public function prepareRow(xPDO\Om\xPDOObject $object)
    {
        $array = $object->toArray();

        if (!empty($array['description'])) {
            $array['name'] = $array['description'];
        }

        return $array;
    }
}

return 'msChunkGetListProcessor';
