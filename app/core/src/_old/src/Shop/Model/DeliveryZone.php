<?php
namespace WF\Shop\Model;

use xPDO\xPDO;

/**
 * Class DeliveryZone
 *
 * @property string $name
 * @property string $description
 * @property float $distanceof
 * @property float $distanceup
 * @property boolean $polygon
 * @property string $polygon_coords
 * @property string $polygon_options
 * @property string $polygon_properties
 * @property boolean $active
 *
 * @property \WF\Shop\Model\DeliveryCarZone[] $Cars
 *
 * @package WF\Shop\Model
 */
class DeliveryZone extends \xPDO\Om\xPDOSimpleObject
{
}
