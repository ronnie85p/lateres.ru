<?php

namespace App\Files\File;

require_once dirname(__DIR__) . '/File.php';
use MODX\Revolution\modX;

class Validator extends \App\Files\File
{
    function __construct(modX & $modx, array $config = [])
    {
        parent::__construct($modx, array_merge([
            'allowedTypes' => [],
            'minSize' => 0,
            'maxSize' => 0,
        ], $config));
    }

    /**
     * @param array $file
     * @return boolean|string
     */
    public function checkUploadedFile (array $file)
    {
        try {
            if (!is_uploaded_file($file['tmp_name'])) {
                throw new \RuntimeException($this->modx->lexicon('app.file_upload_err', ['file' => $file])); // 'File not uploaded.'
            }
            
            // Undefined | Multiple Files | $_FILES Corruption Attack
            // If this request falls under any of them, treat it invalid.
            if (!isset($file['error']) || is_array($file['error'])) {
                throw new \RuntimeException($this->modx->lexicon('app.file_invalid_params', ['file' => $file])); // 'Invalid parameters.'
            }
            
            switch ($file['error']) {
                case UPLOAD_ERR_OK: break;

                case UPLOAD_ERR_INI_SIZE:
                case UPLOAD_ERR_FORM_SIZE:
                    throw new \RuntimeException($this->modx->lexicon('app.file_size_limit_exceeded', ['file' => $file])); // "Exceeded filesize limit. [0x{$file['error']}]"
              
                case UPLOAD_ERR_NO_FILE:
                    throw new \RuntimeException($this->modx->lexicon('app.file_no_sent', ['file' => $file])); // 'No file sent.'
                
                default:
                    throw new \RuntimeException($this->modx->lexicon('app.file_unknow_err', ['file' => $file])); // 'Unknown errors.' 
            }
            
        } catch (\Exception $e) {
            return $e->getMessage();
        }

        return true;
    }

    /**
     * @param array $file
     * @return boolean|string
     */
    public function validateFile (array $file) {
        
        try {
          
            if (!$this->checkMinSize($file)) {
                throw new \RuntimeException($this->modx->lexicon('app.file_less_min_size', $file)); // "File size is less than allowed."
            }
          
            // You should also check filesize here.
            if (!$this->checkMaxSize($file)) {
                throw new \RuntimeException($this->modx->lexicon('app.file_exceeded_max_size', $file)); // "Exceeded filesize limit."
            }
          
            // DO NOT TRUST $_FILES['upfile']['mime'] VALUE !!
            // Check MIME Type by yourself.
            // $mimeType = 'image/jpeg' 
            // $allowedTypes = ['image/jpeg', 'image/png']

            if (!$this->checkMimeType($file)) {
                throw new \RuntimeException($this->modx->lexicon('app.file_invalid_type', $file)); // 'Invalid file format.'
            }

            // if (strpos($mimeType, 'image/') !== false) {
            //     if (!$this->checkFileAsImageMinSize($file)) {
            //         throw new \RuntimeException('Image size does not meet the requirements. ' . implode('x', $minImageSize));
            //     }
            
            //     if (!$this->checkFileAsImageMaxSize($file)) {
            //         throw new \RuntimeException('Image size does not meet the requirements. '. implode('x', $maxImageSize));
            //     }
            // }
          
        } catch (\Exception $e) {
            return $e->getMessage();
        }    

        return true;
    }

    /**
     * @param array $file
     * @return boolean
     */
    public function checkMinSize(array $file)
    {
        $minSize = (float) $this->config['minSize'];
        return $file['size'] >= $minSize;
    }

    /**
     * @param array $File
     * @return boolean
     */
    public function checkMaxSize(array $file)
    {
        $maxSize = (float) $this->config['maxSize'];
        return empty($maxSize) || $file['size'] <= $maxSize;
    }

    /**
     * @param array $file
     * @return boolean
     */
    public function checkMimeType(array $file)
    {
        $allowedTypes = $this->config['allowedTypes'];
        $mimeType = empty($file['tmp_name']) ? $file['type'] 
            : mime_content_type($file['tmp_name']);
        
        return empty($allowedTypes) || in_array($mimeType, $allowedTypes);
    }


    
    public function checkFileAsImageMinSize(array $file)
    {
        $minImageSize = $this->config['minImageSize'];
        $imageSize = getimagesize($file['tmp_name']);

        $imageSizeWidth = $imageSize[0];
        $imageSizeHeight = $imageSize[1];

        $minImageSizeWidth = (float) $minImageSize[0];
        $minImageSizeHeight = (float) $minImageSize[1];

        // $imageSize = [1000, 400]
        // $minImageSize = [1200, 800]

        // $imageSizeWidth >= $minImageSizeWidth && $imageSizeWidth >= $minImageSizeWidth
    }

    public function checkFileAsImageMaxSize(array $file)
    {
        $maxImageSize = $this->config['maxImageSize'];
        $imageSize = getimagesize($file['tmp_name']);

        $imageSizeWidth = $imageSize[0];
        $imageSizeHeight = $imageSize[1];

        $maxImageSizeWidth = (float) $maxImageSize[0];
        $maxImageSizeHeight = (float) $maxImageSize[1];

        // !empty($maxImageSizeWidth) && $imageSizeWidth <= $maxImageSizeWidth && !empty($imageSizeHeight) && $imageSizeHeight <= $maxImageSizeHeight
    }
}