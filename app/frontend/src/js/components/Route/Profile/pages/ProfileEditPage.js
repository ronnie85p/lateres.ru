import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner, Image, ListGroup } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from "../../../../../src/js/components/Form";
import ProfileForm from './edit/ProfileForm';
import PassportForm from './edit/PassportForm';
import ContactsForm from './edit/ContactsForm';
import CompanyForm from './edit/CompanyForm';

const { useState, useEffect, createRef } = React

const ProfileEditPage = (props) => {
    const [ activeLink, setActiveLink ] = useState({});

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
    };

    const onItemClick = (event, link) => {
        event.preventDefault();

        setActiveLink(link);
    }

    return <>
        <div className='bg-white mb-2 p-5 rounded'>
            <Row>
                <Col md={8}>
                    <ActiveForm data={data} link={activeLink}/>
                </Col>

                <Col>
                    <MenuLinks {...props} activeLink={activeLink} onItemClick={onItemClick}/>
                </Col>
            </Row>
        </div>
    </>
}

const ActiveForm = (props) => {
    const { data, link } = props

    switch (link.name) {
        case 'Profile':
            return <ProfileForm {...props}/>

        case 'Passport':
            return <PassportForm {...props}/>
        
        case 'Contacts':
            return <ContactsForm {...props}/>

        case 'Company':
            return <CompanyForm {...props}/>
    }

    return <>Выберите из меню справа</>
}

const MenuLinks = (props) => {
    const { onItemClick, activeLink } = props;
    const links = [
        {
            id: 1,
            name: 'Profile',
            label: 'Профиль',
            url: '',
        },
        {
            id: 2,
            name: 'Passport',
            label: 'Паспорт',
            url: '',
        },
        {
            id: 3,
            name: 'Contacts',
            label: 'Контакты',
            url: '',
        },
        {
            id: 4,
            name: 'Company',
            label: 'Организация',
            url: '',
        },
    ];

    return <>
        <ListGroup className='sticky-top offset-top-2'>
            {links.map(link =>{
                return <ListGroup.Item as='a' href='#' active={link.id === activeLink.id} key={link.id} onClick={(event) => onItemClick(event, link)}>
                    {link.label}
                </ListGroup.Item>
            })}
        </ListGroup>
    </>
}

export default ProfileEditPage;