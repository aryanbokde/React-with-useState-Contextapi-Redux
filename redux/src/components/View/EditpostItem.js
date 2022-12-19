import React, { useState } from 'react';
import axios from 'axios';
import { updatePostById } from '../../Reducers/postReducer';
import { useDispatch } from 'react-redux';
import {toast} from 'react-toastify';

const EditpostItem = (props) => {
    const post = props.data;
    const paramId = props.path;
    const dispatch = useDispatch();
    const [title, setTitle] = useState(post.title);
    const [file, setFile] = useState(post.photo);
    const [desc, setDesc] = useState(post.desc);
    const [cat, setCat] = useState(post.categories);
    // const [userId] = useState(post.userId);
    const imgpath = "http://localhost:5000/images/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {}
        const newupdatePost = {
            paramId : paramId
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            if (filename) {
                newupdatePost.photo = imgpath + filename;
            }            
            try {
                await axios.post("/upload", data);
            } catch (error) {
            }
        }

        if (!title) {
            errors.title = 'Title is required';
        }else if( title.length < 3) {
            errors.title = 'Title should be greater then 3 character';
        }else{
            newupdatePost.title = title; 
        }

        if (!cat) {
            errors.cat = 'Please select atleast one category';
        }else{
            newupdatePost.categories = cat; 
        }

        if (!desc) {            
            errors.desc = 'Description is required';
        }else if (desc.length < 3) { 
            errors.desc = 'Description should be greater then 3 character';            
        }else{
            newupdatePost.desc = desc; 
        }

        if (Object.keys(errors).length === 0) {            
            dispatch(updatePostById(newupdatePost)).then(()=>{
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
    <>
        <form className="form-content" method="post" onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <input type="file" name="file" className="form-control" placeholder="Upload your file *" onChange={(e)=>setFile(e.target.files[0])}/>                  
                {
                    file && typeof file !== 'object' &&
                    <img className='img-fluid' src={file} alt={title} id='img1' style={{width:"100%"}}/>
                }          
            </div>
            <div className="form-group mb-3">
                <input type="text" name="title" className="form-control" placeholder="Title *" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="form-group mb-3">
                <input type="text" name="cat" className="form-control" placeholder="Category *" value={cat} onChange={(e)=>setCat(e.target.value)}/>
            </div>
            <div className="form-group mb-3">
                <textarea name="desc" className="form-control" placeholder="Description *" rows="7" value={desc} onChange={(e)=>setDesc(e.target.value)}/>
            </div>
            <button type="submit" className="btnSubmit btn btn-primary">Update Post</button>
        </form>
    </>
  )
}

export default EditpostItem
