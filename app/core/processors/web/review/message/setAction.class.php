<?php

namespace App\Processors\Review\Message;

use MODX\Revolution\Processors\Processor;

class SetActionProcessor extends Processor
{
    public function initialize() 
    {
        return parent::initialize();
    }

    public function process() 
    {   
        $message = $this->modx->getObject(
            \App\Model\Review\Message::class, 
            $this->getProperty('message_id')
        );

        if (empty($message)) {
            return $this->failure('undef_err');
        }

        // $action = $message->getOne(\App\Model\Review\Action::class, [
        //     'user_id:=' => $this->modx->user->id,
        //     'OR:ip:=' => $_SERVER['REMOTE_ADDR'],
        //     'OR:ssid:=' => session_id(),
        // ]);

        // if (empty($this->getProperty('like')) && empty($this->getProperty('dislike'))) {
        //     if ($action && !$action->remove()) {
        //         return $this->failure();
        //     }
        // } else {
        //     $action = $this->modx->newObject(\App\Model\Review\Action::class);
        //     $action->fromArray([
        //         'user_id' => $this->modx->user->id,
        //         'ssid' => session_id(),
        //         'ip' => $_SERVER['REMOTE_ADDR'],
        //         'user_agent' => $_SERVER['HTTP_USER_AGENT'],
        //         'like_or_dislike' => (int) $this->getProperty('like')
        //     ]);
    
        //     $message->addOne($action);

        //     if (!$message->save()) {
        //         return $this->failure();
        //     }
        // }

        return $this->cleanup();
    }

    public function cleanup()
    {
        return $this->success();
    }
}

return SetActionProcessor::class;