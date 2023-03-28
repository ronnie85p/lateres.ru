import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from "../../../../../src/js/components/Form";

const { useState, useEffect } = React

const SignInConfirmPage = (props) => {
    const type = 'code';

    return <>
        <Row>
            <Col className='m-auto' md='4'>
                <div className='h4 text-center'>Подтверждение входа</div>

                <Card className='shadow-sm border-0'>
                    <Card.Body>
                        <ConfirmView type={type} {...props}/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </>
}

const ConfirmView = (props) => {

    switch (props.type) {
        case 'code':
            return <InputSecCodeView />;

        case 'question':
            return <AnswerQuestionView />
    }

}

const AnswerQuestionView = (props) => {
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
        <Form 
            noValidate
            // validate={}
            onSubmit={_form.submit} 
            onChange={_form.changeValue} 
            onKeyDown={_form.preventInputSubmit}>

                <Row>
                    <Form.Group className='form-group' as={Col} md={12}>
                        <Form.Select name='question'>
                            <option value=''>Выберите вопрос</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className='form-group' as={Col} md={12}>
                        <Form.Control type='input' placeholder='Ваш ответ' />
                    </Form.Group>
                </Row>

                <Row className='mt-4'>
                    <Col className='text-center' md={12}>

                        <Button 
                            disabled={_form.isSubmitting}
                            className='btn-md' 
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

                                    Авторизуемся...
                                </> : <>
                                    Авторизоваться
                                </>}
                        </Button>

                    </Col>
                </Row>
        </Form>
    </>
}

const InputSecCodeView = (props) => {
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
        <Form 
            noValidate
            // validate={}
            onSubmit={_form.submit} 
            onChange={_form.changeValue} 
            onKeyDown={_form.preventInputSubmit}>

                <Row>
                    <Form.Group className='form-group m-auto' as={Col} md={6}>
                        <label className='text-center d-block' htmlFor='code'>Ваш код</label>
                        <Form.Control className='text-center' type='input' name='code' maxLength='6' placeholder='' required autoFocus />
                        <WaitForSendCodeAgain upTime={30} />
                    </Form.Group>
                </Row>

                <Row className='mt-4'>
                    <Col className='text-center' md={12}>

                        <Button 
                            disabled={_form.isSubmitting}
                            className='btn-md' 
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

                                    Авторизуемся...
                                </> : <>
                                    Авторизоваться
                                </>}
                        </Button>

                    </Col>
                </Row>
        </Form>
    </>
}

const WaitForSendCodeAgain = (props) => {
    const [downTimer, setDownTimer] = useState(() => {
        return props.upTime
    });

    const sendCode = (event) => {
        event.preventDefault();
    }

    useEffect(() => {
        if (downTimer > 0) {
            setTimeout(() => {
                setDownTimer(downTimer - 1);
            }, 1000);
        }
    }, [downTimer]);

    return <>
        {downTimer > 0 ? <>
            <Form.Text muted>Отправить код через {downTimer} сек.</Form.Text>
        </> : <>
            <div className='text-center'><a className='text-muted' href='#' onClick={sendCode}><Icon.ArrowClockwise />Отправить код</a></div>
        </>}
    </>
};

export default SignInConfirmPage;