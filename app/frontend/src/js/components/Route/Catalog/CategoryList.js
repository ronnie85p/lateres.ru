import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

const { Context, React } = global;
const { useContext, useState, useEffect } = React;

const CategoryList = () => {
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
                return <CategoryItem {...res} key={res.id}/>
            })}
        </Row>
    </>
}

const CategoryItem = (props) => {
    const { pagetitle, image, url } = props

    return <>
        <Col md={3} className="mb-4">
            <a href={url}>
                <div className='shadow-sm rounded p-2'>
                    <Image src={image} alt={pagetitle} style={{ maxHeight: 150 }} rounded/>
                    <div className='text-center'>{pagetitle}</div>
                </div>
            </a>
        </Col>
    </>
}

const queryResults = (callback) => {
    const results = [
        {
            id: 1,
            pagetitle: 'Строительные блоки',
            image: 'https://lateres.ru/assets/uploads/product-285/product-285-6.jpg',
            url: ''
        },

        {
            id: 2,
            pagetitle: 'Кирпич',
            image: 'https://309921.selcdn.ru/l-s-ru/products/product-26/3f7c7988e8933d1f99cd2cf5681ac484.jpeg',
            url: '',
        },

        {
            id: 3,
            pagetitle: 'Тротуарная плитка',
            image: 'https://309921.selcdn.ru/l-s-ru/products/product-17/1ee48831ed40c84d8aae4633062a7a48.jpeg',
            url: ''
        },

        {
            id: 4,
            pagetitle: 'Бордюрный камень',
            image: 'https://309921.selcdn.ru/l-s-ru/products/product-674/54121054ccb8e5dc4dc8ded709a11008.jpeg',
            url: ''
        },

        {
            id: 5,
            pagetitle: 'Сопутствующие материалы',
            image: '',
            url: ''
        },

        {
            id: 6,
            pagetitle: 'Железобетонные изделия',
            image: '',
            url: ''
        },

        {
            id: 7,
            pagetitle: 'Услуги и сервис',
            image: '',
            url: ''
        },
    ];

    setTimeout(() => {
        callback(results);
    }, 3000 / 2);
}

export default CategoryList;