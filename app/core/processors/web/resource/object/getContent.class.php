<?php

namespace WF\Resources\Processors\Object;

use MODX\Revolution\Processors\Processor;

class GetContent extends Processor 
{
    public function initialize()
    {
        if (!$this->modx->services->has('pdofetch')) {
            return false;
        }

        if (!empty($this->getProperty('params'))) {
            parse_str(str_replace('?', '', $this->getProperty('params', '')), $_GET);
        }

        return true;
    }

    public function process()
    {
        // return $this->test();
        $pdoTools = $this->modx->services->get('pdofetch');

        $uri = trim($this->getProperty('uri', ''), '/');
        $object = $this->modx->getObject(\modResource::class, [
            'uri:=' => $uri,
            'OR:uri:=' => $uri . '/'
        ]);

        if (!$object) {
            return $this->failure('Такая страница не найдена.');
        }

        $output = $object->parseContent();
        return $this->success('', [
            'output' => $output, 
            'id' => $object->get('id'),
            'pagetitle' => $object->get('pagetitle')
        ]);
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties()
        ]);
    }
}

return 'WF\\Resources\\Processors\\Object\\GetContent';