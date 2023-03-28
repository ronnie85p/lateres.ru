import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

const OrderDeliveries = ({
    deliveries,
    delivery_id,
    _onClick
}) => {

    const regularClasses = 'p-2 rounded d-flex align-items-center'
    const actionClasses = ' shadow-sm bg-white'
    const styles = {cursor: 'pointer', height: 76}

    return <>
        <Row>
            {Object.values(deliveries).map(item => {
                return <DeliveryItem />
            })}
        </Row>

        <DeliveryContent />
    </>
}

const DeliveryContent = (props) => {
    const { delivery_id } = props

    switch (delivery_id) {
        case 1:
            return <DeliveryPickup {...props}/>
        
        case 2:
            return <DeliveryCompany {...props}/>
    }

    return <></>
}

const DeliveryBtns = ({
    deliveries,
    delivery_id,
}) => {
    return <Row>{Object.values(deliveries).map(del => {
        return <DeliveryBtn key={del.id} delivery_id={delivery_id}/>
    })}</Row>
}

const DeliveryBtn = (props) => {
    return <>
        <Col md={4} key={item.id}>
            <div 
                className={regularClasses + (delivery_id === item.id ? actionClasses: '')} 
                style={styles}
                onClick={(event) => _onClick(event, item.id)}>
                <Image src={item.logo} width='50' />
                <span className='flex-fill ml-2 fs-5'>{item.name}</span>
            </div>
        </Col>
    </>
}

export default OrderDeliveries;