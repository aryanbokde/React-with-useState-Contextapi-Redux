import React from 'react';
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";



const ProductCard = ({product}) => {  

  const option = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomoto",
    size: window.innerWidth < 600 ? 10 : 20,
    value: product.ratings,
    isHalf: true,
  }

  

  return (
        
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <ReactStars { ...option }/> <span> {product.numOfReviews} reviews </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>

  )
}

export default ProductCard
