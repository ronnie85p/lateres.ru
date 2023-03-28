<?php

use MODX\Revolution\Processors\Processor;

class mShopProductArticleGetGeneratedList extends Processor 
{
    public function initialize()
    {
        $this->vendorId = (int) $this->modx->getObject('msVendor', $this->getProperty('vendorId'));
        if (!$this->vendorId) {
            return 'Укажите производителя.';
        }

        $this->limit = (int) $this->getProperty('limit', 5);

        return true;
    }

    public function process()
    {
        // return $this->test();

        $articlesList = $this->getArticlesList();

        $articles = [];
        foreach ($articlesList as $article) {
            $articles[] = [
                'text' => $article,
                'value' => $article, 
            ];
        }

        return $this->success('', [
            'results' => $articles
        ]);
    }

    public function test()
    {
        return $this->success('Test mode', [
            'properties' => $this->getProperties()
        ]);
    }

    public function getWithLeadingZeros($num, $zeros=3) 
    {
        return str_repeat(0, $zeros - strlen($num) + 1) . $num;
    }

    public function getArticlesList()
    {
        $articles = []; $i = 0;
        while ($i < $this->limit) {
            $article = $this->generateArticle();
            if (array_search($article, $articles) !== false) {
                continue;
            } 

            $articles[] = $article;
            $i++;
        }

        return $articles;
    }

    public function getRandomCountryCode()
    {
        return mt_rand(200, 299);
    }

    public function generateArticle()
    {
        $countryCode = $this->getRandomCountryCode();
        return $this->generateBarcode($countryCode, $this->vendorId);
    }

    public function generateBarCode ($countryCode, $vendorId) 
    {
    
        /*
            EXAMPLE:
            460 1546 02129 8
            460  - country code (200-299)
            1546 - factory code (000[id])
            2129 - product code (000[n])
            8    - control code 
        */
        
        $leadingZeros = 3;

        $q = $this->modx->newQuery('msProduct');
        $q->where([ 'Data.article:LIKE' => $countryCode . $vendorId . '%' ]);
        $q->select([ 'msProduct.*', 'Data.*', 'COUNT(*) AS count' ]);
        $q->innerJoin('msProductData', 'Data', '`Data`.`id` = `msProduct`.`id`');
        
        $productCount = 1;
        if ($q->prepare() && $q->stmt->execute()) {
          $productCount = $q->stmt->fetch(PDO::FETCH_ASSOC)['count'];
        }
        
        $vendorId = $this->getWithLeadingZeros($vendorId, $leadingZeros);
        $productCount = $this->getWithLeadingZeros($productCount, $leadingZeros);
        $barCode = "{$countryCode}{$vendorId}{$prodNum}";
        $ctrlCode = $this->calculateControlCode($barCode);
        
        return "{$barCode}{$ctrlCode}";
    }

    public function calculateControlCode ($barCode) 
    {
        $odd = $even = [];
        
        $numbers = str_split($barCode);  
        for ($i = 0; $i < count($numbers); $i++) {
          $num = (int) $numbers[$i];
          if ($i%2) $odd[] = $num;
          else $even[] = $num;
        }
          
        $oddSum = array_sum($odd);
        $evenSum = array_sum($even);
        $oddResult = $oddSum * 3;
    
        return str_split($oddResult + $evenSum)[0];
    }
}

return 'mShopProductArticleGetGeneratedList';