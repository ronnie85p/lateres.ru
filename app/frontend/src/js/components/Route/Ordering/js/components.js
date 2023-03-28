import { Card, Row, Col, InputGroup, ButtonGroup, Button, Form, Badge, ToggleButton, Image } from 'react-bootstrap'
import * as Icon from 'react-bootstrap-icons'

import DeliveryPayments from './Delivery/Payments'
import { Modal, useModal } from '../../../../src/js/components/Modal'

const Section = (props) => {
    const { children } = props

    return <>
        <section  {...props} className={'shadow-sm rounded bg-white p-3 mb-3'}>
            {children}
        </section>
    </> 
}

const Title = (props) => {
    const { children } = props;

    return <div className='h5 mt-4' {...props}>{children}</div>
}

const OrderComment = ({ title }) => {
    return <>
        <Title>{title}</Title>
        <Form.Control 
            as="textarea"
            placeholder="Leave a comment here"
            style={{ height: '100px' }}
            name='comment'
        ></Form.Control>
    </>
}

const OrderRecipient = (props) => {
    const { recipient, title } = props

    const modal = useModal({
        titleText: 'Получатель',
        modalProps: {
            animation: false
        },
        Body: () => {
            return <>
                <Row>
                    <Form.Group as={Col} className='form-group'>
                        <Form.Check
                            defaultChecked 
                            type='switch'
                            id='person-type-2'
                            label='Юридическое лицо'
                            // value={1}
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md={12} className='form-group'>
                        <label htmlFor='fullname'>Фамилия Имя Отчество</label>
                        <Form.Control type='input' name='fullname' />
                    </Form.Group>

                    <Form.Group as={Col} md={5} className='form-group'>
                        <label htmlFor='mobilephone'>Телефон</label>
                        <Form.Select name='mobilephone'>
                            <option value=''>- None</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </>
        }
    });

    const handleModalClick = (event) => {
        event.preventDefault();

        modal.show();
    }

    return <>
        <Modal use={modal} />

        <Title>{title}</Title>
        <Section>
            <Row className=''>
                <Col>
                    <div className='mb-3 fs-6 d-flex'>
                        <Icon.PersonCircle className='mr-3 mt-1' /> <div>{recipient.fullname}, {recipient.mobilephone}</div>
                    </div>
                    <div className='mb-1 text-muted d-flex'>
                        <Icon.HouseExclamation className='mr-3 mt-1' /> <div>{recipient.company_text}</div>
                    </div>
                    <div className='text-muted d-flex'>
                        <Icon.GeoAlt className='mr-3 mt-1' /> <div>{recipient.company_address_text}</div>
                    </div>
                </Col>
                <Col md={2} className='text-end'>
                    <a href='#' onClick={handleModalClick}>
                        Изменить
                    </a>
                </Col>
            </Row>
        </Section>
    </>
}

export {
    Section,
    Title,
    OrderComment,
    OrderRecipient
}