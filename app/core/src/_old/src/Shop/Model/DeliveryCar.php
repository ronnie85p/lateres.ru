<?php
namespace WF\Shop\Model;

use xPDO\xPDO;

/**
 * Class DeliveryCar
 *
 * @property string $name
 * @property string $description
 * @property string $image
 * @property float $weight
 * @property float $length
 * @property boolean $active
 *
 * @property \WF\Shop\Model\DeliveryCarZone[] $Zones
 *
 * @package WF\Shop\Model
 */
class DeliveryCar extends \xPDO\Om\xPDOSimpleObject
{
    public function getZones(array $where = [], array $options = [])
    {
        $classKey = 'WF\\Shop\\Model\\DeliveryCarZone';
        $zoneClassKey = 'WF\\Shop\\Model\\DeliveryZone';

        $q = $this->xpdo->newQuery($classKey);
        $q->select(['DeliveryCarZone.*', 'Zone.*']);
        $q->where(array_merge([ 'car_id' => $this->get('id'), 'Zone.active' => 1 ], $where));
        $q->innerJoin($zoneClassKey, 'Zone', [ '`Zone`.`id` = zone_id' ]);

        $q->limit($options['limit'] ?: 99999, (int) $options['offset']);

        return array_values($this->xpdo->getCollection($classKey, $q));
    }

    public function getZone(array $where = [], array $options = [])
    {
        $options = array_merge($options, ['limit' => 1]);
        return $this->getZones($where, $options)[0] ?? null;
    }
}
