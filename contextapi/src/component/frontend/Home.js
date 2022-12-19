import React, { useContext } from 'react'
import Dummy from './Dummy';
import LatestPost from './LatestPost';
import PostsConext from '../Context/posts/PostsContext';

const Home = (props) => {
  const PostsData = useContext(PostsConext);
  return (
    <div>
      <LatestPost PostsData={PostsData}/>
      <Dummy/>
    </div>
  )
}

export default Home
