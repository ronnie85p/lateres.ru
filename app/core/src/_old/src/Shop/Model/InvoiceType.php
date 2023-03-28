<?php
namespace WF\Shop\Model;

use xPDO\xPDO;

/**
 * Class InvoiceType
 *
 * @property integer $id
 * @property string $name
 * @property string $handler_class
 * @property string $description
 * @property boolean $active
 * @property array $properties
 *
 * @package WF\Shop\Model
 */
class InvoiceType extends \xPDO\Om\xPDOSimpleObject
{
}
