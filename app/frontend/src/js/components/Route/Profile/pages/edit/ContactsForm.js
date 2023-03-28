import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner, Image, ListGroup } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from '../../../../../../src/js/components/Form';
import { Loading as AppLoading, Timer as AppTimer } from '../../../../../../src/js/components/App';

const { useState, useEffect, createRef } = React

const ContactsForm = (props) => {
    const { data } = props;

    const messengers = [
        {
            id: 1,
            name: 'whatsapp',
            label: 'WhatsApp'
        },

        {
            id: 2,
            name: 'viber',
            label: 'Viber'
        },

        {
            id: 3,
            name: 'telegram',
            label: 'Telegram'
        },
    ]

    return <>
        <Form>

            <div className='h5'>Телефоны</div>
            <PhoneFields messengers={messengers} {...props}/>

            <div className='h5 mt-2x'>Мессенджеры</div>
            <Row >
                <Col>
                    {messengers.map(msgr => {
                        return <Form.Check 
                            inline
                            key={msgr.id}
                            id={`msgr-${msgr.id}`}
                            type='checkbox'
                            label={msgr.label}
                        />
                    })}
                </Col>
            </Row>

            <div className='h5 mt-2x'>Email</div>
            <EmailField {...props}/>

            <hr className='' />

            <Row>
                <Col className='text-center'>
                    <Button variant='primary' type='submit'>Сохранить</Button>
                </Col>
            </Row>

        </Form>
    </>
}

const PhoneFields = (props) => {
    const [addPhoneFieldShown, setAddPhoneFieldShown] = useState(false);
    const phoneRef = createRef('');

    const { data, messengers } = props

    const phones = [
        {
            id: data.mobilephone,
            text: data.mobilephone,
            messengers: []
        },
        {
            id: '+79944567843',
            text: '+7 (994) 456 78-43',
            messengers: [
                messengers[0],
                messengers[2],
            ]
        }
    ];

    const removePhone = (event, id) => {
        console.log('[phone] remove: ', id);


    }

    const addPhone = (event) => {
        console.log('[phone] add: ', phoneRef.current?.value);


    }

    return <>
        {phones.map(phone => {
            const byDefault = phone.id === data.mobilephone;

            return <div className='mb-4' key={phone.id}>
                <Row className='mb-1'>
                    <Col md={4}>
                        <div className={'form-control' + (byDefault ? ' is-valid' : '')}>{phone.text}</div>
                    </Col>
                    <Col className='d-flex align-items-center'>
                        {!byDefault ? 
                            <Button variant='light' onClick={(event) => removePhone(event, phone.id)}>
                                {/* <Icon.Trash size={'1.2em'} /> */}
                                <Icon.Trash /> Удалить
                            </Button>
                        : <></>}
                    </Col>
                </Row>

                {byDefault ? 
                    <Form.Text className='text-warning'>По умолчанию</Form.Text>
                : <></>}

            </div>
        })}

        <div className='mb-4'>
            {addPhoneFieldShown ? <>

                <Row>
                    <Col md={4}>
                        <Form.Control name='phone' placeholder='+7 (___) __ ____' autoFocus autoComplete='off' ref={phoneRef} />
                    </Col>
                    <Col>
                        <Button variant='light' onClick={addPhone}>Сохранить</Button>
                    </Col>
                </Row>

            </> : <>
                <Row>
                    <Col>
                        <Button variant='light' onClick={() => setAddPhoneFieldShown(true)}>
                            <Icon.Plus size={'1.2em'} /> Добавить
                        </Button>
                    </Col>
                </Row>
            </> }
        </div>
    </>
};

const EmailField = (props) => {
    const [isCodeSending, setIsCodeSending] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);

    const { data } = props

    const sendCode = (event) => {
        console.log('[email] send code: ', data.email);

        setIsCodeSending(true);
        setIsFieldsDisabled(true);

        setTimeout(() => {
            setIsCodeSending(false);
            setIsCodeSent(true)
        }, 3000)
    }

    return <>
        <Row >
            <Form.Group as={Col} md={6}>
                <Form.Control name='email' defaultValue={data.email} disabled={isFieldsDisabled} />
            </Form.Group>

            <Form.Group as={Col} className='d-flex align-items-center'>
                {isCodeSent ? <>
                    <AppTimer
                        startTime={30}
                        onTimeout={({ timer }) => {
                            setIsFieldsDisabled(false);
                        }}
                    >
                        {({ timer }) => {
                            return <>
                                Отправить через {timer}сек.
                            </>
                        }}
                    </AppTimer>
                </> : <>
                    <Button
                        variant='light' 
                        disabled={isCodeSending}
                        onClick={sendCode}
                    >
                        <AppLoading 
                            active={isCodeSending}
                            text={'Отправляем код...'}
                            altText={'Отправить код'}
                        />
                    </Button>
                </>}
            </Form.Group>
        </Row>

        {isCodeSent ?
            <EmailCodeField className='mt-2'/>
        : <></>}
    </>
}

const EmailCodeField = (props) => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const codeRef = createRef('');

    const {} = props
 
    const submit = (event) => {
        console.log('[email] submit code: ', codeRef?.current?.value);

        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
        }, 3000);
    }

    return <>
        <Row className='mt-2'>
            <Form.Group as={Col} md={4}>
                <Form.Control className='text-center' type='input' maxLength={6} placeholder='Ваш код' ref={codeRef} disabled={isSubmitting}/>
            </Form.Group>

            <Form.Group as={Col}>
                <Button
                    variant='light' 
                    disabled={isSubmitting}
                    onClick={submit}
                >
                    Подтвердить
                </Button>
            </Form.Group>
        </Row>
    </>
}

export default ContactsForm;