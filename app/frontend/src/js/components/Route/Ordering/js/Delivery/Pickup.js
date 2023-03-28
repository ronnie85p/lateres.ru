import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, ToggleButton, Image } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import FakeDeliveries from '../../../../../src/js/fake/Deliveries'

import { Section, Header, OrderComment, OrderRecipient } from '../components'
import DeliveryPayments from './Payments'
import DeliveryTime from './Time'

const { useEffect, useContext, useState, createContext } = React;

const DeliveryPickup = (props) => {
    const { 
        delivery_id, 
        work_times
    } = props

    const delivery = FakeDeliveries[delivery_id];

    return <>
        <Section>
            <div>{delivery.description}</div>
            <hr className='' />

            <DeliveryTime 
                label={'Дата и время получения'}
                work_times={work_times}
            />
        </Section>

        <OrderRecipient title='Получатель' {...props}/>
        <OrderComment title='Комментарий' {...props}/>

        <div className='mb-2x'></div>
        
        <DeliveryPayments title='Способ оплаты' {...props}/>
    </>
}

export default DeliveryPickup;