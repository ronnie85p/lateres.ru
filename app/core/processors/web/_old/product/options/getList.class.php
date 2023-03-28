<?php

use MODX\Revolution\Processors\Processor;

class mShopProductOptionsGetList extends Processor 
{
    public function initialize()
    {
        return true;
    }

    public function process()
    {
        // return $this->test();

        $optionList = $this->getOptionList();

        // return $this->test($optionList);
        $options = [];
        foreach ($optionList as $option) {
            $options[] = [
                'text' => $option['pagetitle'],
                'value' => $option['pagetitle']
            ];
        }

        return $this->success('', [
            'results' => $options
        ]);
    }

    public function test($optionList)
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'optionList' => $optionList
        ]);
    }

    public function getOptionList()
    {
        $q = $this->modx->newQuery('modResource');
        $q->select($this->modx->getSelectColumns('modResource', '', '', ['id']));
        $q->where([
            'uri' => 'product-options/properties/' . str_replace('_', '-', $this->getProperty('name')) . '/'
        ]);

        $options = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $parent = $q->stmt->fetch(PDO::FETCH_ASSOC);

            $q = $this->modx->newQuery('modResource');
            $q->select($this->modx->getSelectColumns('modResource', '', '', ['pagetitle', 'id']));
            $q->where(['parent' => $parent['id']]);

            if ($q->prepare() && $q->stmt->execute()) {
                $options = $q->stmt->fetchAll(PDO::FETCH_ASSOC);
            }

        }

        return $options;
    }

    public function getOptionList2()
    {
        $q = $this->modx->newQuery('modTemplateVarResource');
        $q->select([
            'modTemplateVarResource' => '*', //$this->modx->getSelectColumns('modTemplateResource', '', '', ['value']),
            'TemplateVar' => '*' //$this->modx->getSelectColumns('modTemplateVar', '', '', ['name']),
        ]);

        $q->innerJoin(
            'modTemplateVar', 
            'TemplateVar', 
            '`modTemplateVarResource`.`tmplvarid` = `TemplateVar`.`id`'
        );

        $q->where([
            'TemplateVar.name' => trim($this->getProperty('name'))
        ]);

        // if (!empty($this->getProperty('query'))) {
        //     $q->where(['value:LIKE' => $this->getProperty('query') . '%']);
        // }

        // if (!empty($this->getProperty('exclude'))) {
        //     $q->where(['TemplateVar.name:!=' => trim($this->getProperty('exclude'))]);
        // }

        $options = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $options = $q->stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        return $options;
    }
}

return 'mShopProductOptionsGetList';