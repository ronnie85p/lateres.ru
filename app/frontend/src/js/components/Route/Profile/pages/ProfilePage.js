import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner, Image } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from "../../../../../src/js/components/Form";

const { useState, useEffect } = React

const ProfilePage = (props) => {
    const data = {
        id: 1,
        fullname: 'Леонид Васильевич Пучков',
        dob: '04/27/1985',
        gender: 'Мужской',
        email: 'romagifted@gmail.com',
        mobilephone: '+79039950324',
        username: 'U2211135',
        createdon: '2022-11-13 13:38:32',
        type: {
            id: 2,
            name: 'Юридическое лицо'
        },
        contacts: {
            whatsapp: true,
            viber: true,
            telegram: true
        },
        passport: {
            gender: 0,
            date_of_birth: '04/27/1985',
            place_of_birth: 'Москва',
            sitizenship: 'РФ',
            seria: '12 04',
            num: '333333',
            date_issued: '01/01/2005',
            dep_issued: 'Московское ГРОВД'
        },
        company: {
            name: 'ООО Партнер',
            inn: 111111111,
            ogrn: 222222222222222,
            kpp: 333333333333,
            phone: '',
            address_country: 'Россия',
            address_region: 'Московская область',
            address_index: 111111,
            address_city: 'Москва',
            address_street: 'улица Троицкая',
            address_building: '14a',
            address_corpus: '5b',
            address_floor: 3,
            address_room: '',
            address_premise: ''
        }
    }

    return <>

        <div className='bg-white mb-2 p-5 rounded'>
            {/* <span className='text-muted'>ID: {data.username}</span> */}

            <Row>
                <Col md={2}>
                    <Image roundedCircle={true} src='http://www.dev.lateres.ru/assets/imgs/user/user-ava.jpg' className='circle'/>
                </Col>
                <Col className='d-flex align-items-center justify-content-start'>
                    <div>
                        <h4>{data.fullname}</h4>
                        <div className='text-muted'><Icon.CheckCircleFill /> {data.type.name}</div>
                        {/* <div className=''>
                            {data.company?.name}, 
                            {data.company?.inn}, 
                            {data.company?.ogrn}, 
                            {data.company?.kpp},
                            {data.company?.phone}
                        </div> */}

                        <Button className='btn-sm mt-2' variant='light' type='button'>Редактировать</Button>
                    </div>
                </Col>
            </Row>
        </div>

        <div className='bg-white mb-2 p-5 rounded'>
            <h5>Профиль <Icon.PencilSquare size={.8} color='silver' /></h5>
            <div className='mb-4'>
                <ProfileView data={data}/>
            </div>
        
            <h5>Паспорт <Icon.PencilFill size={.8} color='silver' /></h5>
            <div className='mb-4'>
                {data.passport ? <PassportView data={data}/> : <>
                    <div className='text-danger'><a href='#'>Заполнить данные</a></div>
                </>}
            </div>

            <h5>Контакты <Icon.PencilFill size={.8} color='silver' /></h5>
            <div className='mb-4x'>
                <ContactsView data={data}/>
            </div>
        </div>

        <div className='bg-white p-5 rounded'>
            <div className='text-muted'>Создан: {data.createdon}</div>
        </div>
    </>
}

const ProfileView = (props) => {
    const { data } = props

    return <>
        <PageRow
            LeftCol='Дата рождения'
            RightCol={data.dob ? data.dob : 'Не указана'}
        />

        {data.gender ? 
            <PageRow
                LeftCol='Пол'
                RightCol={data.gender}
            /> : <></>}

        <PageRow
            LeftCol='Обо мне'
            RightCol={data.comment ? data.comment : 'Напишите о себе'}
        />
    </>
}

const PassportView = (props) => {
    const { data } = props;

    return <>
        <PageRow
            LeftCol='Серия и номер'
            RightCol={data.passport?.seria +' '+ data.passport?.num}
        />

        <PageRow
            LeftCol='Кем выдан'
            RightCol={data.passport?.dep_issued}
        />

        <PageRow
            LeftCol='Дата выдачи'
            RightCol={data.passport?.date_issued}
        />

        <PageRow
            LeftCol='Место рождения'
            RightCol={data.passport?.place_of_birth}
        />

        <PageRow
            LeftCol='Гражданство'
            RightCol={data.passport?.sitizenship}
        />
    </>
};

const ContactsView = (props) => {
    const { data } = props

    return <>
        <PageRow
            LeftCol='Телефон'
            RightCol={() => {
                return data.mobilephone ? data.mobilephone : <>
                    <span className='text-muted'><a href=''>Не указан</a></span>
                </>
            }}
        />

        <PageRow
            LeftCol='E-mail'
            RightCol={data.email}
        />

        <PageRow
            LeftCol='Мессенджеры'
            RightCol={() => {
                return <>
                    {data.contacts?.whatsapp ? 'Whatsapp' : ''}
                    {data.contacts?.viber ? ', Viber' : ''}
                    {data.contacts?.telegram ? ', Telegram' : ''}
                </>
            }}
        />
    </>
}

const PageRow = (props) => {
    const { LeftCol, RightCol } = props;

    return <>
        <Row className='mb-2'>
            <Col className='' md={3}>
                {typeof LeftCol === 'function' ?  <LeftCol /> : LeftCol}
            </Col>
            <Col className='text-muted' md={9}>
                {typeof RightCol === 'function' ?  <RightCol /> : RightCol}
            </Col>
        </Row>
    </>
}

export default ProfilePage;