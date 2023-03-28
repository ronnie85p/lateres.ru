import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner, Image, Modal, ListGroup } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from '../../../../../src/js/components/Form';
import FakeTwoStepAuthMethods from '../fake/TwoStepAuthMethods';
import FakeTwoStepAuthQuestions from '../fake/TwoStepAuthQuestions';
import FakeLoginSessions from '../fake/LoginSessions';

const { useState, useEffect } = React

const items = [
    {
        id: 1,
        uri: '',
        title: 'Изменить пароль'
    },

    {
        id: 2,
        uri: '',
        title: 'Двухфакторная авторизация'
    },

    {
        id: 3,
        uri: '',
        title: 'История активности'
    },

    {
        id: 4,
        uri: '',
        title: 'Уведомления'
    },
];

const ghostStyles = {
    opacity: .5,
    pointerEvents: 'none'
}

const Settings = (props) => {
    const [currItem, setCurrItem] = useState(() => {
        return items[0]
    });

    const onItemClick = ({ item }) => {
        setCurrItem(item);
    };

    return <>
        <Row>
            <Col>
                <div className='bg-white rounded p-3 py-4'>
                    <Content item={currItem} />
                </div>
            </Col>
            <Col md={3}>
                <Menu activeItemId={currItem.id} onItemClick={onItemClick}/>
            </Col>
        </Row>
    </>
}

const Menu = (props) => {
    const {
        activeItemId,
        onItemClick
    } = props

    const handleItemClick = (event, item) => {
        event.preventDefault();

        if (onItemClick) {
            onItemClick({ event, item });
        }
    }

    return <>
        <ListGroup className='sticky-top offset-top-2'>
            {items.map(item =>{
                return <ListGroup.Item as='a' href='#' key={item.id}
                    active={item.id === activeItemId} 
                    onClick={(event) => handleItemClick(event, item)}>
                        {item.title}
                </ListGroup.Item>
            })}
        </ListGroup>
    </>
}

const Content = (props) => {
    const { item } = props;

    switch (item.id) {
        case 1:
            return <ChangePassword />

        case 2:
            return <TwoStepAuthorize />

        case 3:
            return <Sessions />

        case 4:
            return <Notifications />
    }

    return <></>
}

const ChangePassword = (props) => {
    const form = useForm({
        onSubmit() {
            return false;
        }
    });

    return <>
        <Form
            onSubmit={form.submit}
            onKeyDown={form.preventInputSubmit}
        >

            <Row>
                <Col md={8}>
                    <Form.Group as={Col} md={12} className='form-group'>
                        <label htmlFor='password'>Текущий пароль</label>
                        <Form.Control type='password' name='password' autoComplete='off'/>
                    </Form.Group>

                    <Form.Group as={Col} md={12} className='form-group'>
                        <label htmlFor='password_new'>Новый пароль</label>
                        <Form.Control type='password' name='password_new' autoComplete='off'/>
                    </Form.Group>

                    <Form.Group as={Col} md={12} className='form-group'>
                        <label htmlFor='password_again'>Повторить пароль</label>
                        <Form.Control type='password' name='password_again' autoComplete='off'/>
                    </Form.Group>

                    <Form.Group as={Col} md={12} className='form-group'>
                        <Button type='submit' variant='primary'>Сохранить</Button>
                    </Form.Group>
                </Col>

                <Col>
                    <p>Требования к паролю</p>
                    <p>От 8 символов</p>
                </Col>
            </Row>
        </Form>
    </>
}

const TwoStepAuthorize = (props) => {
    const [activate, setActivate] = useState(() => {
        return parseInt(props.twostepauth_activate || 0)
    });

    const form = useForm({
        onSubmit() {
            return false;
        }
    });

    return <>
        <Form
            onSubmit={form.submit}
            onKeyDown={form.preventInputSubmit}
        >

            <Row>
                <Form.Group as={Col} className='fs-6 mb-4'>
                    <Form.Check 
                        defaultChecked={activate}
                        onChange={() => setActivate(!activate)}
                        type='switch'
                        label='Активировать'
                        id='twostepauth-activate'
                        name='twostepauth_activate'
                    />
                </Form.Group>
            </Row>

            <div className='twostepauth-methods-wrapper' style={{ 
                minHeight: 170,
                ...(!activate ? ghostStyles : null)
            }}>
                <TwoStepAuthorizeMethods {...props} activate={activate}/>
            </div>

            <hr className='' />

            <Row>
                <Col className='text-center'>
                    <Button type='submit' variant='primary'>Сохранить</Button>
                </Col>
            </Row>

        </Form>
    </>
}

const TwoStepAuthorizeMethods = (props) => {
    const [twoStepAuthMethod, setTwoStepAuthMethod] = useState(() => {
        return props.twostepauth_method || 1
    });


    const {
        activate = 0,
        twoStepAuthMethods = FakeTwoStepAuthMethods
    } = props

    useEffect(() => {
        console.log('twoStepAuthMethod', twoStepAuthMethod)
    }, [twoStepAuthMethod])

    return <>
        <Row>
            <Form.Group as={Col} className='form-group'>
                {/* <Form.Select 
                    onChange={event => setTwoStepAuthMethod(parseInt(event.currentTarget.value))}
                    name='twostepauth_method'>
                    {twoStepAuthMethods.map(({ id, name }) => {
                        return <option
                                    key={id} 
                                    value={id}
                                    defaultValue={twoStepAuthMethod}>
                                        {name}
                                </option>
                    })}
                </Form.Select> */}

                {twoStepAuthMethods.map(({ id, name }) => {
                    return <Form.Check
                                inline
                                onChange={() => setTwoStepAuthMethod(parseInt(id))}
                                defaultChecked={twoStepAuthMethod === id}
                                key={id} 
                                label={name}
                                id={`twostepauth-method-${id}`}
                                name='twostepauth_method'
                                type='radio'
                            />
                })}
            </Form.Group>
        </Row>

        <TwoStepAuthorizeMethodOptions {...props} method={twoStepAuthMethod} activate={activate}/>
    </>
}

const TwoStepAuthorizeMethodOptions = (props) => {
    const { method } = props

    switch (method) {
        case 1:
            return <TwoStepAuthorizeMethodEmailOption {...props}/>

        case 2:
            return <TwoStepAuthorizeMethodQuestionOption {...props}/>
    }

    return <></>
}

const TwoStepAuthorizeMethodEmailOption = (props) => {
    const {
        email = '',
        activate 
    } = props

    return <>
        <Row>
            <Col>
                <a href='#'>Изменить емэйл</a>
            </Col>
        </Row>
    </>
}

const TwoStepAuthorizeMethodQuestionOption = (props) => {
    const { 
        activate, 
        question = 1, 
        answer,
        TwoStepAuthQuestions = FakeTwoStepAuthQuestions 
    } = props

    return <>
        <Row>
            <Form.Group as={Col} md={8} className='form-group'>
                <Form.Select name='twoauthstep_questions'>
                    {TwoStepAuthQuestions.map(({ id, text }) => {
                        return <option 
                                    key={id}
                                    value={id}
                                    defaultValue={question}>
                                        {text}
                                </option>
                    })}
                </Form.Select>
            </Form.Group>
        </Row>

        <Row>
            <Form.Group as={Col} md={8} className='form-group'>
                <Form.Control type='input' name='twoauthstep_answer' defaultValue={answer} />
            </Form.Group>
        </Row>
    </>
}

const Sessions = (props) => {
    const {
        sessions = FakeLoginSessions
    } = props

    const ActionView = ({ active }) => {
        if (active) {
            return <a href='#'>Завершить</a>
        }

        return 'Завершена'
    }

    const activesCount = sessions.reduce(
        (accumulator, session) => accumulator + (session.active ? 1 : 0), 
        0
    );

    const onTerminateSessions = (event) => {
        console.log('[onterminatesessions]');
    }

    return <>
        <Row className='fw-bolder'>
            <Col>Устройство</Col>
            <Col>IP</Col>
            {/* <Col>Местоположение</Col> */}
            <Col>Время входа</Col>
            <Col>Действие</Col>
        </Row>

        <hr className='mt-2 mb-4' />

        {sessions.map(({ id, device, ip, location, timestamp, active }) => {
            return <Row key={id} className={'mb-2' + (!active ? ' fst-italic' : '')} style={{
                ...(!active ? ghostStyles : null)
            }}>
                <Col className='text-truncate'>{device}</Col>
                <Col className='text-truncate'>{ip}</Col>
                {/* <Col>{location}</Col> */}
                <Col className='text-truncate'>{timestamp}</Col>
                <Col className='text-truncate'><ActionView active={active}/></Col>
            </Row>
        })}

        <hr className='mt-2x' />

        <Button 
            className='btn-sm' 
            variant='secondary' 
            disabled={activesCount < 2} 
            onClick={onTerminateSessions}>
                Завершить все сессии
        </Button>
    </>
}

const Notifications = (props) => {
    return <>Notifications</>
}

export default Settings;