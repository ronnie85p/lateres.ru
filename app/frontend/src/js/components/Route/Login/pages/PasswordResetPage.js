import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from "../../../../../src/js/components/Form";

const { useState, useEffect } = React

const PasswordResetPage = (props) => {
    const [isValid, setIsValid] = useState(false);

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

    const onInput = (event) => {
        const form = event.currentTarget;

        setIsValid(
            form.checkValidity() && form.password.value === form.password_again.value
        );
    }

    return <>
        <Row>
            <Col className='m-auto' md='4'>
                <div className='h4'>Сброс пароля</div>

                <Card className='shadow-sm border-0'>
                    <Card.Body>

                        <Form 
                            noValidate
                            // validate={}
                            onSubmit={_form.submit} 
                            onChange={_form.changeValue} 
                            onInput={onInput}
                            onKeyDown={_form.preventInputSubmit}>

                                <Form.Group className='form-group'>
                                    <label htmlFor="password">Новый пароль</label>
                                    <Form.Control type='password' name='password' id='password' placeholder='' required/>
                                </Form.Group>

                                <Form.Group className='form-group'>
                                    <label htmlFor="password">Повторите пароль</label>
                                    <Form.Control type='password' name='password_again' id='password-again' placeholder='' required/>
                                </Form.Group>

                                <Row>
                                    <Col className='text-center' md={12}>
                                        <Button 
                                            disabled={_form.isSubmitting || !isValid}
                                            className='btn-block' 
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

                                                Сохраняем...
                                            </>
                                            : <>
                                                Сохранить
                                            </>}
                                        </Button>
                                    </Col>
                                </Row>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
}

export default PasswordResetPage;