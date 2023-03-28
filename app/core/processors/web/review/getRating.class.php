<?php

namespace App\Processors\Review;

use MODX\Revolution\Processors\Processor;

class GetRatingProcessor extends Processor
{
    public function initialize() 
    {
        return parent::initialize();
    }

    public function process() 
    {   
        return $this->cleanup();
    }

    public function cleanup()
    {
        return $this->success();
    }
}

return GetRatingProcessor::class;