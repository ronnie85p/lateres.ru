import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner, Image, ListGroup } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from '../../../../../../src/js/components/Form';

const { useState, useEffect, createRef } = React

const ProfileForm = (props) => {
    const { data } = props

    return <>
        <Form>
            {/* <Row>
                <Form.Group className='form-group' as={Col} md={10}>
                    <Form.Check 
                        type='switch'
                        label='Юридическое лицо'
                    />
                </Form.Group>
            </Row> */}

            <Row>
                <Form.Group className='form-group' as={Col} md={10}>
                    <label htmlFor='fullname'>Фамилия Имя Отчество</label>
                    <Form.Control name='fullname' defaultValue={data.fullname} />
                </Form.Group>
            </Row>

            <Row>
                <Form.Group className='form-group' as={Col} md={4}>
                    <label htmlFor='dob'>Дата рождения</label>
                    <Form.Control type='datetime-local' name='dob' />
                </Form.Group>
                
                <Form.Group className='form-group' as={Col} md={3}>
                    <label htmlFor='gender'>Пол</label>
                    <Form.Select name='gender'>
                        <option value=''>Не выбран</option>
                        <option value=''>Муж</option>
                        <option value=''>Жен</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <hr className='' />

            <Row>
                <Col className='text-center'>
                    <Button variant='primary' type='submit'>Сохранить</Button>
                </Col>
            </Row>
        </Form>
    </>
};

export default ProfileForm;