<?php

namespace App\Processors\Category;

class GetListProcessor extends \MODX\Revolution\Processors\Processor 
{
    public function initialize() 
    {
        return parent::initialize();
    }

    public function process() 
    {   

        return $this->cleanup($results, $pagination);
    }

    public function cleanup(array $results, array $pagination)
    {
        return [
            'results' => $results,
            'pagination' => $pagination,
            'total' => count($results),
            'success' => true
        ];
    }
}

return 'App\\Processors\\Category\\GetListProcessor';

