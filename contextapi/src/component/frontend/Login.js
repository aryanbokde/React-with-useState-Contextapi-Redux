import React, { useContext, useState } from "react";
import authContext from "../Context/auths/authContext";

const Login = () => {  
  const user = JSON.parse(localStorage.getItem('user'));
 
  const AuthData = useContext(authContext);
  const { userLogin } = AuthData;
  const [credentials, setCredentials] = useState({username:"", password:""});

  const handleSubmit = async(e) => {
    e.preventDefault();    
    userLogin(credentials.username, credentials.password);
    setCredentials({username:"", password:""});    
  }

  const onChnage = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value});
  } 

  return (

    !user ? (
      <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
        <div className="container register-form">
          <div className="form">
            <div className="note">
              <h1 className="mb-4">Login</h1>
            </div>
              
            <form
              className="form-content"
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group mb-3">
                    <input
                      type="text"
                      name="username"
                      className="form-control"
                      placeholder="Username *"
                      onChange={onChnage}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Password *"
                      autoComplete="true"
                      onChange={onChnage}
                      required
                      
                    />
                  </div>
                </div>
                <div className="col-md-6"></div>
              </div>
              <button
                type="submit"
                className="loginbtn btn btn-primary"
                
              >
                Submit
              </button>
            </form>
            
          </div>
        </div>
      </div>
    ) : (
      <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
        <div className="container register-form">
          <div className="form">
            <div className="note">
              <h1 className="mb-4">Welcome {user.username}</h1>
              <p>You are logged in,</p>
            </div>
            
          </div>
        </div>
      </div>
    )
   
  )
};

export default Login;
