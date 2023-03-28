<?php
namespace App\Model\Cart;

use xPDO\xPDO;

/**
 * Class Item
 *
 * @property string $id
 * @property integer $user_id
 * @property integer $product_id
 * @property string $name
 * @property string $image
 * @property float $price
 * @property float $cost
 * @property integer $count
 * @property integer $checked
 * @property string $createdon
 * @property string $updatedon
 * @property array $properties
 *
 * @package App\Model\Cart
 */
class Item extends \xPDO\Om\xPDOSimpleObject
{
}
