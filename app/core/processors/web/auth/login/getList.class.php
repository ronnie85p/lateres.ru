<?php

namespace App\Processors\Web\Auth\Login\Story;
use MODX\Revolution\Processors\Model;

class GetListProcessor extends Model\GetListProcessor
{
    public $classKey = \App\Model\Auth\Login::class;

    public function initialize() 
    {
        $this->setProperties([
            'where' => [
                'user_id' => $this->modx->user->id, 
                'id:!=' => session_id(),
            ],
            'start' => 0,
            'limit' => 5,
            'sort' => 'timestamp',
            'dir' => 'DESC',
        ]);

        return parent::initialize();
    }    

    public function prepareQueryBeforeCount(\xPDOQuery $c)
    {
        $c->where($this->getProperty('where'));

        return $c;
    }

    public function beforeIteration(array $list)
    {
        $login = $this->modx->getObject($this->classKey, [
            'user_id' => $this->modx->user->id,
            'id' => session_id(),
        ]);

        array_unshift($list, $login->toArray());

        return $list;
    }

    public function afterIteration(array $list)
    {
        $client = $this->modx->getService('client', \App\Client::class);
        $session = $this->modx->getService('session', \App\Auth\Session::class);

        $sessionId = session_id();
        $this->actives = 0;

        foreach ($list as &$item) {
            $browser = $client->getBrowser($item['user_agent']);
            $sessionData = $session->get($item['id']);

            $item['session'] = $sessionData;
            $item['current'] = $sessionData['id'] === $sessionId;
            $item['browser'] = $client->getBrowserInfo($browser);
            $item['geolocation'] = $client->getGeolocation($item['ip']);

            if ($sessionData['active'] === true) {
                $this->actives++;
            }
        }

        return $list;
    }

    public function outputArray(array $array, $count = false)
    {
        return [
            'success' => true,
            'total' => $count,
            'results' => $array,
            'actives' => $this->actives,
        ];
    }
}

return GetListProcessor::class;