import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { FetchList } from '../../../../../src/js/components/FetchList';
import { Preloader } from '../../../../../src/js/components/Preloader';
import Cart from '../../../../../src/js/cart';

import { CartModal } from './CartModal';

const { useContext, useState, useEffect } = React;

const Styles = {
    Item: {
        discount: {
            position: 'absolute', 
            top: '5px', 
            left: '5px', 
            right: '5px' 
        },
        discountBadge: {
            fontSize: '1.1em'
        }
    }
};

const addToCart = async (id) => {
    const resp = await Cart.add(id, 1);

    if (resp) {
        alert(resp.message);
    }
}

const Products = ({ children }) => {
    return <>{children}</>;
};

const Filters = (props) => {
    return (
        <Row {...props}>
            <Col md={4}>
                <InputGroup>
                    <Form.Select aria-label='Сортировать по'>
                        <option value="">Новые</option>
                        <option value="">Популярные</option>
                        <option value="">Особые</option>
                        <option value="">По цене</option>
                        <option value="">По рейтингу</option>
                    </Form.Select>
                    <Button variant='outline-secondary' className='icon-bar-chart'></Button>
                    <Button variant='outline-secondary' className='icon-bar-chart'></Button>
                </InputGroup>
            </Col>
            <Col md={8} className="text-end">
                <ButtonGroup aria-label='Изменить вид'>
                    <Button 
                        variant='outline-secondary' 
                        className='icon-grid' 
                        // active={filters.view === 'grid'}
                        onClick={() => setFilters({ view: 'grid' })}
                    ></Button>
                    <Button 
                        variant='outline-secondary' 
                        className='icon-menu' 
                        // active={filters.view === 'list'}
                        onClick={() => setFilters({ view: 'list' })}
                    ></Button>
                </ButtonGroup>
            </Col>
        </Row>
    )
};

const List = (props) => {
    const { category } = useContext(Context);
    const view = 'grid'

    return (
        <FetchList 
            action='category/products/getList'
            params={{ category: category.id }}

            ListComponent={({ items }) => {
                return <Row>{items}</Row>
            }}

            LoadingComponent={() => {
                return <Preloader />
            }}

            ItemComponent={({ item, index })=> {
                return <ListItem view={view} data={item}/>
            }}
        />
    );
};

const ListItem = ({ view, data }) => {
    const [isCartModalShown, setIsCartModalShown] = useState(false);

    const itemProps = {
        data, 
        isCartModalShown, 
        setIsCartModalShown
    }

    if (view === 'grid') {
        return <ListItemGrid {...itemProps}/>
    }

    return <ListItemRow {...itemProps}/>
};

const ListItemGrid = (props) => {
    const {
        data, 
        isCartModalShown,
        setIsCartModalShown
    } = props

    return (
        <Col md={4} className='mb-4'>
            <Card className='shadow-sm_ overflow-hidden position-relative'>
                <div className='' style={Styles.Item.discount}>
                    {data.discount > 0 ?
                        <Badge bg='danger' style={Styles.Item.discountBadge}>-{data.discount}%</Badge> : <></>}
                </div>

                <a href={data.uri}>
                    <Card.Img variant="top" src={data.image} style={{ height: '200px' }}  />
                </a>

                <Card.Body>
                    {/* <Row className='mb-2 d-none'>
                        <Col md={12} className='text-end text-success'>
                            <i className="icon-check"></i> Наличие
                        </Col>
                    </Row> */}
                    {/* <div className="mb-4 overflow-hidden" style={{ height: '42px', fontSize: '1.1em' }} title={data.pagetitle}>
                        <a href={data.url} style={{ color: 'black', textDecoration: 'none' }}>{data.pagetitle}</a>
                    </div> */}

                    <Card.Title>{data.pagetitle}</Card.Title>
                    <Card.Text>{data.description}</Card.Text>

                    <hr className="my-4 d-none" />
                    <Row>
                        <Col md={8} className='fw-bolder' style={{ fontSize: '1.5em' }}>{data.price} {data.currencyHtmlCode}</Col>
                        <Col md={4} className='text-end'>
                            <Button
                                variant={'light'}
                                type="button"
                                style={{ fontSize: '1.3em' }}
                                title="В корзину"
                                onClick={(e) => {
                                    if (data.cart) {
                                         
                                        setIsCartModalShown(true);
                                        // setIsModalShown(true)
                                        // setIsPreloaderControlShown(true)

                                        // setTimeout(() => {
                                        //     setIsPreloaderShown(false);
                                        // }, 3000);
                                        // modal({
                                        //     container: `#modal-cart-${data.id}`,
                                        //     title: 'Default Title',
                                        // });

                                        
                                        // modal(modalRef, {
                                        //     title: '',
                                        //     content: ''
                                        // });

                                        // modal.confirm(modalRef, 'title', 'content');
                                        // modal.alert(modalRef, 'title', 'content');
                                        // modal.error(modalRef, 'title', 'content');
                                        // modal.success(modalRef, 'title', 'content');
                                        // modal.warning(modalRef, 'title', 'content');
                                        // modal.info(modalRef, 'title', 'content');
                                    } else {
                                        addToCart(data.id)
                                    }
                                }}>
                                    {data.cart 
                                        ? <Icon.CartCheck size='22' color='#f7900a' />
                                        : <Icon.Cart size='22' />
                                    }
                            </Button>
                        </Col>
                    </Row>

                    <CartModal show={isCartModalShown} onClose={() => {
                        setIsCartModalShown(false);
                    }} itemKey={data.cart?.id}/>
                </Card.Body>
            </Card>
        </Col>
    )
}

const ListItemRow = ({ data }) => {
    return (
        <Col md={12} className='mb-4'>
            <div className="card shadow-sm_ overflow-hidden position-relative">
                <div className="" style={{ position: 'absolute', top: '5px', left: '5px', right: '5px' }}>
                    {data.discount > 0 ?
                        <span className="badge bg-danger" style={{ fontSize: '1.1em' }}>-{data.discount}%</span> : <></>}
                </div>

                <a href={data.uri}>
                    <img src={data.image} style={{ height: '153px' }} />
                </a>

                <div className="card-body">
                    <div className="mb-2 row d-none">
                        <div className="col-12 text-end text-success">
                            <i className="icon-check"></i> Наличие
                        </div>
                    </div>
                    <div className="mb-4 overflow-hidden" style={{ height: '42px', fontSize: '1.1em' }} title={data.pagetitle}>
                        <a href={data.url} style={{ color: 'black', textDecoration: 'none' }}>{data.pagetitle}</a>
                    </div>
                    <hr className="my-4 d-none" />
                    <div className="row">
                        <div className="col-8 fw-bolder" style={{ fontSize: '1.5em' }}>{data.price} {data.currencyHtmlCode}</div>
                        <div className="col-4 text-end">
                            <button
                                className="btn icon-shopping-cart"
                                type="button"
                                style={{ fontSize: '1.3em' }}
                                title="В корзину"
                                onClick={(e) => this.addToCart(e)}>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Col>
    )
}

Products.Filters = Filters;
Products.List = List;

export default Products;