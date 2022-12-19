import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Context } from '../context/Context';

const Singlepost = (props) => {

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);

  // console.log(singleUser);

  useEffect(() => {    
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      // console.log(res.data);
    }
    getPost();
  }, [path]);
  
  const d = new Date(post.createdAt);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const monthname = monthNames[d.getMonth()];
  let daydate = d.getDate();
  if (daydate < 10) {
      daydate = "0" + daydate;
  }else{
      daydate = d.getDate();
  }
  const year = d.getFullYear();
  const date = monthname + "-" + daydate;
  const PF = "http://localhost:5000/images/";

  let singleUser = "";
  if (user) {
    singleUser = user.others;
  }else{
    singleUser = user;
  }
  
  const handleDelete = async() => {
    try {
      await axios.delete(`/posts/${post._id}`, {data:{username:singleUser.username}});
      props.showAlert("Post deleted successfully", "success");
      window.location.replace("/");
    } catch (error) {
      props.showAlert(error.response.data.error, "danger");
    }    
  }

  return (
    <>
      <div style={{padding: "50px 0px" }} id={post._id} className={location.pathname.split("/")[1]}>
          <div className="container">
              <div className="row">
                  <div className="col-12">
                      <div className="blog-post">
                        {post.photo && <img src={PF + post.photo} className='img-fluid' alt={post.title}/>}
                        {post.username === singleUser?.username && (
                          <div className='edit-delete-btn mt-3'>
                            <Link to={`/backend/editpost/${post._id}`} className="link"><i className="fa-regular fa-pen-to-square" ></i></Link>                            
                            <i className="fa-regular fa-trash" id={post._id} onClick={handleDelete}></i>
                        </div>  
                        )}
                                                                    
                          <h2 className="blog-post-title mt-2">{post.title}</h2>
                          <p className="blog-post-meta">{date}, {year} by <Link to={`/?user=${post.username}`} style={{color:"red"}}>{post.username}</Link></p>
                          {post.desc}
                          <hr />
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Singlepost


