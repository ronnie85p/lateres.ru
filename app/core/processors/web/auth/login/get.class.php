<?php

namespace App\Processors\Web\Auth\Login\Story;
use MODX\Revolution\Processors\Model;

class GetProcessor extends Model\GetProcessor
{
    public $classKey = \App\Model\Auth\Login::class;
    public $primaryKey = 'where';

    public function initialize() 
    {
        $this->setProperties([
            'where' => [
                'id' => $this->getProperty('id'),
                'user_id' => $this->modx->user->id,
            ]
        ]);

        return parent::initialize();
    }
    
    public function cleanup()
    {
        $client = $this->modx->getService('client', \App\Client::class);
        $session = $this->modx->getService('session', \App\Auth\Session::class);

        $browser = $client->getBrowser();
        $array = $this->object->toArray();
        $array['session'] = $session->get($array['id']);
        $array['browser'] = $client->getBrowserInfo($browser);
        $array['geolocation'] = $client->getGeolocation($array['ip']);

        return $this->success('', $array);
    }
}

return GetProcessor::class;