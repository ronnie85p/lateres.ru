import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export default (props) => {
    const { 
        label,
        work_times 
    } = props

    return <>
        <Row className={'mt-5'}>
            <Form.Group as={Col} md='4' className='form-group mb-0'>
                <Form.Label htmlFor='delivery_datetime'>{label}</Form.Label>
                <InputGroup>
                    <Form.Control name="delivery_date" type='date' min='' style={{ width: '40%' }}/>
                    <Form.Select name="delivery_time">
                        <option value='0'>чч:мм</option>

                        {work_times.map(time => {
                            return <option key={time} value={time}>{time}</option>
                        })}
                    </Form.Select>
                </InputGroup>
            </Form.Group>
        </Row>
    </>
}