import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, ToggleButton, Image } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import FakeDeliveries from '../../../../src/js/fake/Deliveries'
import FakeAddresses from '../../../../src/js/fake/Addresses'
import FakeUsers from '../../../../src/js/fake/Users'
import FakePayments from '../../../../src/js/fake/Payments'
import FakeProducts from '../../../../src/js/fake/Products'
import FakeDeliveryCars from '../../../../src/js/fake/DeliveryCars'

import Page from '../../../../src/js/components/Page'
import RawHTML from '../../../../src/js/components/RawHTML';
import { useForm } from '../../../../src/js/components/Form'

import DeliveryPickup from './Delivery/Pickup'
import DeliveryCompany from './Delivery/Company'
import OrderProducts from './Order/Products'
import OrderSummary from './Order/Summary'

const { useEffect, useContext, useState, createContext } = React;

const Context = createContext({ });
global.Context = Context;

const calculate = (items) => {
    const total = {
        old_cart_cost: 37_322.00,
        cart_cost: 35_222.00,
        delivery_cost: 4_700.00,
        sales_tax: 0,
        discount: 2_100.00,
        cost: 39_922.00,
        count: 0,
        items_count: 0
    };

    items.forEach(prod => {
        total.old_cost += prod.old_cost;
        total.cost += prod.cost;
        total.count += prod.count;
        total.items_count++;
    });

    return total;
}

const App = (props) => {
    // INN - 10 nums (juristic), 12 - physic
    // KPP - 9 nums
    // ОГРН - 13 nums

    const lang = {
        
    }

    const data = {
        delivery_id: 2,
        payment_id: 1,
        work_times: [
            '08:00',
            '08:30',
            '09:00',
            '09:30',
            '10:00',
            '10:30',
            '11:00',
            '11:30',
            '12:00',
            '12:30',
            '13:00',
            '13:30',
            '14:00',
            '14:30',
            '15:00',
            '15:30',
            '16:00',
            '16:30',
            '17:00',
            '17:30',
            '18:00',
            '18:30',
            '19:00',
            '19:30'
        ],

        deliveries: FakeDeliveries,
        payments: FakePayments,
        products: FakeProducts,

        recipient: FakeUsers[0],
        address: FakeAddresses[0],
        delivery_car: FakeDeliveryCars[0],

        delivery_cars: 3,
        delivery_distance: 25,

        old_cart_cost: 37_322.00,
        cart_cost: 35_222.00,
        delivery_cost: 4_700.00,
        sales_tax: 0,
        discount: 2_100.00,
        cost: 39_922.00,

        weight: 800.00,
        weight_unit: 'кг',

        count: 161,
        items_count: 4,

        currency_html: '&#x20bd;'
    };

    const [deliveryId, setDeliveryId] = useState(() => {
        return data.delivery_id
    });

    const form = useForm({
        action: 'order/create',
        defaultValues: {

        },

        onSubmit({ data, event }) {
        
            console.log('[App][Submit]', data);

            form.setIsSubmitting(true);

            setTimeout(() => {
                form.setIsSubmitting(false)
            }, 3000);

            // if (form.checkValidity() === false) {
            //     console.log('not valid')
            //     event.preventDefault();
            //     event.stopPropagation();
            // }

            return false;
        }
    });

    const handleDeliveryBtnClick = (event, id) => {
        event.preventDefault();
        setDeliveryId(id);
    }

    return <>
        <Context.Provider value={{}}>
            <Page>
                <Page.TopBar></Page.TopBar>
                <Page.Header></Page.Header>
                <Page.Content>
                    <h4 className='mb-2x'>Оформление заказа</h4>

                    <Form
                        noValidate
                        // validate={}
                        onSubmit={form.submit} 
                        onChange={form.changeValue} 
                        onKeyDown={form.preventInputSubmit}
                    >
                        <Row>
                            <Col>
                                <DeliveryBtns {...data} 
                                    delivery_id={deliveryId} 
                                    _onClick={handleDeliveryBtnClick}
                                />

                                <div className='mb-4'></div>

                                <DeliveryView {...data} 
                                    delivery_id={deliveryId}
                                />

                                <div className='h5 mt-2x'>Товары</div>
                                <OrderProducts {...data}/>
                            </Col>

                            <Col md={4}>
                                <OrderSummary {...data}
                                    delivery_id={deliveryId}
                                />
                            </Col>
                        </Row>
                    </Form>

                    {/* <Ordering>
                        {(response) => {
                            const { deliveries, delivery } = response;
                            
                            return (
                                <Form>

                                    <Row>
                                        <Col md='8'>

                                            <Form.Group className='mb-4'>

                                                {deliveries.map((_delivery) => {
                                                    return <Form.Check 
                                                            inline
                                                            defaultChecked={_delivery.id === delivery.id}
                                                            key={_delivery.id}
                                                            type='radio'
                                                            name='delivery'
                                                            label={_delivery.name}
                                                            id={`delivery-${_delivery.id}`}
                                                        />
                                                })}

                                            </Form.Group>

                                            <DeliveryView {...response}/>
                                            <RecipientView {...response}/>
                                            <PaymentsView {...response}/>

                                        </Col>

                                        <Col md='4'></Col>

                                    </Row>

                                </Form>

                            )
                        }}
                    </Ordering> */}
                </Page.Content>
            </Page>
        </Context.Provider>
    </>
};

const DeliveryBtns = (props) => {
    const { 
        deliveries, 
        delivery_id,
        _onClick
    } = props;

    const regularClasses = 'p-2 rounded d-flex align-items-center'
    const actionClasses = ' shadow-sm bg-white'
    const styles = {cursor: 'pointer', height: 76}

    return <Row>
        {Object.values(deliveries).map(item => {
            return <Col md={4} key={item.id}>
                <div 
                    className={regularClasses + (delivery_id === item.id ? actionClasses: '')} 
                    style={styles}
                    onClick={(event) => _onClick(event, item.id)}>
                    <Image src={item.logo} width='50' />
                    <span className='flex-fill ml-2 fs-5'>{item.name}</span>
                </div>
            </Col>
        })}
    </Row>
}

const DeliveryView = (props) => {
    const { delivery_id } = props

    switch (delivery_id) {
        case 1:
            return <DeliveryPickup {...props}/>
        
        case 2:
            return <DeliveryCompany {...props}/>
    }

    return <></>
}


// const Ordering = ({ children }) => {
//     const fetch = useFetchData({
//         action: 'ordering/getData',
//         params: {}
//     });

//     useEffect(() => {
//         fetch.sendRequest();
//     }, []);

//     if (fetch.isLoading) {
//         return <Preloader />
//     }

//     if (fetch.isError) {
//         return <>{fetch.error.message}</>
//     }

//     if (!fetch.response) {
//         return <></>
//     }

//     return children(fetch.response?.object);
// }

export default App;