<?php

namespace App\Processors\Review;
use MODX\Revolution\Processors\Model;

class GetListProcessor extends Model\GetListProcessor
{
    public $classKey = \App\Model\Review\Message::class;
    public $defaultSortField = 'datetime';
    public $defaultSortDirection = 'DESC';
    public $defaultStart = 0;
    public $defaultLimit = 20;

    public function initialize() 
    {
        return parent::initialize();
    }

    public function beforeQuery()
    {
        $properties = $this->getProperties();
        $properties['start'] = $this->getProperty('start', $this->defaultStart);
        $properties['limit'] = $this->getProperty('limit', $this->defaultLimit);
        $properties['sort'] = $this->getProperty('sort', $this->defaultSortField);
        $properties['dir'] = $this->getProperty('sort', $this->defaultSortDirection);
        $properties['query'] = $this->getProperty('query', '');

        $this->setProperties($properties);
        return true;
    }

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $c->innerJoin(\App\Model\Review\Thread::class, 'Thread', 'Thread.id = thread_id');
        $c->where([
            'reply_author_id' => 0,
            'published' => 1,
            'deleted' => 0,
            'Thread.resource_id' => (int) $this->getProperty('resource_id'),
        ]);

        return $c;
    }

    public function prepareQueryAfterCount(\xPDOQuery $c)
    {
        return $c;
    }

    public function beforeQuery()
    {
        $properties = $this->getProperties();
        $properties['start'] = $this->getProperty('start', $this->defaultStart);
        $properties['limit'] = $this->getProperty('limit', $this->defaultLimit);

        $this->setProperties($properties);
        return true;
    }

    public function afterIteration(array $list)
    {
        return $list;
    }

    public function outputArray(array $array, $count = false)
    {
        return json_decode(
            parent::outputArray($array, $count)
            , true
        );
    }
}

return GetListProcessor::class;

