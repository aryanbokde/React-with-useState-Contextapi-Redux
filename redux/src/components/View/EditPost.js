import React, { useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { fetchPostById } from '../../Reducers/postReducer';
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loading";
import EditpostItem from "./EditpostItem";

const EditPost = () => {
  const isLoggedIn = localStorage.getItem("token");
  const location = useLocation();  
  const path = location.pathname.split("/")[3];

  const dispatch = useDispatch();
  const {loading, data} = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchPostById(path));
    // eslint-disable-next-line
  },[]);

  return (
    isLoggedIn ?
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
      <div className="container register-form">
        <div className="form row">
          <div className="col-md-6">
            <div className="note">
              <h1 className="mb-4">Edit Post</h1>
            </div>
            {loading ? 
              <Loader/>
            : 
              <EditpostItem data={data} path={path} key={data._id}/>
            }

          </div>
          <div className="col-md-6"></div>
        </div>
      </div>
    </div>
    :
    <>
    <Navigate to="/login" replace state={{ from: location.pathname }}/> {/*// <-- pass location in route state */} 
    </>
  )
};

export default EditPost;
