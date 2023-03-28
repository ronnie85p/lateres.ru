<?php

namespace App\Resource;

use MODX\Revolution\modX;

class Visits extends \App\Core
{
    public $className = \App\Model\Resource\Visit::class;

    function __construct(modX & $modx, array $config = [])
    {
        parent :: __construct($modx, array_merge([
            'from_current_time' => $modx->getOption('app.resource_visits_from_current_time', null, 0)
        ], $config));
    }

    /**
     * @param array $data
     * @return boolean
     */
    public function hasToday(array $data) 
    {
        $condition = [];
        if ((int) $this->config['from_current_time']) {
            $timestamp = strtotime('-1 day');

            $condition['timestamp:>'] = date('Y-m-d H:i:s', $timestamp);
        } else {
            $startTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
            $endTime = mktime(23, 59, 59, date('m'), date('d'), date('Y'));

            $condition['timestamp:>='] = date('Y-m-d H:i:s', $startTime);
            $condition['timestamp:<='] = date('Y-m-d H:i:s', $endTime);
        }

        $condition['resource_id'] = $data['resource_id'];
        $criteria = [$condition,  [
            'user_id:=' => $this->modx->user->id,
            'OR:ip:=' => $data['ip'],
            'OR:ssid:=' => $data['ssid'],
        ]];

        return $this->modx->getCount($this->className, $criteria) > 0;
    }

    /**
     * @param array $data
     * @return boolean
     */
    public function create(array $data)
    {
        $object = $this->modx->newObject($this->className, [
            'user_id' => $this->modx->user->id,
            'resource_id' => $data['resource_id'],
            'ip' => $data['ip'],
            'ssid' => $data['ssid'],
            'user_agent' => $data['user_agent'],
            'timestamp' => time(),
        ]);
                
        return $object->save();
    }

    /**
     * @param array $data
     * @return array
     */
    public function getStats(array $data)
    {
        $startTime = mktime(0, 0, 0, date('m'), date('d'), date('Y'));
        $endTime = mktime(23, 59, 59, date('m'), date('d'), date('Y'));

        $todayCount = $this->modx->getCount($this->className, [
            'resource_id:=' => $data['resource_id'],
            'timestamp:>=' => date('Y-m-d H:i:s', $startTime),
            'timestamp:<=' => date('Y-m-d H:i:s', $endTime),
        ]);
        
        $totalCount = $this->modx->getCount($this->className, [
            'resource_id' => $data['resource_id'],
        ]);

        return [
            'rid' => $data['resource_id'],
            'today' => $todayCount,
            'total' => $totalCount,
        ];
    }
}