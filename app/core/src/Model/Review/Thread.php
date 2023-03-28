<?php
namespace App\Model\Review;

use xPDO\xPDO;

/**
 * Class Thread
 *
 * @property integer $resource_id
 * @property float $rating
 * @property float $rating_wilson
 * @property integer $messages
 * @property array $properties
 *
 * @property \App\Model\Review\Message[] $Messages
 *
 * @package App\Model\Review
 */
class Thread extends \xPDO\Om\xPDOSimpleObject
{
    public function getRating()
    {
        $rating = 0;

        if ($this->get('id') > 0) {
            $q = $this->xpdo->newQuery(\App\Model\Review\Vote::class);
            $q->innerJoin(\App\Model\Review\Message::class, 'Message');
            $q->where(['Message.thread_id' => $this->get('id')]);
    
            $voteCount = $this->xpdo->getCount(\App\Model\Review\Vote::class, $q);
            if ($voteCount > 0) {
                $q->select('SUM(rating)');
    
                if ($q->prepare() && $q->stmt->execute()) {
                    $ratingSum = $q->stmt->fetch(\PDO::FETCH_NUM)[0];
                    $rating = $ratingSum / $voteCount; 
                }
            }
        } 

        return $rating;
    }

    public function getWilsonRating()
    {
        $rating = 0;

        //1.0 = 85%, 1.6 = 95%
        // $z = floatval($this->xpdo->getOption('ec_rating_wilson_confidence', null, 1.6));

        // $width = (float) $maxAllowedRating - $minAllowedRating;
        // $c = (float) $count;
        // $phat = ($sum - $c * $minAllowedRating) / $width / $c;
        // $rating = ($phat + $z * $z/(2 * $c) - $z * sqrt(($phat * (1 - $phat) + $z * $z / (4 * $c))/$c))/(1 + $z * $z/$c);
        // return $rating * $width + $minAllowedRating;
    }

    public function getMessagesCount()
    {
        $count = $this->xpdo->getCount(\App\Model\Review\Message::class, [
            'thread_id' => $this->get('id'),
            'reply_author_id' => 0
        ]);

        return $count;        
    }

    public function updateRatings($save = true)
    {
        $rating = $this->getRating();
        $wilsonRating = $this->getWilsonRating();
    
        $this->fromArray([
            'rating' => $rating,
            'rating_wilson' => $wilsonRating
        ]);

        if ($save === true) {
            return $this->save();
        }

        return true;
    }

    public function updateInfo()
    {
        $messages = $this->getMessagesCount();
        $this->set('messages', $messages);
        $this->updateRatings();
        
        return parent::save();
    }
}
