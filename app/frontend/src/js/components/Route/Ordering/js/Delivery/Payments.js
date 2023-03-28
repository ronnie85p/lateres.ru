import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import { Title } from '../components';

const { useState } = React;

const DeliveryPayments = (props) => {
    const [payment_id, setPaymentId] = useState(() => {
        return props.payment_id
    });

    const { payments, title } = props;

    const handleClick = (event, id) => {
        setPaymentId(id);
    }

    return <>
        <Title>{title}</Title>
        <Row className='m-0'>
            {Object.values(payments).map(pm => {
                return <PaymentItem {...props} 
                            key={pm.id} 
                            payment={pm}
                            payment_id={payment_id} 
                            _onClick={(event) => handleClick(event, pm.id)}
                        />
                }
            )}
        </Row>

        <PaymentContent {...props} payment_id={payment_id} className='mt-4'/>
    </>
}

const PaymentContent = (props) => {
    const { payment_id, payments } = props

    const payment = payments[payment_id];

    return <>
        <div {...props}>{payment.description}</div>
    </>
}

const PaymentItem = (props) => {
    const { payment, payment_id, _onClick } = props

    const styles = {
        cursor: 'pointer',
    }

    const activeStyles = {
        outline: '2px solid orange',
        background: '#ffa5001a'
    };

    var classes = 'rounded bg-white p-2 py-3 mr-4';

    if (payment.id === payment_id) {
        Object.assign(styles, activeStyles);
    } else {
        classes += ' shadow-sm'
    }

    return <>
        <Col md={3} 
            className={classes}
            style={styles}
            onClick={_onClick}>
            <Image src={payment.logo} className='mr-2' style={{ }}/>
            <span className='fs-6'>{payment.name}</span>        
        </Col>
    </>
}

// const PaymentTypeNoCash = ({ payment }) => {
//     return <>
//         <div class="mt-4">
    
//             <div className="text-lg text-muted mb-2">Ссылка на оплату</div>
            
//             <Form.Check 
//                 checked
//                 name='payment_link'
//                 type='radio'
//                 label='Отправить на почту'
//                 defaultValue={'email'}
//                 id='payment-link-1'
//             />

//             <Form.Check 
//                 checked
//                 name='payment_link'
//                 type='radio'
//                 label='Получить (для оплаты)'
//                 defaultValue={'get'}
//                 id='payment-link-1'
//             />
        
//         </div>
//     </>
// }

export default DeliveryPayments;