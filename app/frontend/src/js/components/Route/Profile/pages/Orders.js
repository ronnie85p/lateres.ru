import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner, Image } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from '../../../../../src/js/components/Form';

import fakeOrders from '../fake/Orders';

const { useEffect, useState } = React;

const OrdersPage = (props) => {
    const {} = props

    return <>
        <List {...props}/>
    </>
}

const List = (props) => {

    const list = fakeOrders;

    return <>
        <Row>
            {list.map(item => {
                return <Col md={12} className='mb-2x' key={item.id}>
                    <Card className='border-0 shadow-sm'>
                        <Card.Header className='bg-white'>
                            <Row>
                                <Col>
                                    <div className='h5'>
                                        № {item.num}
                                    </div>

                                    <div className='text-muted fst-italic'>от {item.createdon}</div>
                                </Col>
                                <Col className='text-end'>
                                    <div style={{ color: item.status.color }}>{item.status.name}</div>
                                    {/* <div style={{ color: item.payment_status?.color }}>
                                        {item.payment_status?.name} 
                                        {item.order_paid != item.cost ?
                                            item.order_paid
                                        : <></>}
                                    </div> */}
                                </Col>
                            </Row>
                        </Card.Header>

                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <div className='mb-2'>{item.delivery.name}</div>

                                    {/* {item.order_paid > 0 && item.debt_amount > 0 ? 
                                        <div>К оплате {item.debt_amount}</div>
                                    : <></>} */}
                                </Col>
            
                                <Col className='text-end'>
                                    {item.products?.map(prod => {
                                        return <Image className='mr-2' style={{ display: 'inline', height: '75px' }} key={prod.id} src={prod.image} alt={prod.name} rounded/>
                                    })}
                                </Col>
                            </Row>
                        </Card.Body>    

                        <Card.Footer className='bg-white'>
                            <Row>
                                <Col>
                                    {item.order_paid > 0 && item.order_paid !== item.cost ? <>
                                        Внесена предоплата {item.order_paid} руб.
                                    </> : <></>}

                                    {item.order_paid > 0 &&  item.order_paid === item.cost ? <>
                                        <Icon.Check /> Оплачено
                                    </> : <>
                                        Не оплачено
                                    </>}
                                </Col>
                                <Col className='text-end'>
                                    <span className='fw-bolder' style={{ fontSize: '1.2em'}}>
                                        {/* = {item.cost}руб. */}
                                        {item.debt_amount}
                                    </span>
                                </Col>
                            </Row>
                        </Card.Footer>                    
                    </Card>
                </Col>
            })}
        </Row>
    </>
}

export default OrdersPage;