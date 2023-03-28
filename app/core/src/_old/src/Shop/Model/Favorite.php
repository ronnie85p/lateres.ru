<?php
namespace WF\Shop\Model;

use xPDO\xPDO;

/**
 * Class Favorite
 *
 * @property integer $id
 * @property integer $user_id
 * @property integer $product_id
 * @property string $timestamp
 * @property array $properties
 *
 * @package WF\Shop\Model
 */
class Favorite extends \xPDO\Om\xPDOSimpleObject
{
}
