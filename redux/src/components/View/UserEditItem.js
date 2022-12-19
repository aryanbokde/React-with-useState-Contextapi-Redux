import React, { useState } from "react";
import axios from 'axios';
import { updateUserById } from '../../Reducers/userReducer';
import {useDispatch } from "react-redux";
import {toast} from 'react-toastify';

const UserEditItem = (props) => { 

    const  UserId  = props.data._id;
    const [file, setFile] = useState(props.data.profilePic);
    const [username, setUsername] = useState(props.data.username);
    const [email, setEmail] = useState(props.data.email);
    const [password, setPassword] = useState('');
    const imgpath = "http://localhost:5000/images/";
    const dispatch = useDispatch();
   
    const handleSubmit = async(e) => {
        e.preventDefault();
        const updateUser = {
          UserId: UserId
        }
        const errors = {}
        
        if (!email) {
          errors.email = 'Email is Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = 'Invalid email address';
        }else{
          updateUser.email = email
        }
        if (!username) {
          errors.username = 'Username is Required';
        } else if(username.length < 3 ){
            errors.username = 'Username should be greater then 3 character';
        }else{
          updateUser.username = username
        }
        if (file) {
          const data = new FormData();
          const filename = Date.now() + file.name;
          data.append('name', filename);
          data.append('file', file);
          if (filename) {
            updateUser.profilePic = imgpath + filename;
          }
          try {
            await axios.post("/upload", data);
          } catch (error) {
            errors.file = 'Something goes wrong to upload photo..!';
          }          
        }
        if (password.trim().length !== 0 ) {
          updateUser.password = password;
        }
        if (Object.keys(errors).length === 0) {
          dispatch(updateUserById(updateUser)).then(()=>{
            setTimeout(() => {
                window.location.reload();
            }, 2000);      
          });
        }else{
          for (var k in errors) {
            if (errors.hasOwnProperty(k)) {
               toast.error(errors[k]);
            }
          }
        }

    };
  return (
    <div className="w-100">
      <form className="form-content" method="post" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">           
            
            <div className="form-group mb-3">
                <input type="file" name="profilePic" className="form-control" placeholder="Upload your file *" onChange={(e) => setFile(e.target.files[0])}/>
                {file && typeof file !== 'object' && <img className='img-fluid' src={file} alt={username} id='img1' style={{width:"200px", height:"200px", borderRadius:"50%"}}/>
                }
            </div>
            <div className="form-group mb-3">
                <input type="test" name="username" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="form-group mb-3">
                <input type="email" name="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group mb-3">                    
                <input type="password" name="password" className="form-control" placeholder="Password" autoComplete="false" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
                <button type="submit" className="btnSubmit btn btn-primary">Update User</button>

          </div>
          <div className="col-md-6"></div>
        </div>        
      </form>
    </div>
  );
};

export default UserEditItem;
