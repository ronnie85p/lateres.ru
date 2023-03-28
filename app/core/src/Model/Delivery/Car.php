<?php
namespace App\Model\Delivery;

use xPDO\xPDO;

/**
 * Class Car
 *
 * @property string $name
 * @property string $description
 * @property string $image
 * @property float $weight
 * @property float $length
 * @property boolean $active
 * @property integer $rank
 *
 * @property \App\Model\Delivery\CarZone[] $Zones
 *
 * @package App\Model\Delivery
 */
class Car extends \xPDO\Om\xPDOSimpleObject
{
}
