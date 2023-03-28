import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from "../../../../../src/js/components/Form";

const { useState, useEffect } = React

const PasswordForgotPage = (props) => {
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

        setIsValid(form.checkValidity());
    }

    return <>
        <Row>
            <Col className='m-auto' md='4'>
                <div className='h4'>Восстановление доступа</div>

                <Card className='shadow-sm border-0'>
                    <Card.Body>

                        <p>
                            На Вашу почту будет отправлена инструкция по восстановлению доступа
                        </p>

                        <Form 
                            noValidate
                            // validate={}
                            onSubmit={_form.submit} 
                            onChange={_form.changeValue} 
                            onInput={onInput}
                            onKeyDown={_form.preventInputSubmit}>

                                <Form.Group>
                                    <Form.Floating>
                                        <Form.Control type='input' name='username' id='usename' placeholder='ID / Емэйл' required/>
                                        <label htmlFor="username">ID / Емэйл</label>
                                    </Form.Floating>
                                </Form.Group>    

                                <Row>
                                    <Col className='text-center' md={12}>
                                        <Button 
                                            disabled={_form.isSubmitting || !isValid}
                                            className='btn-block btn-lg' 
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

                                                Отправляем...
                                            </>
                                            : <>
                                                Отправить
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

export default PasswordForgotPage;