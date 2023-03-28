<?php

namespace WF\Shop\Controllers\Recipient;

require_once dirname(__DIR__) . '/web.class.php';

class IndexController extends \WF\Shop\Controllers\WebController
{
    public $languageTopics = ['wf_shop'];
    public $permission = '';
    public $templateFile = 'chunks/recipient/index.tpl';

    public function preRender()
    {
        $properties = $this->getProperties();
        $this->setProperties($properties);
        return true;
    }
}

return 'WF\\Shop\\Controllers\\Recipient\\IndexController';