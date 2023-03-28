<?php

/**
 * Prepare an order
 * Форма оформления заказа
 */

namespace App\Processors\Web\Preorder;

use MODX\Revolution\Processors\Processor;

class BaseProcessor extends Processor
{
    /**@var App\Core $app */
    public $app;

    public $settingsKey;

    public $order;

    public function initialize()
    {
        $this->app = $this->modx->services->get('app');

        $cacheRootKey = trim($this->modx->getOption('app.preorder_settings_cache_path', null, 
        'app/order/'), '/') . '/';

        $this->settingsKey = $cacheRootKey . md5($this->modx->user->get('id'));
        $this->order = &$_SESSION['app.order'] ?? [];

        return parent::initialize();
    }

    public function process()
    {
        return $this->success();
    }

    public function getOrder($key = null)
    {
        return empty($key) ? $this->order : $this->order[$key];
    }

    public function saveOrder(array $data)
    {
        $this->order = array_merge($this->order ?: [], $data);
    }

    public function getSettings($key = null)
    {
        $this->settings = $this->app->getCache($this->settingsKey);
        $this->settings = empty($this->settings) ? [] : $this->settings;

        return empty($key) ? $this->settings : $this->settings[$key];
    }

    public function saveSettings(array $settings)
    {
        if (!$this->app->setCache($this->settingsKey, $settings)) {
            return $this->modx->lexicon('app.unknown_err', ['code' => 1]);
        }
    }

    public function updateSettings(array $data)
    {
        $settings = $this->getSettings();

        return $this->saveSettings(array_merge($settings, $data));
    }
}