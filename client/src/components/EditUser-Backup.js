import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../context/Context';

const EditUser = (props) => {
    const {user} = useContext(Context);
    const userId = user.others._id;
    // const imgpath = window.location.origin + "/images/";
    const imgpath = "http://localhost:5000/images/";

    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState(null);
    const [password, setPassword] = useState('');
        
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get('/users/'+ userId);
            // console.log(res.data);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setProfilePic(res.data.profilePic);
        }
        fetchUser();
    }, [userId]);
    

    const handleSubmit = async(e) => {
        e.preventDefault();

        const updateUser = {
            userId : userId,
            username,
            email,            
        };
        if (password.trim().length !== 0) {
            updateUser.password = password;
        }
        if (profilePic) {
            const data = new FormData();
            const filename = Date.now() + profilePic.name;
            data.append("name", filename);
            data.append("file", profilePic);
            if (filename) {
                updateUser.profilePic = imgpath + filename;
            }            
            try {
                await axios.post("/upload", data);
            } catch (error) {
                props.showAlert("Image not updated..!", "danger");
            }
        }

        if(username === '' || email === ''){
            props.showAlert("Email or username is empty..!", "danger");
         }else{
            try {            
                // console.log(user.others._id);
                await axios.put("/users/" + userId, updateUser); 
                const newRes = await axios.get("/users/" + userId);
                
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify({"others" :newRes.data}));
                
                props.showAlert("User updated successfully..!", "success");
                window.location.reload(true);           
            } catch (error) {
                props.showAlert("Something went wrong, Please try again..!", "danger");
            }
         } 
    }

    const handleUserDelete = async(e, user) => {
        e.preventDefault();        
        try {
        //    const res = await axios.delete("/users/"+user, deleteUser);
           await axios.delete(`/users/${user}`, {data:{userId:user}});
           localStorage.removeItem("user");
           props.showAlert("User successfully deleted..!", "success");
           window.location.reload(true);
        } catch (error) {
            props.showAlert("Something went wrong, Please try again..!", "danger");
        }

    }
    const changeImage = (e) => {
        setProfilePic(e.target.files[0]);
        // const img = e.target.files[0].name;
        // console.log(PF + img);
        // setProfilePic(PF + img);
    }
  
    return (
        <>
            <div style={{ padding: "50px 0px", backgroundColor: "#eee"}}>
            <div className="container register-form">
                <div className="form">
                    <div className="note">
                        <h1 className='mb-4'>Edit User</h1>
                    </div>
                    <form className="form-content" method='post' onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <input type="file" name="profilePic" className="form-control" placeholder="Upload your file *" onChange={changeImage}/>
                                    {
                                        profilePic && typeof profilePic !== 'object' &&
                                        <img className='img-fluid' src={profilePic} alt="" id='img1' style={{width:"200px", height:"200px", borderRadius:"50%"}}/>
                                    }
                                </div>
                                <div className="form-group mb-3">
                                    <input type="test" name="username" className="form-control" onChange={(e)=>setUsername(e.target.value)} value={username}/>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="email" name="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <input type="password" name="password" className="form-control" placeholder='Enter your new password' onChange={(e)=>setPassword(e.target.value)} autoComplete='false'/>
                                </div>
                            </div>
                            <div className="col-md-6">
                            </div>
                        </div>
                        <button type="submit" className="btnSubmit btn btn-primary">Update User</button>
                        <button type="submit" className="btnSubmit btn btn-danger mx-2" onClick={(e) => handleUserDelete(e,userId)}>Delete User</button>
                    </form>
                    
                    
                </div>
            </div>
            </div>
        </>
    )
}

export default EditUser
