<?php
namespace App\Model\Review;

use xPDO\xPDO;

/**
 * Class File
 *
 * @property integer $message_id
 * @property integer $source_id
 * @property string $name
 * @property string $description
 * @property string $file
 * @property string $type
 * @property integer $size
 * @property string $url
 * @property string $hash
 * @property string $orig_hash
 *
 * @package App\Model\Review
 */
class File extends \xPDO\Om\xPDOSimpleObject
{
}
