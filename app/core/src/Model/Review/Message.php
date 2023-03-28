<?php
namespace App\Model\Review;

use xPDO\xPDO;

/**
 * Class Message
 *
 * @property integer $thread_id
 * @property integer $vote_id
 * @property integer $author_id
 * @property integer $reply_author_id
 * @property string $subject
 * @property string $text
 * @property integer $likes
 * @property integer $dislikes
 * @property string $datetime
 * @property integer $notify
 * @property string $notify_datetime
 * @property integer $published
 * @property string $publishedon
 * @property integer $publishedby
 * @property string $editedon
 * @property integer $editedby
 * @property integer $deleted
 * @property string $deletedon
 * @property integer $deletedby
 * @property array $properties
 *
 * @property \App\Model\Review\Message[] $Answers
 * @property \App\Model\Review\Actions[] $Actions
 * @property \App\Model\Review\File[] $Files
 *
 * @package App\Model\Review
 */
class Message extends \xPDO\Om\xPDOSimpleObject
{
}
