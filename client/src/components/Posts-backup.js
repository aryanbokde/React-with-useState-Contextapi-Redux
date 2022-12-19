import React, { useEffect, useState } from 'react';
import axios from "axios";
import Post from './Post';
import { useLocation } from 'react-router-dom';

const Posts = () => {
  
    const [posts, setPosts] = useState([]);
    const {search} = useLocation();
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 4; 
    // console.log(search);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/posts'+ search + "/page=" + page + "&pageSize=" + pageSize );
            
            setPosts(res.data);
            setTotalResults(res.data);
            
        }
        fetchPosts();
    }, [search]);
    console.log(totalResults)
  return (
    // {posts.length > 0
    //     ? <div> working</div>
    //     : <div>not working</div>
    // }
    <div style={{padding: "50px 0px"}}>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='my-4'>Lastest Blog</h2>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">   

                {posts.length > 0 ? 

                posts.map((p)=>(
                    <Post data={p} key={p._id}/>
                )) :
                <div className='col-12'>
                    <h2 className='text-danger'>Blog Not Found..!</h2>
                </div>                
                }
            </div>
        </div>
    </div>
    
  )
}

export default Posts


