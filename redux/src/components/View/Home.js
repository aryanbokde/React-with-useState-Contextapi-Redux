import React, { useEffect } from 'react';
import Dummy from './Dummy';
import LatestPost from './LatestPost';
import Loader from './Loading';
import { getAllPosts } from '../../Reducers/postReducer';
import {useDispatch, useSelector} from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();
  const {loading, data} = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getAllPosts());
    // eslint-disable-next-line
  },[]);
  
  return (
    <>
    {loading ? 
        <Loader/>
      : 
        <LatestPost data={data}/>
    }      
      <Dummy/>
    </>      
  )
}

export default Home
