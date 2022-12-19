import React, { useState } from "react";
import {createPost} from '../../Reducers/postReducer';
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { Navigate, useLocation } from "react-router-dom";

const AddPost = () => {
  const isLoggedIn = localStorage.getItem("token");
  const location = useLocation();
  const [file, setFile] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const imgpath = "http://localhost:5000/images/";
  const { loading } = useSelector((state) => state.post );
  const dispatch = useDispatch();


  const handleSubmit = async(e) => {

    e.preventDefault();
    const errors = {}
    const newPost = {
        title,
        desc,
        categories : "General",
    }
    
    if (!file) {
        errors.file = 'File is required';
    }else{
        const data = new FormData();
        const filename = Date.now() + file.name;           
        data.append("name", filename);
        data.append("file", file);
        newPost.photo = imgpath + filename;
        try {
            await axios.post("/upload", data);
        } catch (error) {
        }   
    }

    if (!title) {
        errors.title = 'Title is required';
    }else if( title.length < 3) {
        errors.title = 'Title should be greater then 3 character';
    }

    if (!desc) {            
        errors.desc = 'Description is required';
    }else if (desc.length < 3) { 
        errors.desc = 'Description should be greater then 3 character';
    }

    if (Object.keys(errors).length === 0) {
        dispatch(createPost(newPost)).then(()=>{
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
    
  }
  return (
    isLoggedIn ?
    <div style={{ padding: "50px 0px 100px 0px", backgroundColor: "#eee" }}>
      <div className="container register-form">
        <div className="form">
          <div className="note">
            <h1 className="mb-4">Add New Post</h1>
          </div>
          <form className="form-content" method="post" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">

                {loading ? 
                  <Loading/>
                  :
                  <>
                  <div className="form-group mb-3">
                    <input type="file" name="file" className="form-control" placeholder="Upload your file *" onChange={(e)=>setFile(e.target.files[0])}/>
                    { file && 
                        <img className='img-fluid' src={URL.createObjectURL(file)} alt=""/>
                    }
                  </div>
                  <div className="form-group mb-3">
                    <input type="test" name="title" className="form-control" placeholder="Title *" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                  </div>
                  {/* <div className="form-group mb-3">
                    <select name="catslist" className="form-control">
                      <option value="">Select Category</option>
                    </select>
                  </div> */}
                  <div className="form-group mb-3">
                    <textarea name="desc" className="form-control" placeholder="Description *" value={desc} onChange={(e)=>setDesc(e.target.value)} rows="5"/>
                  </div>
                  <button type="submit" className="btnSubmit btn btn-primary">Add Post</button>
                  </>
                }

              </div>
              <div className="col-md-6"></div>
            </div>
            
          </form>
        </div>
      </div>
    </div>
    :
    <>
    <Navigate to="/login" replace state={{ from: location.pathname }}/> {/*// <-- pass location in route state */}
    </>
  )
};

export default AddPost;
