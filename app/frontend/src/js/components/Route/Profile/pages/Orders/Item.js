import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner, Image } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from '../../../../../../src/js/components/Form';
import fakeOrders from '../../fake/Orders';
import fakePayments from '../../fake/Payments';


const { useEffect, useState } = React;

const OrdersItemPage = (props) => {
    const order = fakeOrders[0];
    const payments = fakePayments;

    return <>
        <Title {...props} order={order} className='mb-4'/>
        <Info {...props} order={order}/>
        <Actions {...props} order={order}/>

        <div className='h4'>Оплата</div>
        <PaymentMethods {...props} order={order} payments={payments} className='mb-4'/>

        <div className='h4'>Товары</div>
        <ProductsList {...props} order={order}/>
    </>
};

const Title = (props) => {
    const { order } = props

    return <>
        <Row {...props}>
            <Col>
                <div className='h4'>
                    № {order.num}

                    <Badge bg={''} className='ml-3' style={{ backgroundColor: order.status.color, fontSize: '.5em' }}>{order.status.name}</Badge>
                </div>
                <div className='text-muted fst-italic'>
                    от {order.createdon}
                </div>
            </Col>

            <Col className='text-end'>
                {/* <span style={{ color: order.status.color }}>{order.status.name}</span> */}
            </Col>
        </Row>
    </>
}

const Info = (props) => {
    const { order } = props

    return <>
        <div className='bg-white mb-2 p-3 rounded'>
            <Row>
                <Col md={8}>
                    <DeliveryInfo {...props}/>
                </Col>
                <Col>
                    <SummaryInfo {...props}/>
                </Col>
            </Row>
        </div>
    </>
}

const Actions = (props) => {
    const { order } = props

    const onReturn = (event) => {
        console.log('[onReturn]');
    }

    const onCancel = (event) => {
        console.log('[onCancel]');
    }

    return <>
        <Row className='mb-2x'>
            <Col className='text-end'>
                <Button className='mr-2' variant='light' style={{ backgroundColor: '#c0c0c029' }} onClick={onReturn}><IconReturn /> Сделать возврат</Button>
                <Button variant='warning' style={{ color: '#815513' }} onClick={onCancel}><IconCancel /> Отменить</Button>
            </Col>
        </Row>
    </>
}

const PaymentMethods = (props) => {
    const [method, setMethod] = useState(() => {
        return props.order.payment;
    });

    const { order, payments } = props;

    return <div {...props}>
        {payments.map(pmt => {
            return <Form.Check 
                inline
                defaultChecked={pmt.id === method.id}
                type='radio'
                name='payment'
                id={`pmt-${pmt.id}`}
                label={pmt.name}
                key={pmt.id}
                onChange={(event) => setMethod(pmt)}
            />
        })}

        <PaymentMethod method={method}/>
    </div>
}

const PaymentMethod = (props) => {
    const { method } = props

    return <>
        <div>
            {method.name}
        </div>
    </>
}

const ProductsList = (props) => {
    const { order } = props;

    const onReturn = (event) => {
        console.log('[onReturn]')
    }

    return order.products.map(prod => {
        return <div className='d-flex mb-4 bg-white rounded p-2' key={prod.id}>
            <div className='' style={{ height: '100px', width: '150px' }}>
                <Image src={prod.image} style={{ height: '100%' }} rounded/>
            </div>

            <div className='ml-4'>
                <div className='h6'>{prod.name}</div>
                <div className='mt-4'>{prod.price} {prod.currency_html_code} x {prod.count} {prod.count_unit}</div>
            </div>

            <div className='flex-fill text-end'>
                <Button className='btn-sm' variant='light' onClick={onReturn}><IconReturn /> Возврат</Button>
                <div className='fs-6 mt-4'>= {prod.cost} {prod.currency_html_code}</div>
                {/* <div className=''>Вес: {prod.weight} {prod.weight_unit}</div> */}
            </div>
        </div>
    });
}

const IconReturn = (props) => {
    return <Icon.ArrowReturnLeft {...props} style={{ transform: 'rotate(180deg)', position: 'relative', top: '-2px' }} />
};

const IconCancel = (props) => {
    return <Icon.XLg size='.9em' {...props} style={{ position: 'relative', top: '-1px' }} />
}

const DeliveryInfo = (props) => {
    const { order } = props

    switch (order.delivery.id) {
        case 1:
            return <DeliveryPickupInfo {...props}/>
        
        case 2:
            return <DeliveryCompanyInfo {...props}/>
    }

}

const SummaryInfo = (props) => {
    const { order } = props;

    return <>
        <div className='mb-3' style={{ fontSize: '1.4em' }}>Сумма</div>

        <Row className='mb-2' style={{ fontSize: '1.1em' }}>
            <Col md={4}>Товары</Col>
            <Col>{order.cart_cost}руб.</Col>
        </Row>

        <Row className='mb-2' style={{ fontSize: '1.1em' }}>
            <Col md={4}>Налог</Col>
            <Col>{order.sales_tax}руб.</Col>
        </Row>

        <Row className='mb-2' style={{ fontSize: '1.1em' }}>
            <Col md={4}>Доставка</Col>
            <Col>{order.delivery_cost}руб.</Col>
        </Row>

        <Row className='mb-2 fw-bolder' style={{ fontSize: '1.3em' }}>
            <Col md={4}>Итого</Col>
            <Col>{order.cost}руб.</Col>
        </Row>
    </>
}

const DeliveryPickupInfo = (props) => {
    const { order } = props

    return <>
        <div className='fs-5'><Icon.BoxFill /> {order.delivery.name}</div>
    </>
}

const DeliveryCompanyInfo = (props) => {
    const { order } = props

    return <>
        <div className='fs-5 mb-3'>
            {order.delivery.name}
        </div>

        <div className='mb-3 d-flex' style={{ fontSize: '1.1em' }}>
            <div style={{ width: '25px'}}><Icon.GeoAltFill size='1.1em' /></div>
            <div className='flex-fill'>{order.address.text}</div>
        </div>

        <div className='mb-3 d-flex' style={{ fontSize: '1.1em' }}>
            <div style={{ width: '25px'}}><Icon.Truck size='1.1em' /></div>
            <div className='flex-fill'>
                <div>{order.delivery_car.name}</div>
                <div className='text-muted'>{order.delivery_car.description}</div>
            </div>
        </div>

        <div className='mb-3 d-flex' style={{ fontSize: '1.1em' }}>
            <div style={{ width: '35px'}}><Icon.PersonCircle size='1.1em' /></div>
            <div className='flex-fill'>
                <div>{order.recipient.fullname}, {order.recipient.mobilephone}</div>

                {order.recipient.type == 1 ? <>
                    <div className='fw-bolder mt-2'>Юридическое лицо</div>
                    <div className='fst-italic'>Реквизиты: {order.recipient.company.text}</div>
                    <div className='fst-italic'>Адрес: {order.recipient.company.address_text}</div>
                </> : <></>}
            </div>
        </div>

        <hr className='' />

        <div className='mb-3' style={{ fontSize: '1.1em' }}>
            <span className='fw-bolder'>Дата и время доставки:</span> {order.delivery_date} {order.delivery_time}
        </div>
    </>
}

export default OrdersItemPage;