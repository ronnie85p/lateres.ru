import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from "../../../../../src/js/components/Form";

const SignInPage = (props) => {
    const _form = useForm({
        action: 'auth/signin',
        defaultValues: {

        },

        onSubmit({ data, form, event }) {
        
            console.log('[SignInPage] submit', data);

            _form.setIsSubmitting(true);

            setTimeout(() => {
                _form.setIsSubmitting(false)
            }, 3000);

            // if (form.checkValidity() === false) {
            //     console.log('not valid')
            //     event.preventDefault();
            //     event.stopPropagation();
            // }

            return false;
        }
    });

    return <>
        <Row>
            <Col className='m-auto' md='4'>
                <div className='h4'>Авторизация</div>

                <Card className='shadow-sm border-0'>
                    <Card.Body>
                        <Form 
                            noValidate
                            // validate={}
                            onSubmit={_form.submit} 
                            onChange={_form.changeValue} 
                            onKeyDown={_form.preventInputSubmit}>
                                <Form.Floating className='form-group'>
                                    <Form.Control type='input' name='username' id='usename' placeholder='ID / Емэйл' required/>
                                    <label htmlFor="username">ID / Емэйл</label>
                                </Form.Floating>

                                <Form.Floating className='form-group'>
                                    <Form.Control type='password' name='password' id='password' placeholder='Пароль' required/>
                                    <label htmlFor="password">Пароль</label>
                                </Form.Floating>

                                <Row>
                                    <Col md='6'>
                                        <Form.Check 
                                            type='checkbox'
                                            name='rememberme'
                                            label='Запомнить меня'
                                            id='login-rememberme'
                                        />
                                    </Col>

                                    <Col className='text-end' md='6'>
                                        <a href="#">Забыли пароль?</a>
                                    </Col>
                                </Row>

                                <Button 
                                    disabled={_form.isSubmitting}
                                    className='btn-block btn-lg mt-4' 
                                    type='submit' 
                                    variant='primary'>
                                    {_form.isSubmitting ? <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />

                                        <span className="visually-hidden">Loading...</span>

                                        Выполняется вход...
                                    </>
                                    : <>
                                        Войти
                                    </>}
                                </Button>
                        </Form>

                        <hr className='my-3' />

                        <Row className=''>
                            <Col className='text-end' md='12'>
                                <a href="#">Регистрация</a>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
}

export default SignInPage;