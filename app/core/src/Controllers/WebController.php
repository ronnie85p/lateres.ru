<?php

namespace App\Controllers;

use MODX\Revolution\Processors\Processor;

class WebController extends Processor
{
    public $languageTopics = [];
    public $permission = '';
    public $templateFile = '';

    public function initialize() { 
        return true; 
    }

    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $result = $this->preRender();
        if ($result !== true) {
            return $this->failure($result === false ? '' : $result);
        }

        $content = $this->render();
        return $this->cleanup($content);
    }

    public function cleanup($content)
    {
        return $this->success('', [
            'content' => $content
        ]);
    }

    public function preRender()
    {
        return true;
    }

    public function render()
    {
        $properties = $this->getProperties();
        $content = file_get_contents($this->getTemplateFile());

        if ($content !== false) {
            // $chunk = $this->modx->newObject('modChunk', ['cacheable' => false]);
            // $content = $chunk->process($this->getProperties(), $content);

            
            $this->modx->setPlaceholders($this->getProperties());
            $this->modx->getParser()->processElementTags('', $content, true, false, '[[', ']]', [], 10);
            $this->modx->getParser()->processElementTags('', $content, true, true, '[[', ']]', [], 10);

        } else {
            echo 'could not content loaded ' . $this->getTemplateFile();
        }

        return $content;
        $this->content = $this->pdoTools->getChunk(
            '@FILE ' . $this->getTemplateFile(), 
            $this->getProperties()
        );        

        return $this->content;
    }

    /**
     * Return true here to allow access to this processor.
     *
     * @return boolean
     */
    public function checkPermissions()
    {
        return $this->modx->hasPermission($this->permission);
    }

    /**
     * Load a collection of Language Topics for this processor.
     * Override this in your derivative class to provide the array of topics to load.
     * @return array
     */
    public function getLanguageTopics() {
        return $this->languageTopics;
    }

    /**
     * Return the relative path to the template file to load
     *
     * @abstract
     * @return string
     */
    public function getTemplateFile()
    {
        return $this->templateFile ?: MODX_BASE_PATH . '/app/templates/' . $_REQUEST['action'] . '.tpl';
    }

    public function getHeader()
    {
        
    }

    public function getFooter()
    {

    }
}