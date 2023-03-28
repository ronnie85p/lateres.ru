import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const { Context, React } = global;
const { useContext, useState, useEffect } = React;

const VisitProductsList = (props) => {
    const context = useContext(Context)
    const [results, setResults] = useState([]);

    useEffect(() => {
        queryResults((results) => {
            setResults(results);
        });
    }, []);

    if (!results.length) {
        return <>Waiting for...</>
    }

    return <>
        <Row>
            {results.map(res => {
                return <ProductItem {...res} key={res.id}/>
            })}
        </Row>
    </>
}

const ProductItem = (props) => {
    const { pagetitle, id, url, image } = props

    return <>
        <Col md={2}>
            <div className='shadow-sm rounded p-2'>
                <Image src={image} alt={pagetitle} rounded/>
                <div className=''>{pagetitle}</div>
            </div>
        </Col>
    </>
}

const queryResults = (callback) => {
    const results = [
        {
            id: 1,
            pagetitle: 'Product 1',
            image: '',
            url: ''
        },

        {
            id: 2,
            pagetitle: 'Product 2',
            image: '',
            url: ''
        },

        {
            id: 3,
            pagetitle: 'Product 3',
            image: '',
            url: ''
        },

        {
            id: 4,
            pagetitle: 'Product 4',
            image: '',
            url: ''
        },
    ];

    setTimeout(() => {
        callback(results)
    }, 3000 / 2);
}

export default VisitProductsList;