<?php
namespace App\Model\Resource;

use xPDO\xPDO;

/**
 * Class File
 *
 * @property integer $resource_id
 * @property integer $source_id
 * @property integer $parent_id
 * @property string $name
 * @property string $description
 * @property string $path
 * @property string $file
 * @property string $type
 * @property integer $size
 * @property integer $rank
 * @property string $url
 * @property string $hash
 * @property string $orig_hash
 * @property array $properties
 * @property string $createdon
 * @property integer $createdby
 * @property string $updatedon
 * @property integer $updatedby
 * @property integer $deleted
 * @property string $deletedon
 * @property integer $deletedby
 *
 * @package App\Model\Resource
 */
class File extends \xPDOSimpleObject
{
}
