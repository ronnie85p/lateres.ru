import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import RatingStars from "./Stars"

const RatingVotes = (props) => {
    const { 
        total,
    } = props

    return <>
        <Row className=''>
            <Col className='text-center' md={3}>
                <div className='fs-1'>{total} / 5</div>
            </Col>

            <Col className=''>
                <RatingStats {...props}/>
            </Col>
        </Row>
    </>
}

const RatingStats = (props) => {
    const { votes } = props

    const ratings = [];
    for (let i = 5; i >= 1; i--) {
        const rating = votes.find(item => 
            item.rating == i);
   
        ratings.push(
            <Row key={i}>
                <Col>
                    <RatingStars count={i} rate={rating?.rating} size='.8em'/>
                    <span className=''></span>
                </Col>
                <Col className='text-end' md={2}>
                    {rating?.total || 0}
                </Col>
            </Row>
        );
    }

    return ratings;
}

export default RatingVotes