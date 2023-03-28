<?php

namespace App\Order;

require_once dirname(__DIR__) . '/Order.php';

use MODX\Revolution\modX;

class Offer extends \App\Order
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, array_merge([
            'pdfResourceId' => $modx->getOption('app.order_offer_pdf_resource', null, 408),
            'pdfResourceLifetime' => $modx->getOption('app.order_offer_pdf_resource_lifetime', null, 0),
            'pdfResourcePath' => $modx->getOption('app.order_offer_pdf_resource_path', null, 'offers/'),
        ], $config));
    }

    public function generateResourceUrl($data)
    {
        if (!$this->modx->getCount(\modResource::class, 
            $this->config['pdfResourceId'])) {
            return false;
        }

        $path = trim($this->config['pdfResourcePath'], '/'). '/';
        $file = $path . md5(json_encode($data)) . '.pdf';
        $data = array_merge($data, ['id' => $this->config['pdfResourceId']]);

        if (!$this->saveTempPage($data, $file, $this->config['pdfResourceLifetime'])) {
            return false;
        }

        return $this->modx->getOption('site_url') . $file;
    }
}