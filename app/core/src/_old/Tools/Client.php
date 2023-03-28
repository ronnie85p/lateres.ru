<?php

namespace WF\Tools;

use MODX\Revolution\modX;

class Client extends \WF\Tools 
{

    function __construct(modX & $modx, array $config = [])
    {
        parent :: __construct($modx, array_merge([
            'browser_path' => '',
            'sxgeo_path' => '',
            'sxgeo_dat' => ''
        ], $config));

        $this->config['browser_path'] = $this->modx->getOption('wf_tools.client_browser_path', null, 
            MODX_BASE_PATH . $this->config['corePath'] . 'vendor/browser/');

        $this->config['sxgeo_path'] = $this->modx->getOption('wf_tools.client_sxgeo_path', null, 
            MODX_BASE_PATH . $this->config['corePath'] . 'vendor/sxgeo/');

        $this->config['sxgeo_dat'] = $this->modx->getOption('wf_tools.client_sxgeo_dat', null, 
            MODX_BASE_PATH . $this->config['corePath'] . 'vendor/sxgeo/sxgeocity.dat');
    }

    public function getIp()
    {
        if (!$this->modx->getRequest()) {
            return '';
        }

        return $this->modx->request->getClientIp()['ip'];
    }

    public function getBrowser(string $user_agent = '') 
    {
        if (!$this->loadClass('browser', $this->config['browser_path'], '')) {
            return false;
        }

        if (empty($user_agent)) {
            $user_agent = $_SERVER['HTTP_USER_AGENT'];
        }

        $browser = new \Browser($user_agent);

        return [
          'useragent' => $browser->getUserAgent(),
          'version'   => $browser->getVersion(),
          'browser'   => $browser->getBrowser(),
          'platform'  => $browser->getPlatform(),
          'is_mobile' => $browser->isMobile(),
          'is_tablet' => $browser->isTablet(),
          'is_robot'  => $browser->isRobot(),
        ];
    }
      
    public function getGeolocation (string $ip = '') 
    {
        if (!$this->loadClass('sxgeo', $this->config['sxgeo_path'], '')) {
            return false;
        }

        if (empty($ip)) {
            $ip = $this->getIp();
        }
        
        $sxgeo = new \SxGeo($this->config['sxgeo_dat']);

        $cultureKey = strtolower($this->modx->getOption('cultureKey', null, 'en'));
        $geoData = $sxgeo->getCityFull($ip);

        $geolocation = [];
        foreach ($geoData as $k => $v) {
            if (!isset($v['name_' . $cultureKey])) {
                $cultureKey = 'en';
            }
            $coords = [];
            if (!empty($v['lat']) && !empty($v['lon'])) {
                $coords = [ $v['lat'], $v['lon'] ];
            }
            $geolocation[$k] = array_merge($v, [
                'name' => $v['name_' . $cultureKey], 
                'coords' => $coords
            ]);
            unset($geolocation[$k]['lat'], $geolocation[$k]['lon']);
        }
         
        $address = array_map('trim', [$geolocation['country']['name'], $geolocation['region']['name'], $geolocation['city']['name']]);
        $address = implode(', ', array_filter($address, function ($v) { return !empty($v); }));
        $coords = $geolocation['city']['coords'] ?? [];

        return array_merge($geolocation, [
            'address' => $address,
            'coords' => $coords,
            'ip' => $ip
        ]);
    }
}