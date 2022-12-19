import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../Reducers/authReducer";
// import { useNavigate } from "react-router-dom";
import Loader from "./Loading";

const Login = () => {
  const isLoggedIn = localStorage.getItem("token");
  const nav = useNavigate();
  const dispatch = useDispatch();
  
  const {loading} = useSelector(state => state.auth);  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(loginUser({username, password})).then(()=>{
      setTimeout(() => {
          nav("/user/manage-post");
      }, 2000);
      
  });
  }
  
  return (
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
      {!isLoggedIn ? 
        <div className="container register-form">
          <div className="form">
            <div className="note">
              <h1 className="mb-4">Login</h1>
            </div>

            <form className="form-content" method="post" onSubmit={handleSubmit}>

              <div className="row">              
                <div className="col-md-6">
                  {loading ? <Loader/> :
                    <>
                      <div className="form-group mb-3">
                        <input type="text" name="username" className="form-control" placeholder="Username *" onChange={(e)=>setUsername(e.target.value)} required value={username} />
                      </div>
                      <div className="form-group mb-3">
                        <input type="password" name="password" className="form-control" placeholder="Password *" autoComplete="true" onChange={(e)=>setPassword(e.target.value)} required value={password}/>
                      </div>
                      <button type="submit" className="loginbtn btn btn-primary">
                        Submit
                      </button>
                    </>
                  }               

                </div>
                <div className="col-md-6"></div>
              </div>
              
            </form>
          </div>
        </div>
      :
        <div className="container">
          <div className="row">
            <div className="col-12">
              <b>You are LoggedIn User..!</b>
            </div>
          </div>
        </div>
      }
      
    </div>
  );
};

export default Login;
