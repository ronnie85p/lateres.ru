<?php

namespace App;

use MODX\Revolution\modX;

class Client extends \App\Core
{
    function __construct(modX & $modx, array $config = [])
    {
        $corePath = $modx->getOption('app.core_path', null, MODX_BASE_PATH . 'app/');

        parent :: __construct($modx, array_merge([
            'browser_path' => $modx->getOption('app.client_browser_path', null, 
                $corePath . 'vendor/browser/'),

            'sxgeo_path' =>  $modx->getOption('app.client_sxgeo_path', null, 
                $corePath . 'vendor/sxgeo/'),

            'sxgeo_dat' => $modx->getOption('app.client_sxgeo_dat', null, 
                $corePath . 'vendor/sxgeo/dat/sxgeocity.dat')
        ], $config));
    }

    public function getIp()
    {
        if ($this->modx->getRequest()) {
            return $this->modx->request->getClientIp()['ip'];
        }
    }

    public function getBrowser(string $userAgent = '') 
    {
        if (!$className = $this->modx->loadClass('Browser', $this->config['browser_path'], true, true)) {
            return false;
        }

        return new $className($userAgent);
    }

    public function getBrowserInfo(\Browser $browser)
    {
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
        if (!$className = $this->modx->loadClass('SxGeo', $this->config['sxgeo_path'], true, true)) {
            return false;
        }
        
        $cultureKey = strtolower($this->modx->getOption('cultureKey', null, 'en'));
        $ip = $ip ?: $_SERVER['REMOTE_ADDR'];

        /**
         * @method get($ip)
         * @method getCountry($ip)
         * @method getCountryId($ip)
         * @method getCity($ip)
         * @method getFullCity($ip)
         * @method about($ip)
         * @method get_num(void)
         */
        $instance = new $className($this->config['sxgeo_dat']);

        $results = [];
        foreach ($instance->getCityFull($ip) as $key => $location) {
            $name = $location["name_{$cultureKey}"];
            $results[$key] = [
                'name' => !empty($name) ? $name : $location['name_en'],
                'id' => $location['id'],
                'iso' => $location['iso'],
                'coords' => explode(', ', "{$location['lat']}, {$location['lon']}")
            ];
        }

        $results['ip'] = $ip;
        $results['coords'] = $results['city']['coords'];
        $results['address_text'] = empty($results['country']) ? '' : implode(', ', 
            array_map('trim', [
                $results['country']['name'], 
                $results['region']['name'],
                $results['city']['name']]
            )
        );

        return $results;
    }
}