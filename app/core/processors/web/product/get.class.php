<?php


namespace App\Processors\Product;
use \MODX\Revolution\Processors\Model\GetProcessor; 

class Get extends GetProcessor
{
    public $app;
    public $classKey = \modResource::class;
    public $primaryKeyField = 'where';

    public function initialize() 
    {
        $this->app = $this->modx->services->get('app');

        $template = 10;
        $uri = trim($this->getProperty('uri'), '/');
      
        $this->setProperties([
            'context' => $this->modx->context->key,
            'where' => [
                'uri:=' => $uri,
                'OR:uri:=' => $uri . '/',
                'template' => $template,
                'published' => 1,
                'deleted' => 0,
            ],
        ]);

        return parent::initialize();
    }

    public function beforeOutput()
    {
        if ($this->getProperty('context') === 'web') {
            $this->modx->runSnippet('ResourceVisit', ['resource_id' => $this->object->get('id')]);
        }

        $response = $this->app->runProcessor('web/cart/get', ['key' => md5($this->modx->user->id.$this->object->id)]);
        $this->cart = $response->getObject();

        $response = $this->app->runProcessor('web/product/favorite/get', ['product_id' => $this->object->id]);
        $this->isFavorite = !$response->isError();

        $this->objectArray = $this->toArray();
        $visits = $this->app->getService('visits', \App\Resource\Visits::class);

        $this->rating = ['total' => 0];
        $this->reviews = ['total' => 0];
        // $this->visits = ['total' => 0, 'today' => 0];
        $this->visits = $visits->getStats(['resource_id' => $this->object->get('id')]);
    }

    public function cleanup(array $data = [])
    {
        return [
            'success' => true,
            'context' => $this->getProperty('context'),
            'object' => $this->objectArray,
            'rating' => $this->rating,
            'reviews' => $this->reviews,
            'visits' => $this->visits,
            'cart' => $this->cart,
            'is_favorite' => $this->isFavorite,
            'total' => 0,
        ];
    }

    public function toArray()
    {
        $array = array_merge($this->object->toArray(), $this->object->get('properties') ?: []);
        foreach ($this->object->getMany('TemplateVars') as $tv) {
            $tvValue = $tv->get('value');
            $tvName = $tv->get('name');

            switch ($tvName) {
                case 'price':
                case 'old_price':
                case 'discount_value':
                    $tvValue = number_format((float)$tvValue, 2, '.', ' ');
                    break;

                case 'weight':
                    $tvValue = number_format((float)$tvValue, 3, '.', ' ');
                    break;
                case 'measure_unit':
                    $object = $this->modx->getObject(\modResource::class, $tvValue);
                    if ($object) {
                        $tvValue = $object->get('pagetitle');
                    }
                    break;
            }

            $array[$tvName] = $tvValue;
        }

        $array['images'] = [];
        for ($i = 0; $i < 10; $i++) {
            $key = 'img';

            if ($i > 0) {
                $key .= '_' . $i;
            }

            if (!empty($array[$key])) {
                $domain = strpos($array[$key], "assets") === false 
                    ? "https://309921.selcdn.ru/l-s-ru/" 
                    : "https://www.lateres.ru/";
                
                $url = $domain . $array[$key];

                $array['images'][] = [
                    'id' => $i+1,
                    'url' => $url
                ];
            }

            unset($array[$key]);
        }

        $options = [];
        $q = $this->modx->newQuery(\modResource::class, ['parent' => 236]);
        $q->sortby('menuindex', 'ASC');

        $objects = $this->modx->getCollection(\modResource::class, $q);
        foreach ($objects as $object) {
            $name = str_replace('-', '_', $object->get('alias'));
            $value = $array[$name];
            if ($name !== 'weight' && $value > 0) {
                $_object = $this->modx->getObject(\modResource::class, $value);
                if ($_object) {
                    $value = $_object->get('pagetitle');
                }
            }

            if (!empty($value)) {
                $options[] = [
                    'title' => $object->get('pagetitle'),
                    'name' => $name,
                    'value' => $value,
                ];
            }
        }
        $array['options'] = $options;

        return $array;
    }
}

return Get::class;
