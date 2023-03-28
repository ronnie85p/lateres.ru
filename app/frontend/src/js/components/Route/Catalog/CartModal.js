import { Card, Row, Col, Form, Badge } from 'react-bootstrap'

import { useFetchData } from '../../../../../src/js/components/FetchData';
import { Modal } from '../../../../../src/js/components/Modal';
import { Preloader } from '../../../../../src/js/components/Preloader';

const { useEffect } = React;

const CartModalForm = (props) => {
    return <>
        <Row>
            <Col lg='8'>
                <Card className='md-4'>
                    <Card.Body>
                        <Badge bg='primary'>
                            product.parent|resource:'pagetitle'
                        </Badge>

                                    {/* <div className='d-flex pt-3'>
                                        <a className='w-200 pr-4 hidden-xs-down' href='shop-single.html'>
                                            <img src='$product.img' alt='product.pagetitle' />
                                        </a>
                                    <div> */}

                        <h6>
                            <a className='navi-link text-gray-dark' href='$product.id|url' target='_blanc'>product.pagetitle</a>
                        </h6>

                        <span className='d-block mb-2 text-lg'>
                            item.price|msFormat:'price' руб / <span className='cart-count-unit'>product.count_unit</span>
                        </span>

                        <Form className='cart-form' name='cart_count'>
                            <Form.Control as='input' type='hidden' name='action' value='cart/change' />
                            <Form.Control as='input' type='hidden' name='prod_id' value='item.product_id' />

                            <p className='d-block mb-2 text-lg'>
                                <Form.Label className='pr-2' htmlFor='count'>Кол-во:</Form.Label> 
                                <Form.Control as='input' type='number' name='count' defaultValue='item.count' 
                                    style={{width: '150px', border: 'none', borderBottom: '1px solid silver', padding: '5px'}} />&nbsp;product.count_unit
                            </p>
                        </Form>
                                    
                    </Card.Body>
                </Card>
            </Col>

            <Col lg='4'>
                <section className='widget widget-order-summary'>
                    <h3 className='widget-title'>В Корзине</h3>
                    <table className='table'>
                        <tbody>
                            <tr>
                                <td>Цена товара:</td>
                                <td className='text-gray-dark product' data-prod-id='item.product_id'>
                                    <span className='cart-cost'>item.cost|msFormat:'price'</span> руб.
                                </td>
                            </tr>
                            <tr>
                                <td>Всего товаров:</td>
                                <td className='text-gray-dark'>
                                    <span className='cart-total_in_cart'>total.total_in_cart</span> наим.
                                </td>
                            </tr>
                            <tr>
                                <td>Общий вес:</td>
                                <td className='text-gray-dark'>
                                    <span className='cart-total_weight'>total.total_weight|msFormat:'weight'</span> кг
                                </td>
                            </tr>
                            <tr>
                                <td>На сумму</td>
                                <td className='text-lg text-gray-dark'>
                                    <span className='cart-total_cost'>total.total_cost|msFormat:'price'</span> руб.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </Col>
        </Row>
        <Row>
            <Col lg='12'>
                <div className='d-flex justify-content-between paddin-top-1x margin-bottom-1x'>
                    <a className="btn btn-outline-success" href="#" data-dismiss="modal" ><i className="icon-arrow-left"></i> Продолжить<span className="hidden-xs-down">&nbsp;Покупки</span></a>
                    <a className="btn btn-outline-primary mr-0" href="608|url"><span className="hidden-xs-down">Перейти </span>В Корзину</a>
                </div>
            </Col>
        </Row>
    </>;
}

const CartModal = ({ show, itemKey, onClose }) => {
    const fetch = useFetchData({
        action: 'cart/item/get',
        params: { key: itemKey }
    });

    useEffect(() => {
        if (show) {
            fetch.sendRequest();
        }
    }, [show]);

    if (fetch.isLoading) {
        return <Preloader />
    }

    if (fetch.isError) {
        return <>{fetch.error.message}</>
    }

    if (!fetch.response) {
        return;
    }

    return (
        <Modal
            show={show}
            size='lg'
            title='Товар в корзине'
            content={() => {
                return (
                    <CartModalForm />
                )
            }}
            onClose={onClose}
            onRender={() => {
                console.log('[Modal] render', itemKey);
            }}
        />
    );
};

export { CartModal }