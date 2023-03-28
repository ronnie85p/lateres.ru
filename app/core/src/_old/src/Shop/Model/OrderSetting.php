<?php
namespace WF\Shop\Model;

use xPDO\xPDO;

/**
 * Class OrderSetting
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $address_id
 * @property integer $payment_id
 * @property integer $delivery_id
 * @property float $weight
 * @property float $old_cart_cost
 * @property float $cart_cost
 * @property float $delivery_cost
 * @property float $cost
 * @property float $sales_tax
 * @property float $discount
 * @property boolean $contract_required
 * @property string $createdon
 * @property string $updatedon
 * @property array $properties
 *
 * @package WF\Shop\Model
 */
class OrderSetting extends \xPDO\Om\xPDOSimpleObject
{
}
