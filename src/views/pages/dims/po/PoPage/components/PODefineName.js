

import { useSelector } from 'react-redux';
import { selectProductId } from './../../../../../../store/reducers/productSlice';

const PODefineName = (props) => {
    const { productId } = props
    const data = useSelector((state) => selectProductId(state, Number(productId)));
    return data.product_name
}

export default PODefineName;