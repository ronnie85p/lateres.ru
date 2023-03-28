<?php

/**
 * @vendor Mpdf
 * https://mpdf.github.io/
 * 
 * 
 */

namespace App\Core;

use MODX\Revolution\modX;

class PDFBuilder extends \App\Core
{   
    public $mpdf;

    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, array_merge([
            'title' => $modx->getOption('app.pdfbuilder_title', null, 
                $modx->getOption('site_url')),
            'author' => $modx->getOption('app.pdfbuilder_author', null, 
                $modx->getOption('site_name')),
            'creator' => $modx->getOption('app.pdfbuilder_creator', null, 
                $modx->getOption('site_name')),
            'userPassword' => $modx->getOption('app.pdfbuilder_user_password', null, ''),
            'ownerPassword' => $modx->getOption('app.pdfbuilder_owner_password', null, ''),
            'permissions' => $modx->getOption('app.pdfbuilder_permissions', null, ''),
            'pdfTpl' => $modx->getOption('app.pdfbuilder_pdf_tpl', null, ''),
            'cssTpl' => $modx->getOption('app.pdfbuilder_css_tpl', null, ''),
            'outFile' => $modx->getOption('app.pdfbuilder_outfile', null, ''),
            'outDest' => $modx->getOption('app.pdfbuilder_outdest', null, 'I'),
        ], $config));
    }

    public function make(array $params = [])
    {
        if (!class_exists(\Mpdf\Mpdf::class)) {
            $this->modx->log(\xPDO::LOG_LEVEL_ERROR, \Mpdf\Mpdf::class . " not exists");
            return false;
        }

        $css = empty($this->config['cssTpl']) ? '' : 
            $this->pdoTools->getChunk($this->config['cssTpl'], $params); 
        $html = empty($this->config['pdfTpl']) ? '' : 
            $this->pdoTools->getChunk($this->config['pdfTpl'], $params);
        $outFile = $this->config['outFile'];
        $outDest = strtoupper($this->config['outDest']);

        $this->mpdf = new \Mpdf\Mpdf(array_merge([
            'mode' => $this->modx->getOption('app.pdfbuilder_mode', $params, 'utf-8'),
            'format' => $this->modx->getOption('app.pdfbuilder_format', $params, 'A4'),
            'defaultFontSize' => $this->modx->getOption('app.pdfbuilder_default_font_size', $params, 8),
            'defaultFont' => $this->modx->getOption('app.pdfbuilder_default_font', $params, ''),
            'mgl' => $this->modx->getOption('app.pdfbuilder_mgl', $params, 10),
            'mgr' => $this->modx->getOption('app.pdfbuilder_mgr', $params, 10),
            'mgt' => $this->modx->getOption('app.pdfbuilder_mgt', $params, 7),
            'mgb' => $this->modx->getOption('app.pdfbuilder_mgb', $params, 7),
            'mgh' => $this->modx->getOption('app.pdfbuilder_mgh', $params, 10),
            'mgf' => $this->modx->getOption('app.pdfbuilder_mgf', $params, 10),
            'orientation' => $this->modx->getOption('app.pdfbuilder_orientation', $params, 'P'),
            'customFonts' => $this->modx->getOption('app.pdfbuilder_custom_fonts', $params, '[]'),
            'showWatermarkImage' => $this->modx->getOption('app.pdfbuilder_show_watermark_image'),
            'showWatermarkText' => $this->modx->getOption('app.pdfbuilder_show_watermark_text'),
            'watermark_font' => $this->modx->getOption('app.pdfbuilder_show_watermark_font', null, ''),	 	 	 
            'watermarkImageAlpha' => $this->modx->getOption('app.pdfbuilder_show_watermark_image_alpha', null, '0.2'),
            'watermarkImgAlphaBlend' => $this->modx->getOption('app.pdfbuilder_show_watermark_image_alpha_blend', null, 'Normal'), 
            'watermarkImgBehind' => $this->modx->getOption('app.pdfbuilder_show_watermark_image_behind', null, false),
            'watermarkTextAlpha' => $this->modx->getOption('app.pdfbuilder_show_watermark_text_alpha', null, '0.2'),
        ], $params));

        $this->mpdf->SetTitle($this->config['title']);
        $this->mpdf->SetAuthor($this->config['author']);
        $this->mpdf->SetCreator($this->config['creator']);

        // Password protection
        $userPassword = $this->config['userPassword'];
        $ownerPassword = $this->config['ownerPassword'];
        $permissions = json_decode($this->config['permissions'], true) ?: [];
        if ($userPassword || $ownerPassword) {
            $this->mpdf->SetProtection($permissions, $userPassword, $ownerPassword, 128);
        }

        $this->mpdf->WriteHTML($css, \Mpdf\HTMLParserMode::HEADER_CSS);
        $this->mpdf->WriteHTML($html, \Mpdf\HTMLParserMode::HTML_BODY);

        return $this->mpdf->Output($outFile, $outDest);
    }
}