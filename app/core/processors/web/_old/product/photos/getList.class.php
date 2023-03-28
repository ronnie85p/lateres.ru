<?php

use MODX\Revolution\Processors\Processor;
use MODX\Revolution\Sources\modMediaSource;

class wf_ShopProductPhotosGetList extends Processor 
{
    public function initialize()
    {
        return true;
    }

    public function process()
    {
        return $this->test();
        if (!$this->getSource()) {
            return $this->failure();
        }

        $q = $this->modx->newQuery('fsFile');
        $q->select($this->modx->getSelectColumns('fsFile'));
        $q->where([
            'resource_id' => $this->getProperty('resource'),
            'source_id' => $this->getProperty('source'),
            'path' => $this->getProperty('container')
        ]);

        $rows = [];
        if ($q->prepare() && $q->stmt->execute()) {
            $rows = $q->stmt->fetchAll(PDO::FETCH_ASSOC);

            foreach($rows as &$row) {
                $url = $this->source->getPropertyList()['url'];
                $row['url'] = rtrim($url, '/') . '/' . $row['url'];
            }
        }  

        // return $this->test();
        return json_decode($this->outputArray($rows));
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'object' => is_object($this->modx->newObject('fsFile'))
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

return 'wf_ShopProductPhotosGetList';