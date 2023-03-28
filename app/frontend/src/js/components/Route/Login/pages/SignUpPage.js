import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from "../../../../../src/js/components/Form";

const { useState } = React;

const SignUpPage = (props) => {
    const [isUserCompany, setIsUserCompany] = useState(false);
    const [isCheckAgreed, setIsCheckAgreed] = useState(false);
    const [isGenPassword, setIsGenPassword] = useState(true);

    const _form = useForm({
        action: 'auth/signup',
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
            <Col className='m-auto' md='5'>
                <div className='h4'>Регистрация</div>

                <Card className='shadow-sm border-0'>
                    <Card.Body>
                        <Form 
                            noValidate
                            // validate={}
                            onSubmit={_form.submit} 
                            onChange={_form.changeValue} 
                            onKeyDown={_form.preventInputSubmit}>

                                <Row>
                                    <Form.Group className='form-group' as={Col} md={12}>
                                        <label htmlFor='lastname'>Фамилия<span className='text-danger'>*</span></label>
                                        <Form.Control type='input' name='lastname' placeholder='' required />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className='form-group' as={Col} md={5}>
                                        <label htmlFor='firstname'>Имя<span className='text-danger'>*</span></label>
                                        <Form.Control type='input' name='firstname' placeholder='' required />
                                    </Form.Group>

                                    <Form.Group className='form-group' as={Col} md={7}>
                                        <label htmlFor='midname'>Отчество<span className='text-danger'>*</span></label>
                                        <Form.Control type='input' name='midname' placeholder='' required />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group className='form-group' as={Col} md={7}>
                                        <label htmlFor='email'>Емэйл<span className='text-danger'>*</span></label>
                                        <Form.Control type='email' name='email' placeholder='' required />
                                    </Form.Group>

                                    <Form.Group className='form-group' as={Col} md={5}>
                                        <label htmlFor='mobilephone'>Телефон</label>
                                        <Form.Control type='input' name='mobilephone' placeholder='+7 (___) ___ ____' />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Check 
                                            checked={isUserCompany}
                                            type="switch"
                                            id="account-type"
                                            label="Юридическое лицо"
                                            onChange={() => setIsUserCompany(!isUserCompany)}
                                        />
                                    </Form.Group>
                                </Row>

                                {isUserCompany ? <UserCompanyFields /> : <></>}

                                <hr className='mb-4' />   
                                {!isGenPassword ? <PasswordFields /> : <></>}

                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Check 
                                            checked={isGenPassword}
                                            type="checkbox"
                                            name='gen_password'
                                            id="gen-password"
                                            label='Сгенеровать пароль'
                                            onChange={() => setIsGenPassword(!isGenPassword)}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row>
                                    <Form.Group as={Col}>
                                        <Form.Check 
                                            checked={isCheckAgreed}
                                            type="checkbox"
                                            name='agreed'
                                            id="agreed"
                                            label={<UserAgreementLabel />}
                                            onChange={() => setIsCheckAgreed(!isCheckAgreed)}
                                        />
                                    </Form.Group>
                                </Row>

                                <hr className='' />       
                                <Row className='mt-4'>
                                    <Col className='text-center' md={12}>
                                        <Button 
                                            disabled={_form.isSubmitting || !isCheckAgreed}
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

                                                Регистрируем...
                                            </>
                                            : <>
                                                Зарегистрироваться
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

const PasswordFields = (props) => {
    return <>
        <Row>
            <Form.Group className='form-group' as={Col} md={6}>
                <label htmlFor='password'>Пароль<span className='text-danger'>*</span></label>
                <Form.Control type='password' name='password' placeholder='' autoComplete='off' autoFocus required/>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={6}>
                <label htmlFor='password_again'>Повторите пароль<span className='text-danger'>*</span></label>
                <Form.Control type='password' name='password_again' placeholder='' autoComplete='off' required/>
            </Form.Group>
        </Row>
    </>
}

const UserAgreementLabel = (props) => {
    return <>
        <span>Я согласен с условиями <a href='/user-agreement' target='_blanc'><Icon.BoxArrowUpRight /> Пользовательского Соглашения</a></span>
    </>
}

const UserCompanyFields = (props) => {
    const [isAddressChecked, setIsAddressChecked] = useState(false);

    return <>
        <Row className='mt-4'>
            <Form.Group className='form-group' as={Col} md={12}>
                <label htmlFor='company_name'>Полное название<span className='text-danger'>*</span></label>
                <Form.Control type='input' name='company_name' placeholder='' required/>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={6}>
                <label htmlFor='company_inn'>ИНН<span className='text-danger'>*</span></label>
                <Form.Control type='input' name='company_inn' placeholder='' min={0} maxLength={10} required/>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={6}>
                <label htmlFor='company_kpp'>КПП<span className='text-danger'>*</span></label>
                <Form.Control type='input' name='company_kpp' placeholder='' min={0} maxLength={9} required/>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={7}>
                <label htmlFor='company_ogrn'>ОГРН (ИП)<span className='text-danger'>*</span></label>
                <Form.Control type='input' name='company_ogrn' placeholder='' min={0} maxLength={15} required/>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={5}>
                <label htmlFor='company_phone'>Телефон<span className='text-danger'>*</span></label>
                <Form.Control type='input' name='company_phone' placeholder='+7 (___) ___ ____' />
            </Form.Group>
        </Row>

        <Row className='mt-4'>
            <Col md={12}>
                <Form.Check 
                    type="checkbox"
                    id="use-company-address"
                    label="Заполнить адрес"
                    onChange={() => setIsAddressChecked(!isAddressChecked)}
                /> 
            </Col>
        </Row>

        {isAddressChecked ? <> 
            <hr className='mb-4' />

            <UserCompanyAddressFields /> 
        </> : <></>}
    </>
}

const UserCompanyAddressFields = (props) => {
    return <>
        <Row>
            <Form.Group className='form-group' as={Col} md={8}>
                <label htmlFor='company_address_country'>Страна<span className='text-danger'>*</span></label>
                <Form.Select name='company_address_country' required>
                    <option value=''>-- Не выбрана</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={4}>
                <label htmlFor='company_address_index'>Индекс<span className='text-danger'>*</span></label>
                <Form.Control type='input' name='company_address_index' maxLength={6} placeholder='' required/>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={12}>
                <label htmlFor='company_address_region'>Область<span className='text-danger'>*</span></label>
                <Form.Control type='input' name='company_address_region' placeholder='Например: Московская область' required/>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={12}>
                <label htmlFor='company_address_city'>Город<span className='text-danger'>*</span></label>
                <Form.Control type='input' name='company_address_city' placeholder="Например: г. Солнечногорск" required/>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={9}>
                <label htmlFor='company_address_street'>Улица<span className='text-danger'>*</span></label>
                <Form.Control type='input' name='company_address_street' placeholder="Например: ул. Разина" required/>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={3}>
                <label htmlFor='company_address_building'>Строение<span className='text-danger'>*</span></label>
                <Form.Control type='input' name='company_address_building' placeholder='' required/>
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={3}>
                <label htmlFor='company_address_corpus'>Корпус</label>
                <Form.Control type='input' name='company_address_corpus' placeholder='' />
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={3}>
                <label htmlFor='company_address_floor'>Этаж</label>
                <Form.Control type='number' name='company_address_floor' min={0} placeholder="" />
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={3}>
                <label htmlFor='company_address_floor'>Помещение</label>
                <Form.Control type='input' name='company_address_premise' placeholder='' />
            </Form.Group>

            <Form.Group className='form-group' as={Col} md={3}>
                <label htmlFor='company_address_room'>Офис</label>
                <Form.Control type='input' name='company_address_room' placeholder='' />
            </Form.Group>
        </Row>
    </>
};

export default SignUpPage;