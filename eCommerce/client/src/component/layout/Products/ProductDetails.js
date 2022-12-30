import { React, useEffect } from 'react';
import { productDetail } from '../../../Reducers/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import './ProductDetails.css';
import ReactStars from "react-rating-stars-component";
import ReviewCard from './ReviewCard';
import Loader from '../Loader';




const ProductDetails = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const { loading, products } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(productDetail(productId));
        // eslint-disable-next-line
    }, [productId]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomoto",
        size: window.innerWidth < 600 ? 10 : 20,
        value: products.ratings,
        isHalf: true,
    };
    
  return (
    <>
        {loading ? (
            <Loader></Loader>
        ):(
            <>
            <div className='ProductDetails'>
           
                    <Carousel>
                    {products.images && 
                        products.images.map((item, i) => (
                            <img data={item._id}
                                className="CarouselImage"
                                key={item.url+i}
                                src={item.url}
                                alt={`${i} Slide`}
                            />
                        ))
                        
                    }
                    </Carousel>
                
                <div>

                    <div className="detailsBlock-1">
                        <h2>{products.name}</h2>
                        <p>Product # {products._id}</p>
                    </div>

                    <div className="detailsBlock-2">                
                        <ReactStars {...options} />
                        <span className="detailsBlock-2-span">
                        {" "}
                        ({products.numOfReviews} Reviews)
                        </span>
                    </div>

                    <div className="detailsBlock-3">   
                        <h1>{`₹${products.price}`}</h1>
                        <div className="detailsBlock-3-1">
                        <div className="detailsBlock-3-1-1">
                            <button >-</button>
                            <input readOnly type="number" value="1" />
                            <button>+</button>
                        </div>
                        </div>
                        <p>
                            Status: {""}
                            <b className={products.stock < 1 ? "redColor" : "greenColor"}>
                                {products.stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>

                    <div className="detailsBlock-4"> 
                        Description : <p>{products.description}</p>
                    </div>
                    <button className='submitReview'> Submit Review</button>

                </div>
            </div>
            <h3 className='reviewsHeading'>REVIEW</h3>
            {products.reviews && products.reviews[0] ? 
                <div className='review'>
                    {products.reviews && products.reviews.map((review) => <ReviewCard review={review}/>)}
                </div> 
                :
                <p className='moReviews'>No Reviews Yet</p>

            }
            </>
        )

        }
    </>
    
  )
}

export default ProductDetails
