import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, ToggleButton, Image, ListGroup, DropdownButton, Dropdown } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import FakeDeliveries from '../../../../../src/js/fake/Deliveries'
import FakeDeliveryCars from '../../../../../src/js/fake/DeliveryCars'
import FakeAddresses from '../../../../../src/js/fake/Addresses'

import { Modal, useModal } from '../../../../../src/js/components/Modal'
import { YaMap, useYaMaps } from '../../../../../src/js/components/YaMaps'

import { Section, OrderComment, OrderRecipient } from '../components'
import DeliveryPayments from './Payments'
import DeliveryTime from './Time'
import RawHTML from '../../../../../src/js/components/RawHTML'

const { useEffect, useContext, useState, createContext } = React;

const DeliveryCompany = (props) => {
    const {
        delivery_id,
        work_times,
        address,
        delivery_car
    } = props

    const delivery = FakeDeliveries[delivery_id];

    return <>
        <Section>
            <div>{delivery.description}</div>
            <hr className='' />

            <DeliveryAddress {...address}/>
            <DeliveryCar {...delivery_car}/>
            <DeliveryCalculate {...props}/>

            <hr className='' />

            <DeliveryTime 
                label={'Дата и время доставки'}
                work_times={work_times}
            />
        </Section>

        <OrderRecipient title='Получатель' {...props}/>
        <BuisnessProposal />

        <OrderComment title='Комментарий' {...props}/>

        <div className='mb-2x'></div>
        
        <DeliveryPayments title='Способ оплаты' {...props}/>
    </>
}

const BuisnessProposal = (props) => {

    const modal = useModal({
        titleText: 'Получить коммерческое предложение',
        Body: () => {
            return <>
            </>
        }
    });

    const handlePrint = (event) => {
        console.log('[BuisnessProposal][handlePrint]');
    }

    const handleEmail = (event) => {
        console.log('[BuisnessProposal][handleEmail]');
    }

    return <>
        <Modal use={modal} />
        <Row className='mt-2'>
            <Col className='text-end'>
                <DropdownButton as={ButtonGroup} variant='danger' title="Коммерческое предложение" id="buisness-proposal-dropdown">
                    <Dropdown.Item eventKey="1" onClick={handlePrint}><Icon.Printer /> Распечатать</Dropdown.Item>
                    <Dropdown.Item eventKey="2" onClick={handleEmail}><Icon.Envelope /> Отправить на почту</Dropdown.Item>
                </DropdownButton>
            </Col>
        </Row>
    </>
}

const DeliveryAddress = ({ text, comment }) => {
    // const yaMaps = useYaMaps({

    // });

    const modal = useModal({
        titleText: 'Адрес доставки',
        modalProps: {
            animation: false,
            fullscreen: true,
            scrollable: false,
        },
        bodyProps: {
            className: 'p-0 overflow-hidden'
        },
        Body: () => {
            return <>
                <Row className='m-0' style={{ height: '100%' }}>
                    <Col className='py-3' md={2} style={{ backgroundColor: 'rgb(0 0 0 / 79%)', color: '#b8b8b8'}}>
                        <UserAddresses />
                    </Col>
                    <Col className='position-relative'>
                        <div className='' style={{ position: 'absolute', top: 1, bottom: 1, right: 1, left: 1}}>
                            <YaMap 
                                geolocationEnabled={true}
                                mapOptions={{

                                }}

                                points={[]}
                            />
                        </div>
                    </Col>
                </Row>
            </>
        }
    });

    const Comment = () => {
        return <>
            <div className='text-muted fst-italic'>{comment}</div>
        </>
    }

    const handleChangeClick = (event) => {
        event.preventDefault();

        modal.show();
    }

    return <>
        <Modal use={modal} />

        <Row>
            <Col>
                <Form.Group className='form-group'>
                    <label>Адрес доставки</label>
                    <div>{text}</div>
                </Form.Group>
            </Col>
            <Col className='text-end' md={2}>
                <a href='#' onClick={handleChangeClick}>Изменить</a>
            </Col>
        </Row>

        {comment ? <Comment /> : <></>}
    </>
}

const UserAddresses = (props) => {
    const [itemActiveId, setItemActiveId] = useState(1);
    const [currentPage, setCurrentPage] = useState({
        type: 'list'
    });

    const handleAddressClick = (event, id, item) => {
        event.preventDefault();

        setItemActiveId(id);
        setCurrentPage({
            type: 'info',
            address: item
        });
    }

    const handleNavigate = (event, type) => {
        event.preventDefault();

        setCurrentPage({ type });
    }

    const AddressesListPage = () => {
        return <>
            <div className='fs-5 mb-4'>Мои адреса</div>

            <AddressesList />
        </>
    }

    const AddressInfoPage = () => {
        const { address } = currentPage;
        return <>
            <div 
                className='fs-6 mb-4 p-2 rounded border'
                onClick={event => handleNavigate(event, 'list')}
                style={{ cursor: 'pointer' }}>
                    <Icon.ChevronLeft /> Мои адреса
            </div>

            <div className='fw-bolder mb-1'>{address.title}</div>
            <div className='mb-3'>{address.text}</div>

            {address.comment ? <>
                <div className='mb-1'>Дополнительные инструкции:</div>
                <div className=''>{address.comment}</div>
            </> : <></>}
        </>
    }

    const AddressesList = () => {
        return <>
            <ul className='list-unstyled' style={{ overflowY: 'auto' }}>
                {FakeAddresses.map(addr => 
                    <AddressesListItem key={addr.id} {...addr}/>)}                
            </ul>
        </>
    }

    const AddressesListItem = (props) => {
        const { id, title, text, comment } = props

        return <>
            <li className='mb-1' style={{ padding: 10, cursor: 'pointer', ...(id === itemActiveId ? {backgroundColor: '#5b5b5b'} : null) }}
                onMouseOver={event => {
                    event.currentTarget.style.backgroundColor = '#5b5b5b'
                }}
                onMouseOut={event => {
                    if (id !== itemActiveId) {
                        event.currentTarget.style.backgroundColor = ''
                    }
                }}
                onClick={event => handleAddressClick(event, id, props)}>
                    <div className='mb-1 fw-bolder'>{title}</div>
                    <div className='mb-1'>{text}</div> 
                    <div className='overflow-hidden text-truncate'>{comment}</div>
            </li>
        </>
    }

    switch (currentPage.type) {
        case 'list':
            return <AddressesListPage />
        
        case 'info':
            return <AddressInfoPage />
    }

    return <></>
}

const DeliveryCar = ({ 
    id, 
    name, 
    description, 
    image, 
    weight, 
    length 
}) => {
    const modal = useModal({
        titleText: 'Выберите транспорт',
        modalProps: {
            animation: false
        },
        Body: () => {
            return <>
                <DeliveryCarsList />

                <div className='mt-2x text-muted' style={{ fontSize: '.8em' }}>
                    W - Грузоподьемность <RawHTML>&bull;</RawHTML> L - Длина борта
                </div>
            </>
        }
    });

    const handleCarChoosen = (event) => {

    }

    const DeliveryCarsList = () => {
        return FakeDeliveryCars.map(car => {
            return <DeliveryCarsListItem key={car.id} {...car}/>
        })
    }

    const DeliveryCarsListItem = ({ name, image, description, weight, length }) => {
        return <>
            <div className='rounded p-2' style={{ cursor: 'pointer' }} 
                onMouseOver={event => {
                    event.currentTarget.classList.add('bg-light')
                }}
                onMouseOut={event => {
                    event.currentTarget.classList.remove('bg-light')
                }}
                onClick={handleCarChoosen}
            >
                <Row className='py-3'>
                    <Col md={4}>
                        <Image src={image} />
                    </Col>
                    <Col>
                        <div className='fs-6'>{name}</div>
                        <div className='text-muted'>{description}</div>
                        <div className='mt-2'>W {weight} кг <RawHTML>&bull;</RawHTML> L {length} м</div>
                    </Col>
                </Row>
            </div>
        </>
    }

    const handleClick = (event) => {
        modal.show();

    }

    const DeliveryCarsModal = () => {
        return <Modal use={modal} />
    }

    if (!id) {
        return <>
            <DeliveryCarsModal />
            <DeliveryCarChooseBtn onClick={handleClick} />
        </>
    }

    return <>
        <DeliveryCarsModal />
        <Form.Group className='form-group mt-4' onClick={handleClick}>
            <label className='fs-5'>Транспорт</label>

            <Row className='mt-3'>
                <Col className='mr-4' md={2}>
                    <Image src={image} />
                </Col>
                <Col>
                    <div className='fs-6 mb-2'>{name}</div>
                    <div className='text-muted'>{description}</div>
                </Col>
                <Col>
                    <div className='rounded border border-secondary p-2'>
                        <div className='mb-2'>Грузоподьемность до {weight} кг</div>
                        <div>Длина борта {length}</div>
                    </div>
                </Col>
            </Row>
        </Form.Group>
    </>
}

const DeliveryCarChooseBtn = ({ onClick }) => {
    return <>
        <Button className='mt-2x' variant='light' onClick={onClick}>
            <Icon.Truck /> Выбрать транспорт
        </Button>
    </>
}

const DeliveryCalculate = ({ delivery_cars, delivery_distance }) => {
    return <>
        <Row>
            <Col>
                <div>До <a href='#'>пункта отгрузки</a> {delivery_distance} км</div>
                <div>Рейсов {delivery_cars}</div>
            </Col>
        </Row>
    </>
}

export default DeliveryCompany;