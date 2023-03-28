import { Pagination as BsPagination } from 'react-bootstrap'

const Pagination = (props) => {
    const { 
        count, 
        current,
        onPageItemClick = () => {} 
    } = props;

    const Pages = () => {
        const items = [];
        for (let number = 1; number <= count; number++) {
            items.push(
                <BsPagination.Item 
                    key={number} 
                    active={number === current}
                    onClick={event => onPageItemClick(event, number)}>
                        {number}
                </BsPagination.Item>
            );
        }

        return items;
    };

    return <>
        <BsPagination>
            <Pages />
        </BsPagination>
    </>
}

export default Pagination