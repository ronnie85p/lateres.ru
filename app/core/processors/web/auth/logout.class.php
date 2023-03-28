<?php

namespace App\Processors\Auth;
use MODX\Revolution\Processors\Security\Logout;

class LogoutProcessor extends Logout
{
    public function initialize () 
    {
        $userContexts = array_keys($this->modx->user->getSessionContexts());

        $addContexts = $this->getProperty('addContexts', []);
        $addContexts = empty($addContexts) ? [] : explode(',', $addContexts);
        $addContexts = array_unique(array_merge($addContexts, $userContexts));
        $addContexts = array_values(array_filter($addContexts,
            function ($v) { return $v !== 'mgr'; }
        ));

        $properties = $this->getProperties();
        $properties['add_contexts'] = implode(',', $addContexts);

        $this->setProperties($properties);

        return parent::initialize();
    }
}

return LogoutProcessor::class;