import React, { useContext, useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

const Register = (props) => {
    const { user } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const profilePic = 'http://localhost:5000/images/1669607877893default.png';

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/auth/register", {
                username, email, password, profilePic,
            });
            props.showAlert("Registration successfully", "success");
            navigate("/login");
        } catch (error) {
            props.showAlert("Please try again..!", "danger");
        }        
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
                                    <input type="text" name="username" className="form-control" placeholder="Username *" onChange={(e)=>setUsername(e.target.value)} required/>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="email" name="email" className="form-control" placeholder="Email *"  onChange={(e)=>setEmail(e.target.value)} required/>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="password" name="password" className="form-control" placeholder="Password *"  onChange={(e)=>setPassword(e.target.value)} autoComplete="true" required/>
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
                <div className="form text-center">
                    <div className="note">
                    <h1 className="mb-4">You are already Logged in, { user.others.username}</h1>
                    <Link className="btn btn-primary" to="/"> Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
    
  )
};

export default Register 
 