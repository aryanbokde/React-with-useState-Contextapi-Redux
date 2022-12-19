import React, { useContext, useEffect, useState } from 'react';
import Denied from '../Denied';
import CategoryContext from '../Context/category/CategoryContext';
import PostsConext from '../Context/posts/PostsContext';
import axios from "axios";

const AddPost = (props) => {
    
    const CatsData = useContext(CategoryContext);
    const { cats, getAllCategory } = CatsData;
    const PostsData = useContext(PostsConext);
    const { addNewPost } = PostsData;
    const user = JSON.parse(localStorage.getItem('user'));
    const [file, setFile] = useState('');
    const [title, setTitle] = useState('');
    const [selectcat, setSelectedcat] = useState('');
    const [desc, setDesc] = useState('');
    const imgpath = "http://localhost:5000/images/";
    
    
    useEffect(() => {        
        getAllCategory();
        // eslint-disable-next-line
    }, []);

    
    const handleSubmit = async(e) => {

        e.preventDefault();
        const errors = {}
        const newPost = {
            username : user.username,
            title,
            desc,
            categories : selectcat,
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
                // console.log(res);
            } catch (error) {
            }   
        }

        if (!title) {
            errors.title = 'Title is required';
        }else if( title.length < 3) {
            errors.title = 'Title should be greater then 3 character';
        }

        if (!selectcat) {
            errors.selectcat = 'Please select atleast one category';
        }

        if (!desc) {            
            errors.desc = 'Description is required';
        }else if (desc.length < 3) { 
            errors.desc = 'Description should be greater then 3 character';
        }

        if (Object.keys(errors).length === 0) {
            addNewPost(newPost); 
        }else{
            for (var k in errors) {
                if (errors.hasOwnProperty(k)) {
                   user[k] = errors[k];
                   props.showAlert(user[k], "danger");
                }
            }
        }
    }

    const onOptionChangeHandler = (e) => {
        setSelectedcat(e.target.value);
    }
    
  return (
    user ? (
        <div style={{ padding: "50px 0px", backgroundColor: "#eee"}}>
            <div className="container register-form">
                <div className="form">
                    <div className="note">
                        <h1 className='mb-4'>Add New Post</h1>
                    </div>
    
                    <form className="form-content" method='post' onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <input type="file" name="file" className="form-control" placeholder="Upload your file *" onChange={(e)=>setFile(e.target.files[0])}/>
                                    { file && 
                                        <img className='img-fluid' src={URL.createObjectURL(file)} alt=""/>
                                    }
                                </div>
                                <div className="form-group mb-3">
                                    <input type="test" name="title" className="form-control" placeholder="Title *" onChange={(e)=>setTitle(e.target.value)} value={title}/>
                                </div>
                                <div className="form-group mb-3">
                                    <select name="catslist" className='form-control' onChange={onOptionChangeHandler} value={selectcat}>
                                        <option value="">Select Category</option>
                                        {
                                            cats.length > 0 &&
                                            cats.map((p)=>(
                                                <option key={p._id} value={p.name}>
                                                    {p.name}
                                                </option>
                                            ))
                                        
                                        }   
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                <textarea name="desc" className="form-control" placeholder="Description *"  onChange={(e)=>setDesc(e.target.value)} rows="7" value={desc}/>
                                </div>                            
                            </div>
                            <div className="col-md-6">
                                
                            </div>
                        </div>
                        <button type="submit" className="btnSubmit btn btn-primary">Add Post</button>
                    </form>
                    
                </div>
            </div>
        </div>            
        ) : (    
        <Denied/>
    )
  )
}

export default AddPost
