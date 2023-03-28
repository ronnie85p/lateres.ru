<?php
namespace App\Model\Delivery;

use xPDO\xPDO;

/**
 * Class Zone
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
 * @property integer $rank
 *
 * @property \App\Model\Delivery\Car\Zone[] $Cars
 *
 * @package App\Model\Delivery
 */
class Zone extends \xPDO\Om\xPDOSimpleObject
{
}
