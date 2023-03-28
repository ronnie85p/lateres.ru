import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import * as Icon from 'react-bootstrap-icons'

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import FakeCart from '../../../../src/js/fake/Cart';
import RawHTML from '../../../../src/js/components/RawHTML';
import { useForm } from '../../../../src/js/components/Form';
import { useModal, Modal } from '../../../../src/js/components/Modal';
import { useRequest } from '../../../../src/js/components/Request';

const { Context, React } = global
const {
    useEffect, 
    useContext, 
    useState, 
    useMemo, 
    createRef 
} = React

const App = (props) => {
    const [results, setResults] = useState(null);
    
    const context = useContext(Context);
    const request = useRequest({
        url: '',
        action: '',
        data: { }
    });

    const queryData = () => {
        setResults({ 
            items: FakeCart, 
            total: {
                cart_old_cost: 3000,
                cart_cost: 2000,
                discount_value: 1000, 
                cost: 3000,
                cart_items_count: 3,
                weight: '',
                weight_unit: 'кг',
                sales_tax: 0,
                currency_html_code: '&#x20bd;'
            } 
        });
    }

    useEffect(() => {
        console.log('context', context)
        setTimeout(() => {
            queryData();
        }, 3000)
    }, []);

    return <>
        <Context.Provider value={{ ...results }}>

            {results ? <>
                <Header />
                <Container />
            </> : <>
                Waiting for...
            </>}

        </Context.Provider>
    </>
};

const Header = (props) => {
    const { total } = useContext(Context);

    return <>
        <h4 className='mb-2x'>Корзина ({total?.cart_items_count})</h4>
    </>
}

const Container = (props) => {
    const { items } = useContext(Context);

    const [isAllItemsChecked, setIsAllItemsChecked] = useState(false);
    const [isControlCheckAllChecked, setIsControlCheckAllChecked] = useState(false);
    const [checkedItemsCount, setCheckedItemsCount] = useState(0);

    const checkedItems = useMemo(() => { return new Map() }, []);

    const handleControlCheckAll = () => {
        setIsAllItemsChecked(!isAllItemsChecked)
    }

    const handleControlDelete = (event) => {
        console.log('[handleDelete]', checkedItems);
    }

    const handleItemCheck = ({ currentTarget }, checked) => {
        if (checked) {
            checkedItems.set(currentTarget.id, { 
                id: currentTarget.id, 
                element: currentTarget 
            })
        } else {
            checkedItems.delete(currentTarget.id);
        }
        
        setIsControlCheckAllChecked(checkedItems.size > 0);
        setCheckedItemsCount(checkedItems.size)
    }

    return <>
        <Row>
            <Col md='8'>
                {/* <CartSearchProducts 
                    className='mb-2x'
                    onInput={queryProducts}
                /> */}

                <CartControl
                    checkAllChecked={isControlCheckAllChecked} 
                    onCheckAllChange={handleControlCheckAll}
                    onBtnDelete={handleControlDelete}
                    BtnDeleteText={() => <>
                        <Icon.Trash size='1.1em' /> ({checkedItemsCount})
                    </>}
                />

                <div className='mb-4'></div>

                <CartList 
                    items={items} 
                    checked={isAllItemsChecked}
                    onItemCheckChange={handleItemCheck}
                />

                <hr className='mt-3x' />

                <Row>
                    <Col>
                        <Button variant='secondary'>Продолжить покупки</Button>
                    </Col>
                    <Col className='text-end'>
                        <Button variant='warning' onClick={() => {

                        }}>Коммерческое предложение</Button>
                    </Col>
                </Row>

                <div className='mb-4'></div>

                <h4>Вас может заинтересовать:</h4>
                <Card style={{ height: 100 }}>
                    <Card.Body>

                    </Card.Body>
                </Card>

                <div className='mb-4'></div>

                <h4>Вы смотрели:</h4>
                <Card style={{ height: 100 }}>
                    <Card.Body>

                    </Card.Body>
                </Card>

            </Col>
            <Col>
                <CartSummary />
            </Col>
        </Row>
    </>
}

const CartControl = (props) => {
    const {
        BtnDeleteText,
        checkAllChecked,
        onCheckAllChange,
        onBtnDelete
    } = props

    const [isCheckAllChecked, setIsCheckAllChecked] = useState(() => {
        return checkAllChecked === true
    });

    const handleCheckAll = (event) => {
        onCheckAllChange(event);
    }

    const handleDelete = (event) => {
        onBtnDelete(event);
    }

    useEffect(() => {
        if (isCheckAllChecked !== checkAllChecked) {
            setIsCheckAllChecked(checkAllChecked);
        }
    }, [checkAllChecked]);

    return <>
        <Row>
            <Col>
                <Button 
                    variant='light' 
                    className='mr-2'
                    style={{ cursor: 'default' }}
                    onClick={handleCheckAll}>
                        <Form.Check 
                            name='check_all'
                            label={isCheckAllChecked ? 'Снять все' : 'Выбрать все'}
                            id='cart-control-check-all'
                            checked={isCheckAllChecked}
                            onChange={() => {}}
                        />
                </Button>

                {isCheckAllChecked 
                    ?   <Button variant='light' className='mr-2'
                            name='delete_checked'
                            id='cart-control-delete-checked'
                            onClick={handleDelete}>
                                <BtnDeleteText />
                        </Button> 
                    :   <></>
                }
            </Col>
        </Row>
    </>
}

const CartList = (props) => {
    const {
        items,
        checked,
        onItemCheckChange
    } = props

    return items.map(item => 
        <CartItem key={item.id} 
            data={item}
            checked={checked} 
            onCheckChange={onItemCheckChange}
        />
    )
}

const CartItem = (props) => {
    const { 
        data, 
        onCheckChange
    } = props

    const {
        id,
        count, 
        left_count, 
        count_unit, 
        currency_html_code,
        price,
        cost,
        weight,
        weight_unit,
        url,
        name,
        image,
        discount,
        description,
        checked,
    } = data

    const [isChecked, setIsChecked] = useState(() => {
        return checked === true
    })

    const checkRef = createRef(null);

    const handleCountChange = ({ currentTarget }) => {
        const value = parseInt(currentTarget.value);
        console.log('changed', value);
        if (value === 0) {
            
        }
    }

    const handleCheckChange = (event, checked) => {
        // setIsChecked(checked);

        if (onCheckChange) {
            onCheckChange(event, checked);
        }
    }

    useEffect(() => {
        if (isChecked !== checked) {
            handleCheckChange({ currentTarget: checkRef.current }, checked)
        }
    }, [checked])

   return <>
        <div className='rounded shadow-sm mb-4 p-2' id={id}>
            <Row>
                <Col md='9'>
                    <div className='d-flex'>
                        <Form.Check
                            type='checkbox'
                            ref={checkRef}
                            checked={isChecked} 
                            name={`check_${id}`}
                            id={`check-${id}`}
                            className='d-flex align-items-center mr-4'
                            onChange={event => 
                                handleCheckChange(event, !isChecked)}
                        />

                        <Image className='mr-4' src={image} alt={name} width={150} rounded/>

                        <div className='overflow-hidden'>
                            <div className='mb-1' style={{ fontSize: '1.2em' }}>
                                <a href={url} target='_blanc'>{name}</a>
                            </div>

                            <div className='text-muted text-truncate'>{description}</div>
                            
                            <div className='mt-2'>
                                Цена {price} <RawHTML>{currency_html_code}&nbsp;</RawHTML> за {count_unit}
                            </div>

                            <div className='text-danger'>
                                Скидка -{discount} <RawHTML>{currency_html_code}</RawHTML>
                            </div>
                        </div>
                    </div>
                </Col>

                <Col md='3'>
                    <InputCounter 
                        name='count'
                        value={count} 
                        minValue={0}
                        onChange={handleCountChange}
                    />

                    <div className='text-danger text-center small mt-1'>Осталось {left_count} {count_unit}</div>

                    <div className='text-center' style={{ fontSize: '1.3em' }}>{cost} <RawHTML>{currency_html_code}</RawHTML></div>
                </Col>
            </Row>
        </div>
    </>
}

const LoginModal = (props) => {
    const { show } = props;
    const modal = useModal({
        titleText: 'Авторизация',
        Body: () => {
            return <></>
        },
        ...props
    });

    useEffect(() => {
        if (show) {
            modal.show();
        }
    }, [show]);

    return <Modal use={modal} />
}

const CartSummary = (props) => {
    const { total } = useContext(Context)
    const [isLoginModalShown, setIsLoginModalShown] = useState(false);

    const form = useForm({
        onSubmit() {
            console.log('submitting', isLoginModalShown);

            setIsLoginModalShown(true);
            return false;
        }
    });

    return <>
        <div className='sticky-top offset-top-1'>
            <LoginModal show={isLoginModalShown} onHide={() => setIsLoginModalShown(false)}/>

            <Form
                onSubmit={form.submit}
                
            >
                <Card className='bg-light'>
                    <Card.Body>

                        <Row className='mb-4'>
                            <Col md='8'>
                                <div className='fw-bolder m-0 fs-3'>Сумма</div>
                            </Col>
                            <Col className='d-flex align-items-end justify-content-end' md='4'>
                                {/* {total?.cart_items_count} <RawHTML>&nbsp;&bull;&nbsp;</RawHTML> {total?.weight} {total?.weight_unit} */}
                            </Col>
                        </Row>

                        <Row className='mb-1 fs-6'>
                            <Col md='6'>
                                Товары
                            </Col>
                            <Col md='6 text-end'>
                                {total?.cart_cost} <RawHTML>{total?.currency_html_code}</RawHTML>
                            </Col>
                        </Row>

                        <Row className='text-danger mb-1 fs-6'>
                            <Col md='6'>
                                Скидка 
                            </Col>
                            <Col md='6 text-end'>
                                -{total?.discount_value} <RawHTML>{total.currency_html_code}</RawHTML>
                            </Col>  
                        </Row>

                        <Row className='mb-4 fs-6'>
                            <Col md='6'>
                                Налог
                            </Col>
                            <Col md='6 text-end'>
                                {total?.sales_tax > 0 
                                    ? <>{total?.sales_tax} <RawHTML>{total?.currency_html_code}</RawHTML></>
                                    : 'Без НДС'}
                            </Col>
                        </Row>

                        {/* <Row className='fw-bolder fs-4'>
                            <Col md='6'>
                                Итого
                            </Col>
                            <Col md='6 text-end'>
                                {total?.cost} <RawHTML>{total?.currency_html_code}</RawHTML>
                            </Col>
                        </Row> */}
                    </Card.Body>
                </Card>
    
                <Button className='btn-block btn-lg' variant='danger' type='submit'>
                    К оформлению
                    <div className='' style={{ fontSize: '.7em', opacity: .6}}>
                        {total?.cart_items_count} товара 
                        {total?.cost} <RawHTML>{total?.currency_html_code}</RawHTML>
                    </div>
                </Button>
            </Form>
        </div>
    </>
};




const Cart = ({ children }) => {
    const fetch = useFetchData({
        action: 'cart/get',
        params: {  }
    });

    useEffect(() => {
        fetch.sendRequest();
    }, []);

    if (fetch.isLoading) {
        return <Preloader show={true} position='fixed' />
    }

    if (fetch.isError) {
        return <div>{fetch.error.message}</div>
    }

    if (fetch.response) {
        return <Row>
            {children(fetch.response.object)}
        </Row>
    }
}

Cart.ControlPanel = (props) => {
    return <>
        <div className=''>

        </div>
    </>
}

Cart.SearchPanel = (props) => {
    const form = useForm({
        action: 'cart/products/getList',
        defaultFields: {
            q: ''
        },

        onChangeValue({ event }) {
            // console.log('[Form] onChangeValue', event)
        },

        onSubmit({ event, data, options }) {
            console.log('[Form] onSubmit', event, data, options);

            // setTimeout(() => {
                form.setErrors({q: 'the test an error'});
            // }, 3000);
            return false;
        },

        onError({ error, options }) {
            console.log('[Form] onError', error, options);
        },

        onSuccess({ response, options }) {
            console.log('[Form] onSuccess', response, options);
        },

        onComplete({ response, options }) {
            console.log('[Form] onError', response, options);
        }
    });

    useEffect(() => {
        console.log('errors', form.errors);
    }, [form.errors]);

    return <>
        <Row {...props}>
            <Col md='8'>
                <Form 
                    noValidate
                    validated={false}
                    onSubmit={form.submit} 
                    onChange={form.changeValue} 
                    // onKeyDown={form.preventInputSubmit}
                    >
                        <Form.Group>
                            <Form.Control 
                                as='input' 
                                placeholder='Найти и добавить товар в корзину' 
                                name='q' 
                                defaultValue={form.defaultFields.q} 
                                // onInput={form.changeValue} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {form.errors.q}
                            </Form.Control.Feedback>
                        </Form.Group>
                </Form>
            </Col>
        </Row>
    </>
}

const InputCounter = ({
    name = '',
    value = '',
    minValue = -9999999999,
    maxValue = 9999999999,
    buttonMinusProps = {},
    buttonPlusProps = {},
    inputProps = {},
    onChange = () => {}
}) => {
    const [isMinusDisabled, setIsMinusDisabled] = useState(false);
    const [isPlusDisabled, setIsPlusDisabled] = useState(false);
    const [counter, setCounter] = useState(() => {
        let _value = parseInt(value)

        return !isNaN(_value) ? _value : 0;
    });

    const _minValue = parseInt(minValue);
    const _maxValue = parseInt(maxValue);

    if (isNaN(_minValue)) {
        throw new Error('Prop minValue is not a number.');
    }

    if (isNaN(_maxValue)) {
        throw new Error('Prop maxValue is not a number.');
    }

    const isValueMinAllowed = (value, orEqual = false) => {
        return orEqual ? value >= minValue : value > minValue;
    }

    const isValueMaxAllowed = (value, orEqual = false) => {
        return orEqual ? value <= maxValue : value < maxValue;
    }

    const invokeEvent = (target, type) => {
        target.dispatchEvent(new Event(type, { bubbles: true }));
    }

    const handleDecrement = (event) => {
        if (isValueMinAllowed(counter)) {
            setCounter(counter - 1);
        }

        handleChange({ currentValue: counter - 1, ...event });
    }

    const handleIncrement = (event) => {
        if (isValueMaxAllowed(counter)) {
            setCounter(counter + 1);
        }

        handleChange({ currentValue: counter + 1, ...event });
    }

    const handleInput = (event) => {
        let _value = parseInt(event.currentTarget.value);

        if (!isNaN(_value) && 
            isValueMinAllowed(_value, true) && 
            isValueMaxAllowed(_value, true)) {
                setCounter(_value);
        }
    }

    const handleChange = (event) => {
        // console.log('changed', event);
        onChange(event);
    }

    const afterUpdate = () => {
        setIsMinusDisabled(!isValueMinAllowed(counter))
        setIsPlusDisabled(!isValueMaxAllowed(counter))
    }

    useEffect(() => {
        afterUpdate();

    }, [counter]);

    return <>
        <InputGroup>
            <Button 
                variant='light' 
                className='icon-minus mr-1 rounded' 
                {...buttonMinusProps} 
                onClick={handleDecrement}
                disabled={isMinusDisabled}
            />

            <Form.Control 
                as='input' 
                className='text-center rounded' 
                {...inputProps}
                value={counter} 
                name={name} 
                onChange={handleChange}
                onInput={handleInput} 
            />
            
            <Button 
                variant='light' 
                className='icon-plus ml-1 rounded'
                {...buttonPlusProps} 
                onClick={handleIncrement} 
                disabled={isPlusDisabled}
            />
        </InputGroup>
    </>
}

const ProductsList = ({ items }) => {
    return items.map(item => 
        <ProductsItem key={item.id} data={item}/>)
}

const ProductsItem = ({ data }) => {
    return <>
        <div className='rounded shadow-sm d-flex mb-4' style={{ cursor: 'pointer' }}>
            <div>
                <Image src={data.image} width='50' rounded/>
            </div>

            <div className='p-2 pl-4 fs-6'>
                {data.pagetitle}
            </div>

            <div className='p-2 d-flex align-items-center'>
                Вес {data.weight} {data.weight_unit}
            </div>

            <div className='flex-fill d-flex align-items-center justify-content-end pr-2 fw-bolder'>
                Цена {data.price} <RawHTML>{data.currency_html_code}</RawHTML>
            </div>
        </div>
    </>
}

const CartSearchProducts = (props) => {
    const { 
        className,
        onInput
    } = props

    const form = useForm({
        onSubmit() {
            return false
        }
    });

    const timeout = 300;
    var timeoutId;

    const handleInput = () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(onInput, timeout)
    }

    return <>
        <Form 
            className={className}
            onSubmit={() => {}}
            onInput={handleInput}>
            <Row>
                <Col>
                    <Form.Group>
                        <Form.Control type='input' name='query' placeholder='Введите наименование товара'/>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    </>
}

export default App;