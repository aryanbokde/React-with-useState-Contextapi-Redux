import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PostsConext from '../Context/posts/PostsContext';

const PostItem = (props) => {
    
    const postsData = useContext(PostsConext);
    const { deletePost } = postsData;

    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user.username);

    const handleDelete= (e, postId) => {
        e.preventDefault();
        const deleteData = {
            postId : postId,
            username : user.username,
        };
        deletePost(deleteData);
        
    };

  return ( 
  
    <table id="example" className="table table-striped" style={{width:"100%"}}>
        <thead>
            <tr>
                <th>Img</th>
                <th>Title</th>
                <th>Desc</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
        {
            props.currentRecords.map((post) => (
                post.username === user.username ?
                
                <tr key={post._id}>
                    <td>
                    <Link to={`/user/editpost/${post._id}`}>{post.photo && <img src={post.photo} alt={post.title} style={{width:"50px", height:"50px", borderRadius:"25px"}}/>}</Link>
                    </td>
                    <td><Link to={`/user/editpost/${post._id}`}>{post.title && <b>{post.title}</b>}</Link></td>
                    <td>{post.desc.slice(0, 25)}</td>
                    <td>{post.createdAt}</td>
                    <td>{post.updatedAt}</td>
                    <td>
                        <div className="d-flex justify-content-center">
                            <div className='btn-edit btn2 mr-2'>
                                <Link to={`/user/editpost/${post._id}`}><i className="far fa-edit"></i></Link>                    
                            </div>
                            <div className='btn-delete btn2' onClick={ async(e) => handleDelete(e, post._id)}>
                                <i className="far fa-trash-alt"></i>
                            </div>
                        </div>                      
                    </td>
                </tr>
                : ""
            ))
        }
        </tbody>
        <tfoot>
            <tr>
                <th>Img</th>
                <th>Title</th>
                <th>Desc</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
                <th>Actions</th>
            </tr>
        </tfoot>
    </table> 
   
    
  )
}

export default PostItem
