<?php

use MODX\Revolution\Processors\Processor;

class mShopCountryGetList extends Processor 
{
    public function initialize()
    {
        return true;
    }

    public function process()
    {
        // return $this->test();

        $countryList = $this->getCountryList();

        $countries = [];
        foreach ($countryList as $iso => $country) {
            $countries[] = [
                'iso' => strtoupper($iso),
                'text' => $country,
                'value' => $country, // Deprecated (available for BC)
            ];
        }

        return $this->success('', [
            'results' => $countries
        ]);
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties()
        ]);
    }

    public function getCountryList()
    {
        $_country_lang = [];
        $ml = $this->modx->getOption('manager_language', $_SESSION, $this->modx->getOption('cultureKey', null, 'en'));
        if (file_exists($this->modx->getOption('core_path') . 'lexicon/country/' . $ml . '.inc.php')) {
            include $this->modx->getOption('core_path') . 'lexicon/country/' . $ml . '.inc.php';
        }
        asort($_country_lang);
        $search = $this->getProperty('query', '');
        if (!empty($search)) {
            foreach ($_country_lang as $key => $value) {
                if (false === stripos($value, $search)) {
                    unset($_country_lang[$key]);
                }
            }
            return $_country_lang;
        }
        $iso = $this->getProperty('iso', '');
        if (!empty($iso)) {
            foreach ($_country_lang as $key => $value) {
                if ($key !== strtolower($iso)) {
                    unset($_country_lang[$key]);
                }
            }
            return $_country_lang;
        }
        if ($this->getProperty('combo')) {
            array_unshift($_country_lang, ['']);
        }

        return $_country_lang;
    }
}

return 'mShopCountryGetList';