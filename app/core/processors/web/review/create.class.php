<?php

namespace App\Processors\Review;

use MODX\Revolution\Processors\Processor;

class CreateProcessor extends Processor
{
    public $resourceId;
    public $rating;
    public $message;
    public $thread;

    public function initialize() 
    {
        $this->resourceId = $this->getProperty('resource_id', false);
        if (empty($this->modx->getCount(\modResource::class, $this->resourceId))) {
            return $this->modx->lexicon('app.unknow_err', ['code' => 1]);
        }

        $this->rating = $this->getProperty('rating', false);
        if (empty($this->rating)) {
            return $this->modx->lexicon('app.review_rating_is_empty');
        }
        
        $maxRating = $this->modx->getOption('app.review_max_rating', null, 5);
        $minRating = $this->modx->getOption('app.review_min_rating', null, 1);

        if ($this->rating < $minRating) {
            $this->rating = $minRating;
        }

        if ($this->rating > $maxRating) {
            $this->rating = $maxRating;
        }

        $this->comment = $this->getProperty('message');

        if (!$this->modx->user->isAuthenticated('web')) {
            $fields = ['fullname', 'mobilephone', 'email'];
            foreach ($fields as $field) {
                if (empty($this->getProperty($field))) {
                    $this->addFieldError($field, $this->modx->lexicon('app.form_field_required'));
                }
            }
        }

        if ($this->hasErrors()) {
            // return false;
        }

        return parent::initialize();
    }

    public function getThread()
    {
        $this->thread = $this->modx->getObject(\App\Model\Review\Thread::class, [
            'resource_id' => $this->resourceId
        ]);

        if (empty($this->thread)) {
            $this->thread = $this->modx->newObject(\App\Model\Review\Thread::class, [
                'resource_id' => $this->resourceId
            ]);
        }
    }

    public function addMessage()
    {
        $this->message = $this->modx->newObject(\App\Model\Review\Message::class);
        $this->message->fromArray([
            'subject' => $this->getProperty('subject', ''),
            'text' => $this->getProperty('comment', ''),
            'datetime' => time(),
        ]);

        $this->message->addOne($this->author);
        $this->message->addOne($this->vote);

        $this->thread->addMany($this->message);
    }

    public function getAuthor()
    {
        $userId = $this->modx->user->isAuthenticated('web') 
            ? $this->modx->user->id : 0;

        if ($userId > 0) {
            $this->author = $this->modx->getObject(\App\Model\Review\Author::class, [
                'user_id:=' => $userId,
                'OR:ssid:=' => session_id(),
                'OR:ip:=' => $_SERVER['REMOTE_ADDR'],
            ]);
        }

        if (empty($this->author)) {
            $this->author = $this->modx->newObject(\App\Model\Review\Author::class, [
                'user_id' => $userId, 
                'email' => $this->getProperty('email'),
                'fullname' => $this->getProperty('fullname'),
                'mobilephone' => $this->getProperty('mobilephone'),
            ]); 
        } else {

            if ($this->allowOnlyOnce) {

            }

        }

        $this->author->fromArray([
            'ssid' => session_id(),
            'ip' => $_SERVER['REMOTE_ADDR'],
            'user_agent' => $_SERVER['HTTP_USER_AGENT']
        ]);   
    }

    public function getVote()
    {
        $this->vote = $this->modx->newObject(\App\Model\Review\Vote::class, [
            'rating' => $this->rating
        ]);
    }

    public function saveThread()
    {
        if ($saved = $this->thread->save()) {
            $this->thread->updateInfo();
        }

        return $saved;
    }

    public function process() 
    {   
        $prevent = $this->getAuthor();
        if (!empty($prevent)) {
            return $this->failure($prevent);
        }

        $this->getThread();
        $this->getVote();
        $this->addMessage();

        if (!$saved = $this->saveThread()) {   
            return $this->failure('undef_err');
        }

        $response = [
            'saved' => $saved,
            'thread' => $this->thread,
            'message' => $this->message,
            // 'author' => $this->author,
            // 'vote' => $this->vote,
            'total_rating' => $this->thread->getRating()
        ];

        $this->addFieldError('total_rating', $response['total_rating']);

        return $this->cleanup($response);
    }

    public function cleanup(array $response = [])
    {
        return $this->success('Test mode', $response);
    }
}

return CreateProcessor::class;

