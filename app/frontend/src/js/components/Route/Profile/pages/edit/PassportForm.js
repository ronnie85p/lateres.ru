import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, Spinner, Image, ListGroup } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import { useForm } from '../../../../../../src/js/components/Form';

const { useState, useEffect, createRef } = React

const PassportForm = (props) => {
    const { data } = props;

    const chooseFilesWithComputer = (event) => {
        console.log('[chooseFilesWithComputer]');
    }

    return <>
        <Form>
            <Row>
                <Form.Group className='form-group' as={Col} md={12}>
                    <label>Фамилия Имя Отчество</label>
                    <Form.Control type='input' defaultValue={data.fullname} disabled />
                </Form.Group>

                <Form.Group className='form-group' as={Col} md={4}>
                    <label htmlFor='seria'>Серия и номер</label>
                    <Form.Control type='input' defaultValue={data.passport?.seria + ' ' + data.passport?.num} name='seria' />
                </Form.Group>

                <Form.Group className='form-group' as={Col} md={8}>
                    <label htmlFor='dep_issued'>Кем выдан</label>
                    <Form.Control type='input' defaultValue={data.passport?.dep_issued} name='dep_issued' />
                </Form.Group>

                <Form.Group className='form-group' as={Col} md={4}>
                    <label htmlFor='date_issued'>Дата выдачи</label>
                    <Form.Control type='datetime-local' defaultValue={data.passport?.date_issued} name='date_issued' />
                </Form.Group>

                <Form.Group className='form-group' as={Col} md={5}>
                    <label htmlFor='sitizenship'>Гражданство</label>
                    <Form.Select name='sitizenship'>
                        <option value=''>{data.passport?.sitizenship}</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className='form-group' as={Col} md={3}>
                    <label>Пол</label>
                    <Form.Control type='input' defaultValue={data.gender} disabled />
                </Form.Group>
            </Row>

            <Row className='mb-4'>
                <Form.Group className='form-group' as={Col} md={8}>
                    <label htmlFor='place_of_birth'>Место рождения</label>
                    <Form.Control type='input' defaultValue={data.passport?.place_of_birth} name='place_of_birth' />
                </Form.Group>

                <Form.Group className='form-group' as={Col} md={4}>
                    <label htmlFor='date_of_birth'>Дата рождения</label>
                    <Form.Control type='datetime-local' defaultValue={data.dob} disabled />
                </Form.Group>
            </Row>

            <h4>Сканы</h4>
            <Button variant='light' onClick={chooseFilesWithComputer}>
                <Icon.FileEarmarkArrowUp /> Выбрать с компьютера
            </Button>

            <hr className='' />

            <Row>
                <Col className='text-center'>
                    <Button variant='primary' type='submit'>Сохранить</Button>
                </Col>
            </Row>
        </Form>
    </>
}

export default PassportForm;