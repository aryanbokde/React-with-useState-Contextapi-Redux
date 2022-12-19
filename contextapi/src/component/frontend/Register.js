import React, { useContext, useState } from "react";
import authContext from "../Context/auths/authContext";

const Register = (props) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const AuthData = useContext(authContext);
    const { addUser } = AuthData;

    const [auth, setAuth] = useState({username:"", email:"", password:""});
    const prfilePic = "http://localhost:5000/images/1669607877893default.png";
    const handleSubmit = async(e) => {
        e.preventDefault();        
        addUser(auth.username, auth.email, auth.password, prfilePic);
        setAuth({username:"", email:"", password:""});
    }

    const onChnage = (e) => {
        setAuth({...auth, [e.target.name]: e.target.value});
    }

  return (
    !user ? (
        <div style={{ padding: "50px 0px", backgroundColor: "#eee"}}>
            <div className="container register-form">
                <div className="form">
                    <div className="note">
                        <h1 className='mb-4'>Register</h1>
                    </div>
                    <form className="form-content" method='post' onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <input type="text" name="username" className="form-control" placeholder="Username *"  required onChange={onChnage} value={auth.username}/>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="email" name="email" className="form-control" placeholder="Email *" required onChange={onChnage} value={auth.email}/>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="password" name="password" className="form-control" placeholder="Password *" autoComplete="true" required onChange={onChnage} value={auth.password}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                
                            </div>
                        </div>
                        <button type="submit" className="btnSubmit btn btn-primary">Submit</button>
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

export default Register;
