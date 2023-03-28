<?php

use MODX\Revolution\Processors\Processor;

class mToolsPageGet extends Processor
{
    public function initialize()
    {

        return true;
    }

    public function process()
    {
        if (!empty($this->getProperty('hash')) && !empty($_SESSION['scripts']['Package\\mTools'][$this->getProperty('hash')])) {
            $scriptProperties = $_SESSION['scripts']['Package\\mTools'][$this->getProperty('hash')];
            $_GET = $_POST;
        
            $output = $this->modx->runSnippet('xPdoPage', $scriptProperties);
        }
        // return $this->test($scriptProperties, $output);
        return $this->success('', [
            'html' => $output,
            'pagination' => $this->modx->placeholders['page.nav'],
            'scriptProperties' => $scriptProperties
        ]);
    }

    public function test($scriptProperties, $output)
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties(),
            'scriptProperties' => $scriptProperties,
            'output' => $output
        ]);
    }
}

return 'mToolsPageGet';