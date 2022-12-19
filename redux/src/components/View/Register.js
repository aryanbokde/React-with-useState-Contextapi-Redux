import React, { useState } from "react";
import { registerUser } from "../../Reducers/authReducer";
import Loading from './Loading';
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const isLoggedIn = localStorage.getItem("token");
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {loading} = useSelector(state => state.auth);
    

    const handleSubmit = (e) => {
        e.preventDefault();        
        dispatch(registerUser({username, email, password})).then(()=>{
            setTimeout(() => {
                nav("/login");
            }, 2000);
            
        });
    }    
  return (
    
        <div style={{ padding: "50px 0px", backgroundColor: "#eee"}}>
            {!isLoggedIn ? 
                <div className="container register-form">
                    <div className="form">
                        <div className="note">
                            <h1 className='mb-4'>Register</h1>                        
                        </div>
                        <form className="form-content" method='post' onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    {loading ? 
                                        <Loading/>
                                        :
                                        <>
                                        <div className="form-group mb-3">
                                            <input type="text" name="username" className="form-control" placeholder="Username *"  required value={username} onChange={(e)=>setUsername(e.target.value)}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="email" name="email" className="form-control" placeholder="Email *" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                        </div>
                                        <div className="form-group mb-3">
                                            <input type="password" name="password" className="form-control" placeholder="Password *" autoComplete="true" required onChange={(e)=>setPassword(e.target.value)} value={password}/>
                                        </div>
                                        </>
                                    }
                                </div>
                                <div className="col-md-6">
                                    
                                </div>
                            </div>
                            <button type="submit" className="btnSubmit btn btn-primary">Submit</button>
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
   
  )
};

export default Register;
