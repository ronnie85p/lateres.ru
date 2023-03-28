<?php

namespace App\Processors\Product\Reviews\Tests;

class Test_GetListProcessor extends \MODX\Revolution\Processors\Processor 
{
    public $reviews = [];

    public function initialize() 
    {
        /**
         * send message
         * 
         * text vote
         * 
         * create message 
         * create thread if not
         * create author if not 
         * 
         */

        return parent::initialize();
    }

    public function process() 
    {   
        $rating = $this->queryRating();
        $results = $this->queryComments();

        return $this->cleanup($results, $rating);
    }

    public function cleanup(array $results, array $rating)
    {
        return [
            'results' => $results,
            'rating' => $rating,
            'total' => count($results),
            'success' => true
        ];
    }

    public function queryRating()
    {
        return [
            'total' => 3,
            'votes' => [
                [
                    'rating' => 5,
                    'total' => 24
                ],
                [
                    'rating' => 3,
                    'total' => 37,
                ],
                [
                    'rating' => 4,
                    'total' => 16
                ],
            ],
            'simple_rating' => 3,
            'wilson_rating' => 0,
        ];
    }

    public function queryComments()
    {
        return [
  
            $this->getComment([
                 'text' => 'Lacus senectus eget cubilia at odio ullamcorper ultricies curabitur mattis. 
                    Justo suspendisse maecenas ut hymenaeos mi ornare dignissim litora fermentum.',
                'comments' => 10023,
                'Author' => $this->getAuthor(),
                'Vote' => $this->getVote([
                    'rating' => 3
                ]),
                'Comments' => [
                    $this->getComment(),
                    $this->getComment(),
                    $this->getComment(),
                ],
                'LastComment' => $this->getComment(),
            ]),

            $this->getComment([
                'text' => 'Interdum massa penatibus per nisl, aenean magnis sem tellus bibendum. 
                    Netus tristique. Consectetuer conubia orci varius ipsum volutpat sapien faucibus.',
                'Author' => $this->getAuthor(),
                'Vote' => $this->getVote([
                    'rating' => 4
                ]),
                'Comments' => [
                    $this->getComment(),
                    $this->getComment(),
                    $this->getComment(),
                ],
                'LastComment' => $this->getComment(),
            ]),

        ];
    }

    public function getComment(array $fields = [])
    {
        $array = array_merge([
            'id' => count($this->reviews) + 1,
            'product_id' => $this->getProperty('pid'),
            'author_id' => 1,
            'vote_id' => 1,
            'reply_author_id' => 0,
            'last_comment_id' => 0,

            'subject' => '',
            'text' => '',

            'datetime' => time(),

            'deleted' => 0,
            'deletedon' => null,
            'deletedby' => 0,

            'editedon' => null,
            'editedby' => 0,
            
            'published' => 1,
            'publishedon' => time(),
            'publishedby' => 1,

            'notify' => 1,
            'notify_datetime' => strtotime('-1 day', time()),

            'likes' => 0,
            'dislikes' => 0,
            'comments' => 0,

            'Author' => [],
            'Vote' => [],
            'Comments' => [],
            'LastComment' => [],
            'ReplyAuthor' => [],
            'Likes' => [],
            'Dislikes' => [],
        ], $fields);

        $this->reviews[] = $array;

        return $array;
    }

    public function getAuthor(array $fields = [])
    {
        $profile = $this->modx->user->getOne('Profile');

        return array_merge([
            'id' => 1,
            'user_id' => 1,
            'fullname' => $profile->get('fullname'),
            'mobilephone' => $profile->get('mobilephone'),
            'email' => $profile->get('email'),
            'ip' => $_SERVER['REMOTE_ADDR'],
            'session' => session_id(),
            'geolocation' => []
        ], $fields);
    }

    public function getVote(array $fields = [])
    {
        return array_merge([
            'comment_id' => 1,
            'rating' => 3,
        ], $fields);
    }
}

return Test_GetListProcessor::class;

