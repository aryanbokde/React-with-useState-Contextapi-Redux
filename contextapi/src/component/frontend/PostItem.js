import React from 'react';
import { Link } from "react-router-dom";
// import Loader from '../user/Loader';

const PostItem = (props) => {
    const posts = props.posts;
  return (
    
   
    posts.length > 0 ? 
    posts.map((post) => (
    <div className="col-md-6" key={post._id}>
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
          <div className="col p-4 d-flex flex-column position-static">
              {<b className="d-inline-block mb-2 text-primary">{post.categories[0] && post.categories[0]}</b>}
              <h5 className="mb-0">{post.title && post.title}</h5>
              <div className="mb-1 text-muted">{post.createdAt}</div>
              <p className="card-text mb-auto">{post.desc.slice(0, 88)}</p>
              <Link to={`/post/${post._id}`} className="stretched-link">Continue reading</Link>
          </div>
          <div className="col-auto d-none d-lg-block">
              
              {post.photo && <img src={post.photo} className='' alt="" height="230" width="200"/>}

          </div>
      </div>
    </div>
    ))
    :
    <div className='col-12'>
      <h2 className='text-danger'>Blog Not Found..!</h2>
    </div> 
    
  )
}

export default PostItem
