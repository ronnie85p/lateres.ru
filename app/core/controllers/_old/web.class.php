<?php

namespace WF\Shop\Controllers;

use MODX\Revolution\Processors\Processor;

class WebController extends Processor
{
    public $pdoTools;

    public $languageTopics = ['wf_shop'];
    public $permission = '';
    public $templateFile = '';

    public function initialize() { 
        $this->pdoTools = $this->modx->services->get('pdofetch');

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

        $this->render();

        return $this->success('', array_merge($this->response ?: [], [
            'html' => $this->content
        ]));
    }

    public function preRender()
    {
        return true;
    }

    public function render()
    {
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
        return $this->templateFile;
    }
}