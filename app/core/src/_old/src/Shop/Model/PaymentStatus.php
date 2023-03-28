<?php
namespace WF\Shop\Model;

use xPDO\xPDO;

/**
 * Class PaymentStatus
 *
 * @property integer $id
 * @property string $name
 * @property string $color
 * @property string $description
 * @property boolean $active
 * @property integer $rank
 * @property array $properties
 *
 * @package WF\Shop\Model
 */
class PaymentStatus extends \xPDO\Om\xPDOSimpleObject
{
}
