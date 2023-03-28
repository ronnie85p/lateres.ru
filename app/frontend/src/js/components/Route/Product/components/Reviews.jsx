import React, { useContext, useState } from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import moment from 'moment'

import Icon from '@js/components/Icon'
import RatingStars from "@js/components/Rating/Stars"
import RatingVotes from "@js/components/Rating/Votes"

import { CommentForm } from "@js/components/Rating/Comments"
import { useRequest, RequestSuspense, sendRequest } from '@js/components/Request'
import { preventDefault } from '@js/utils'

import Context from '../context'

const ReviewCommentForm = (props) => {
    const { show } = props

    return show ? <>
        <CommentForm 
            requestOptions={{
                params: {
                    action: 'comment/send'
                }
            }}
            inputProps={{
                autoFocus: true,
                placeholder: ''
            }}

            {...props}
        /> 
    </>: <></>
}

const ReviewComments = (props) => {

}

const ReviewItem = (props) => {
    const {
        id,
        Vote,
        Author,
        publishedon,
        text,
        comments,
        likes,
        dislikes,
    } = props

    const [showCommentForm, setShowCommentForm] = useState(false);

    const commentLikeRequest = useRequest({
        params: {
            action: 'comment/doLike'
        }
    });

    const commentDislikeRequest = useRequest({
        params: {
            action: 'comment/doDislike'
        }
    });

    const queryCommentsRequest = useRequest({
        params: {
            action: 'comments/getList'
        }
    });

    const handleShowCommentReplyForm = (event) => {
        preventDefault(event);
        setShowCommentForm(true);
    }

    const handleCommentSend = () => {
        console.log('handleCommentSend');
        // submit();
        return true;
    }

    const handleCommentLike = (event) => {
        preventDefault(event);

        commentLikeRequest.send();
    }

    const handleCommentDislike = (event) => {
        preventDefault(event);

        commentDislikeRequest.send();
    }

    const handleQueryComments = (event) => {
        preventDefault(event);

        queryCommentsRequest.send();
        console.log('[Reviews][handleQueryComments]');
    }

    return <>
        <div className='mb-2x'>
            <div className='d-flex align-items-center mb-2'>
                <RatingStars rate={Vote.rating} className='mr-4'/>

                <div className='fs-6 flex-fill'>{Author?.fullname}</div>
                <div className='text-end text-muted'>{moment(new Date(publishedon / 1000)).fromNow()}</div>
            </div>

            <div className='mb-3'>{text}</div>

            <Row className='mb-3'>
                <Col className="d-flex align-items-center">
                    
                    <span className='mr-4'>
                        {!showCommentForm ?
                            <a href='#' onClick={handleShowCommentReplyForm}>Ответить</a>
                        :   <span className='fw-bolder'>Ваш ответ</span>}
                    </span>

                    {comments ? <>
                        <a href='#' onClick={handleQueryComments}>Комментарии</a> 
                        <span className='text-muted ml-1'>({comments})</span>
                    </>: <></>}
                </Col>

                <Col className='text-end'>
                    <span className='mr-2'>Отзыв полезен?</span>

                    <Button size='sm' variant=''
                        disabled={commentLikeRequest.result.state === 'sending'}
                        onClick={handleCommentLike}>
                            <Icon name='hand-thumbs-up' size='1.2em'/>
                            {likes}
                    </Button>
                    <Button size='sm' variant=''
                        disabled={commentDislikeRequest.result.state === 'sending'}
                        onClick={handleCommentDislike}>
                            <Icon name='hand-thumbs-down' size='1.2em'/>
                            {dislikes}
                    </Button>
                </Col>
            </Row>

            <ReviewComments 
                load={false}
            />

            <Row className=''>
                <Col>
                    <ReviewCommentForm 
                        show={showCommentForm}
                        onSubmit={handleCommentSend}
                        onComplete={() => {}}
                    />
                </Col>
            </Row>
        </div>
    </>
}

const Reviews = (props) => {
    const { title } = props
    const { data } = useContext(Context);
    
    const request = useRequest({
        params: {
            pid: data.object.id,
            action: 'product/reviews/tests/test_getList'
        }
    });

    return <>
        <div className='mt-2x mb-4'>
            <div className='fs-4'>{title}</div>
        </div>

        <RequestSuspense 
            request={request}>
                <RatingVotes 
                    {...request.result?.response?.rating}
                />

                <hr className='mt-2 mb-2x' />

                {request.result?.response?.results?.map(item => 
                    <ReviewItem {...item} key={item.id}/>)}
        </RequestSuspense>
    </>
}


export default Reviews