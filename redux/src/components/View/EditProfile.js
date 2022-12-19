import React, { useEffect } from "react";
import { Navigate, useLocation } from 'react-router-dom';
import { userByid } from "../../Reducers/userReducer";
import { useSelector, useDispatch } from "react-redux";
import UserEditItem from "./UserEditItem";
import Loader from "./Loading";

const EditProfile = () => {
  const isLoggedIn = localStorage.getItem("token");
  const location = useLocation();
  const userId = location.pathname.split("/")[3]; 
  
  const dispatch = useDispatch();
  const {loading, data} = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userByid(userId));
    // eslint-disable-next-line 
  },[]);

  return (
  isLoggedIn ? 
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
      <div className="container register-form">
        <div className="form">
          <div className="note">
            <h1 className="mb-4">Edit User</h1>
            
          </div>
          {loading ? 
            <Loader/>
            : 
            <UserEditItem data={data} />
          }
          
        </div>
      </div>
    </div>
  : 
    <>
     <Navigate to="/login" replace state={{ from: location.pathname }}/> {/*// <-- pass location in route state */}      
    </>
  
  )
};

export default EditProfile;
