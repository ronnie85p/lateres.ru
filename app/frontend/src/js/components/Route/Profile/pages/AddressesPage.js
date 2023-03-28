import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner, Image } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from "../../../../../src/js/components/Form";

const { useEffect, useState } = React;

const AddressesPage = (props) => {
    const {} = props

    return <>
        <TopPanel className='mb-4' />
        <AddressList {...props}/>
    </>
}

const TopPanel = (props) => {
    const {} = props



    return <>
        <Row {...props}>
            <Col>
                <Button
                    variant='secondary'
                    href="address/create"
                >
                    <Icon.Plus /> Добавить адрес
                </Button>
            </Col>
        </Row>
    </>
}

const AddressList = (props) => {
    const {} = props

    const list = [
        {  
            id: 1,
            rank: 0,
            title: 'My address',
            text: 'Россия, Московская область, Москва, улица Троицкая, 3а',
            country: 'Россия',
            region: 'Московская область',
            city: 'Москва',
            street: 'улица Троицкая',
            buiding: '3а',
            corpus: '',
            floor: '',
            room: '',
            premise: '',
            comment: `Nec cum magna netus commodo suspendisse tincidunt praesent tristique hendrerit sodales. 
                Ante urna et posuere parturient primis eleifend vivamus interdum.`
        },

        {
            id: 2,
            rank: 1,
            title: 'My address 2',
            text: 'Россия, Московская область, город Солнечногорск, улица Баранова, 16',
            country: 'Россия',
            region: 'Московская область',
            city: 'город Солнечногорск',
            street: 'улица Баранова',
            buiding: '16',
            corpus: '',
            floor: '',
            room: '',
            premise: '',
            comment: `Lectus Rhoncus. Id Et eu semper mi turpis quam facilisis enim nam.
                Torquent aptent hendrerit lobortis arcu tristique Quam euismod.`
        },

        {
            id: 3,
            rank: 2,
            title: 'My address 3',
            text: 'Россия, Кемеровская область, Новокузнецк, улица Металлургов, 12',
            country: 'Россия',
            region: 'Кемеровская область',
            city: 'город Новокузнецк',
            street: 'улица Металлургов',
            buiding: '12',
            corpus: '',
            floor: '',
            room: '',
            premise: '',
            comment: `Non dolor ipsum. Ultrices lobortis euismod nascetur. Blandit commodo posuere ullamcorper.
                Duis phasellus. Dignissim congue ullamcorper sociis lobortis. Hac arcu.`
        }
    ]

    return <>
        <Row>
            {list.map(item => {
                return <Col md={4} className='mb-2' key={item.id}>
                    <div className='bg-white rounded'>

                        <div className='p-3'>
                            <h5 className='text-truncate'>{item.title}</h5>

                            <p style={{ minHeight: '40px', overflow: 'hidden'}}>
                                <Icon.GeoAltFill /> {item.text}
                            </p>

                            <div className='text-truncate font-italic text-muted' style={{height: '20px'}}>{item.comment}</div>
                        </div>

                        <hr className='m-0' />

                        <div className='p-3 d-flex'>
                            {item.rank === 0 ? 
                                <span className='text-warning'>По умолчанию</span>
                            : <>
                                <a className='flex-fill' href='#'>Сделать по умолчанию</a>
                            </>}

                            <a className='flex-fill text-end' href='#'>Удалить</a>
                        </div>
                    </div>
                </Col>
            })}
        </Row>
    </>
}

export default AddressesPage;