<?php
namespace WF\Shop\Model;

use xPDO\xPDO;

/**
 * Class CartItem
 *
 * @property string $id
 * @property integer $user_id
 * @property integer $product_id
 * @property string $pagetitle
 * @property string $description
 * @property float $price
 * @property float $old_price
 * @property float $net_sale_cost
 * @property float $cost
 * @property float $discount
 * @property float $tax_rate
 * @property float $sales_tax
 * @property float $weight
 * @property string $image
 * @property integer $count
 * @property string $createdon
 * @property string $updatedon
 * @property array $properties
 *
 * @package WF\Shop\Model
 */
class CartItem extends \xPDO\Om\xPDOSimpleObject
{
}
