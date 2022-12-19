import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Denied from '../Denied';
import authContext from '../Context/auths/authContext';
import Loader from "./Loader";

const EditProfile = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const AuthData = useContext(authContext);
    const { userUpdate } = AuthData;
    
    const location = useLocation();
    const path = location.pathname.split("/")[3];
    const imgpath = "http://localhost:5000/images/";

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async() => {
            setLoading({ loading: true });
            const res = await axios.get("/users/"+path);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setProfilePic(res.data.profilePic);
            setLoading(false);

        }
        fetchUser();
        // eslint-disable-next-line
    },[path]);

    const changeImage = (e) => {
        setProfilePic( e.target.files[0]);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        const updateUser = {
            userId : path,
            username : username,
            email : email,
        };
        if (password.trim().length !== 0 ) {
            updateUser.password = password;
        }
        if (profilePic) {
            const data = new FormData();
            const filename = Date.now() + profilePic.name;
            data.append('name', filename);
            data.append('file', profilePic);
            if (filename) {
                updateUser.profilePic = imgpath + filename;
            }
            try {
                await axios.post("/upload", data);                
            } catch (error) {
                props.showAlert("image not uploaded", 'danger');
            }
            
        }

        const errors = {}      
        if (!updateUser.email) {
            errors.email = 'Required';
            props.showAlert("Email is Required", "danger");
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(updateUser.email)) {
            errors.email = 'Invalid email address';
            props.showAlert("Invalid email address", "danger");
        }
        if (!updateUser.username) {
            errors.username = 'Required';
            props.showAlert("Username Required", "danger");
        } else if(updateUser.username.length < 3 ){
            errors.username = 'Username should be greater then 3 character';
            props.showAlert("Username should be greater then 3 character", "danger");
        }

        if (Object.keys(errors).length === 0) {
            userUpdate(updateUser);
        }
    }
  return (
    user ? (
        <div style={{ padding: "50px 0px", backgroundColor: "#eee"}}>
            <div className="container register-form">
                <div className="form">
                    <div className="note">
                        <h1 className='mb-4'>Edit User</h1>
                    </div>
                    
                    <form className="form-content" method='post' onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                {
                                    loading ? 
                                    <Loader></Loader>
                                    :
                                    <>
                                    <div className="form-group mb-3">
                                        <input type="file" name="profilePic" className="form-control" placeholder="Upload your file *" onChange={changeImage} />
                                        {profilePic && typeof profilePic !== 'object' && <img className='img-fluid' src={profilePic} alt={username} id='img1' style={{width:"200px", height:"200px", borderRadius:"50%"}}/>
                                        }
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="test" name="username" value={username} className="form-control" onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="email" name="email" value={email} className="form-control" onChange={(e) => setEmail(e.target.value)} />
                                    </div>

                                    <div className="form-group mb-3">
                                        <input type="password" name="password" className="form-control" placeholder='Enter your new password'  autoComplete='false' value={password} onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    </>
                                }
                            </div>
                            <div className="col-md-6">
                            </div>
                        </div>
                        <button type="submit" className="btnSubmit btn btn-primary">Update User</button>
                    </form>
                    
                </div>
            </div>
        </div>
    ) : (
        <Denied/>
    )
  )
}

export default EditProfile


