import React, { Fragment } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import Loader from '../Loader';
import MetaData from "../MetaData";
import { fetchAllProduct } from '../../../Reducers/productReducer';
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";


const Home = () => {  

  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.product);
  
  useEffect(() => {
    dispatch(fetchAllProduct());
    // eslint-disable-next-line
  }, []);
  return (
    <Fragment>
        { loading ? (
            <Loader/> 
          ): (
          <Fragment>
          <MetaData title="E-Commerce" />

          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>
                Scroll
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>          
         
            <div className="container" id="container">
              { products.length > 1  && products.map((product) => <ProductCard  product={product} key={product._id}/>) }
            </div>
          </Fragment>
          )
        }
        
    </Fragment>
  );
};

export default Home;