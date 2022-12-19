import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../user/Loader';
import PostsConext from '../Context/posts/PostsContext';

const SinglePost = () => {

    const location = useLocation();
    const postId = location.pathname.split("/")[2];

    const PostsData = useContext(PostsConext);
    const { loading, posts, postGetById } = PostsData;

    useEffect(() => {        
        postGetById(postId);
        // eslint-disable-next-line
    }, [postId]);

  return (
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
        <div className="container">
            <div className='row'>
                <div className='col-md-9'> 
                    {loading ?
                        <Loader></Loader>
                        :
                        posts !== null ?
                            <>                                                  
                            <div className="post">
                                <h1 className="mb-4">{posts.title}</h1>
                                <b>{posts.categories}</b> | <b>{posts.createdAt}</b>
                            </div>
                            <div className="post-img my-4">
                                { posts.photo && <img src={posts.photo} alt={posts.title} className="img-fluid"/>}
                            </div>
                            <div className="post-content">
                                { posts.desc }
                            </div> 
                            </>
                        :
                        <div>Posts not found..!</div>
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

export default SinglePost 
 

