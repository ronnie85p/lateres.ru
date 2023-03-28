<?php

namespace App\Processors\Auth\Code;
use MODX\Revolution\Processors\Processor;

class VerifyProcessor extends Processor
{
    /**@var App\Core $app */
    public $app;

    public $cacheKey;
    public $code;

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');

        $key = trim($this->getProperty('key'));
        if (empty($key)) {
            return $this->modx->lexicon('app.access_denied', ['code' => 1]);
        }

        $this->cacheKey = "app/auth/code/{$key}";
        $this->code = $this->getProperty('code');
        if (empty($this->code)) {
            return $this->modx->lexicon('app.auth_code_field_is_empty');
        }

        return true;
    }

    public function process()
    {
        $prevent = $this->getCacheData();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $prevent = $this->checkCode();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        return $this->cleanup();
    }

    public function cleanup()
    {
        $this->app->deleteCache($this->cacheKey);

        $returnUrl = $this->getProperty('returnUrl');
        if (is_numeric($returnUrl)) {
            $returnUrl = $this->modx->makeUrl($returnUrl, '', '', 'full');
        }

        return $this->success(
            $this->modx->lexicon('app.auth_code_verify_success'), 
            [ 'redirect' => $returnUrl, 'data' => $this->cacheData ]);
    }

    public function getCacheData() 
    {
        $this->cacheData = $this->app->getCache($this->cacheKey);
        if (empty($this->cacheData)) {
            return $this->modx->lexicon('app.access_denied', ['code' => 2]);
        }
    }

    public function checkCode()
    {
        if ((int) $this->cacheData['code'] !== (int) $this->code) {
            return $this->modx->lexicon('app.auth_code_field_invalid');
        }
    }
}

return VerifyProcessor::class;