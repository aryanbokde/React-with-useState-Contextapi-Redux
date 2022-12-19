import { Link, Navigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import Denied from "./Denied";
import {fetchPostByUser, postDeleteById} from '../../Reducers/postReducer';
import {useDispatch, useSelector} from "react-redux";
import Loader from "./Loading";
import Pagination from "./Pagination";


const ManagePosts = () => {
  
  const isLoggedIn = localStorage.getItem("token");
  const location = useLocation();
  const dispatch = useDispatch();
  const {loading, data} = useSelector(state => state.post);

  useEffect(() => {
    dispatch(fetchPostByUser());
    // eslint-disable-next-line
  },[]);
  
  const handleDelete = async(e, postId) => {
    e.preventDefault();
    dispatch(postDeleteById(postId)).then(()=>{
      setTimeout(() => {
          window.location.reload();
      }, 2000);
      
    });
  }

  // User is currently on this page
  const [currentPage, setCurrentPage] = useState(1);
  // No of Records to be displayed on each page   
  const [recordsPerPage] = useState(5);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // Records to be displayed on the current page
  const currentRecords = data.slice(indexOfFirstRecord, 
      indexOfLastRecord);

  const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    isLoggedIn ? 
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
      <div className="container register-form">
        <div className="form">
          <div className="note">
            <h1 className="mb-4">Manage Posts</h1>
            <hr className="hr"></hr>            
          </div> 
                
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

              <tbody style={{width:"100%"}}>
                {loading ? (
                  <>
                  <tr>
                    <td colSpan={6}>
                    <Loader/>
                    </td>
                  </tr>    
                  </>   
                )          
                  :
                  data.length > 0 ? 
                  currentRecords.map((post) => (
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
                  ))   
                  : 
                  <tr>
                    <td colSpan={6}>No Post Found..!</td>
                  </tr>                 
                                
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
            <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage }/>
        </div>
      </div>
    </div>
    :
    <>
     <Navigate to="/login" replace state={{ from: location.pathname }}/> {/*// <-- pass location in route state */}      
    </>
    
    
  );
};

export default ManagePosts;
