import React, { useEffect } from 'react';
import { fetchAllProduct } from '../../../Reducers/productReducer';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import ProductCard from '../Home/ProductCard';


const Products = () => {

    const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchAllProduct());
    // eslint-disable-next-line
  }, []);

  return (
    <>
        {loading ? <Loader/> : 
            products.length > 1  && products.map((product) => <ProductCard  product={product} key={product._id}/>) 

        }
    </>
  )
}

export default Products
