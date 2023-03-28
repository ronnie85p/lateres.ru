<?php
namespace App\Model\Delivery\Car;

use xPDO\xPDO;

/**
 * Class Zone
 *
 * @property integer $car_id
 * @property integer $zone_id
 * @property float $price
 * @property float $fixprice
 * @property float $minprice
 * @property float $maxprice
 * @property float $freefrom
 * @property boolean $notprice
 * @property integer $rank
 *
 * @package App\Model\Delivery\Car
 */
class Zone extends \xPDO\Om\xPDOSimpleObject
{
}
