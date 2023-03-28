<?php

namespace WF;

use MODX\Revolution\modX;

if (!class_exists('Tools')) {
    require_once MODX_CORE_PATH . 'components/wf_tools/src/Tools.php';
}

class Shop extends Tools
{
    public $modelNS = 'WF\\Shop\\Model\\';

    /** @var miniShop2 $miniShop2 */
    public $miniShop2;

    function __construct(modX & $modx, array $config = [])
    {
        $corePath = $modx->getOption('wf_shop.core_path');
        $assetsUrl = $modx->getOption('wf_shop.assets_path');

        parent::__construct($modx, array_merge([
            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            'processorsPath' => $corePath . 'processors/',
            'connectorUrl' => $assetsUrl . 'connector.php',
            'controllerUrl' => $assetsUrl . 'index.php',
            'assetsUrl' => $assetsUrl,
            'cssUrl' => $assetsUrl . 'css/',
            'jsUrl' => $assetsUrl . 'js/'
        ], $config));

        $this->modx->lexicon->load('wf_shop:default');

        $this->miniShop2 = $this->modx->services->get('minishop2');
    }
  
    public function initialize(string $ctx = '', array $scriptProperties = [], &$hash = null)
    {
        if ($ctx == 'web') {
            $this->setConfig($scriptProperties);
            $this->saveScriptProperties('wf_shop', $scriptProperties, $hash);

            $jsConfig = [
                'hash' => $hash,
                'assetsUrl' => $this->config['assetsUrl'],
                'connectorUrl' => $this->config['connectorUrl'],
                'controllerUrl' => $this->config['controllerUrl']
            ];
              
            $this->modx->regClientScript($this->config['jsUrl'] . 'default.js');

            $this->modx->regClientScript('<script>
                wf.Shop.initialize('. json_encode($jsConfig) .');
            </script>', true);
        }
      
        return true;
    }

    public function getOrder($criteria)
    {
        if (!is_numeric($criteria)) {
            $criteria = ['id' => $criteria];
        }

        $this->order = $this->modx->getObject('msOrder', array_merge([
            'user_id' => $this->modx->user->id
        ]));

        if (!$this->order) {
            return false;
        }

        $array = array_merge(
            $this->order->toArray(), 
            $this->order->get('properties')?:[]
        );

        unset($array['properties']);

        $aliases = ['Status', 'Delivery', 'Payment', 'Address', 'UserProfile'];
        foreach ($aliases as $alias) {
            $obj = $this->order->getOne($alias);
            if ($obj) {
                $objArray = $obj->toArray();

                if ($obj->get('properties')) {
                    $objArray = array_merge($objArray, $obj->get('properties') ?: []);

                    unset($objArray['properties']);
                }

                $array[strtolower($alias)] = $objArray;
            }
        }

        if (!empty($array['delivery_car'])) {
            $deliveryCar = $this->modx->getObject('WF\\Shop\\Model\\DeliveryCar', $array['delivery_car']);
            $array['delivery_car'] = $deliveryCar ? $deliveryCar->toArray() : [];
        }

        $array['products'] = [];
        foreach ($this->order->getMany('Products') as $product) {
            $productArray = array_merge($product->toArray(), $product->get('options') ?: []);
            $array['products'][] = $productArray;
        }

        return $array;
    }

    public function getTemplate(string $action, array $properties = [])
    {
        $response = $this->runController($action, $properties);
        
        if (!$response->isError()) {
            return $response->getObject()['html'];
        }

        return $response->getMessage();
    }

    public function getCollection(string $classKey, $where = [], $options = [])
    {
        $defaultOptions = [
            'offset' => 0,
            'limit' => 99999
        ];

        $options = array_merge($defaultOptions, $options ?: []);

        $q = $this->modx->newQuery($classKey);
        $q->select($this->modx->getSelectColumns($classKey, '', '', $options['select']));
        $q->where($where ?: []);
        $q->sortby($options['sortby'], $options['sortdir']);
        $q->limit($options['limit'], $options['offset']);

        if (!empty($options['innerJoin'])) {
            $q->innerJoin(
                $options['innerJoin']['class'], 
                $options['innerJoin']['alias'], 
                $options['innerJoin']['on']
            );
        }

        return array_values($this->modx->getCollection($classKey, $q));
    }

    public function getObjects($classKey, $where = [], $options = [])
    {
        $where = array_merge(['active' => 1], $where ?: []);
        $options = array_merge([
            'sortby' => 'rank',
            'sortdir' => 'ASC',
        ], $options ?: []);

        return $this->getCollection($classKey, $where, $options);
    }

    public function getObject($classKey, $where = [], $options = []) 
    {
        return $this->getObjects($classKey, $where, 
            array_merge(['limit' => 1], $options))[0];
    }

    public function getPaymentMethods($deliveryId, $where = [], $options = [])
    {
        $q = $this->modx->newQuery('msPayment');
        $q->select(['msPayment.*', 'Deliveries.*']);
        $q->where(array_merge([
            'msPayment.active' => 1,
            'Deliveries.delivery_id' => $deliveryId
        ], $where ?: []));
        $q->sortby('rank', 'ASC');
        $q->innerJoin('msDeliveryMember', 'Deliveries', '`Deliveries`.`payment_id` = `msPayment`.`id`' );

        $objects = $this->modx->getCollection('msPayment', $q);
        $payments = [];
        foreach ($objects as $object) {
            if (!empty($options['default']) && $object->id == $options['default']) {
                array_unshift($payments, $object);
            } else {
                array_push($payments, $object);
            }
        }

        return $payments;
    }

    public function getRecipientInfo($userId = 0) 
    {
        if ($userId > 0) {
            $user = $this->modx->getObject('modUser', $userId);
        } else {
            $user = $this->modx->user;
        }

        if (!$user || !($profile = $user->getOne('Profile'))) {
            return [];
        }

        $company = $this->modx->getObject('WF\\Profile\\Model\\Company', [
            'user_id' => $user->id
        ]);

        if ($company) {
            $company = array_merge($company->toArray(), [
                'line' => $company->getLine(),
                'address_line' => $company->getAddressLine()
            ]);
        }

        $profile = $profile->toArray();
        return [
            'profile' => $profile,
            'company' => $company
        ];
    }
  
    public function getDeliveryRows() 
    {
        return $this->pdoTools->getCollection('msDelivery', ['active' => true]);
    }
    
    public function getDeliveryRow($id) 
    {
        return $this->pdoTools->getObject('msDelivery', ['active' => true, 'id' => $id]);
    }
  
    public function getStatusRows() 
    {
        return $this->pdoTools->getCollection('msOrderStatus', ['active' => true]);
    }
  
    public function getStatusRow($id) 
    {
        return $this->pdoTools->getObject('msOrderStatus', ['active' => true, 'id' => $id]);
    }
  
    public function getDeliveryPaymentQuery($deliveryId, $paymentId=0)
    {
        $where = ['delivery_id' => $deliveryId];
        if ($paymentId > 0) {
            $where['payment_id'] = $paymentId;
        }
        
        $q = $this->modx->newQuery('msDeliveryMember');
        $q->where($where);
        $q->select($this->modx->getSelectColumns('msPayment'));
        $q->innerJoin('msPayment', 'Payment', ['payment_id = `Payment`.`id`', '`Payment`.`active` = 1']);
        return $q;
    }
  
    public function getDeliveryPaymentRows($deliveryId)
    {
        $q = $this->getDeliveryPaymentQuery($deliveryId);
        
        if ($q->prepare() && $q->stmt->execute()) {
            return $q->stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        
        return [];
    }
  
    public function getDeliveryPaymentRow($deliveryId, $paymentId)
    {
        $q = $this->getDeliveryPaymentQuery($deliveryId, $paymentId);
        
        if ($q->prepare() && $q->stmt->execute()) {
            return $q->stmt->fetch(PDO::FETCH_ASSOC);
        }
        
        return [];
    }
  
    public function getCustomerTypeRows()
    {
        return $this->pdoTools->getCollection('mspCustomerType', ['active' => true]);
    }
    
    public function getCustomerTypeRow($id)
    {
        return $this->pdoTools->getObject('mspCustomerType', ['active' => true, 'id' => $id]);
    }
  
    public function getPercentOf($up, $val) 
    {
      return strpos($val, '%') == strlen($val)-1
          ? floatval($val)
          : floatval($val) / $up * 100
      ;
    }
    
    public function getNumberFromPercent($up, $per)
    {
        return floatval($up / 100 * $per);
    }
}