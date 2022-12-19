import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { fetchPostById } from '../../Reducers/postReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loading';


const Singlepost = () => {

    const location = useLocation();
    const postId = location.pathname.split('/')[2];
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.post);

    useEffect(() => {
        dispatch(fetchPostById(postId));
        // eslint-disable-next-line
    },[postId]);

    console.log(data);

  return (
    <div style={{ padding: "100px 0px", backgroundColor: "#eee" }}>
        <div className="container">
            <div className='row'>
                <div className='col-md-9'> 

                    {loading ? 
                        <Loader/> 
                    : 
                        <>
                        <div className="post">
                            <h1 className="mb-4">{data.title}</h1>
                            <b>{data.categories}</b>
                        </div>
                        <div className="post-img my-4">
                            { data.photo && <img src={data.photo} alt={data.title} className="img-fluid"/>}
                        </div>
                        <div className="post-content">
                            {data.desc}
                        </div>
                        </>
                    }                    
                    
                </div>
                <div className='col-md-3'>
                    <h1>Sidebar</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Singlepost
