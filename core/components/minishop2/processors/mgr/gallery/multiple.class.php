<?php

use MODX\Revolution\Processors\Processor;

class msProductFileMultipleProcessor extends Processor
{
    /**
    * @return array|string
    */
    public function process()
    {
        if (!$method = $this->getProperty('method', false)) {
            return $this->failure();
        }
        $ids = json_decode($this->getProperty('ids'), true);
        if (empty($ids)) {
            return $this->success();
        }

        /** @var miniShop2 $miniShop2 */
        $miniShop2 = $this->modx->services->get('minishop2');

        foreach ($ids as $id) {
            /** @var modProcessorResponse $response */
            $response = $miniShop2->runProcessor('mgr/gallery/' . $method, ['id' => $id]);
            if ($response->isError()) {
                return $response->getResponse();
            }
        }

        return !empty($response)
            ? $response->getResponse()
            : $this->success();
    }
}

return 'msProductFileMultipleProcessor';
