import React, { useContext, useEffect, useState } from 'react'
import Denied from '../Denied';
import { useLocation } from 'react-router-dom';
import CategoryContext from '../Context/category/CategoryContext';
import PostsConext from '../Context/posts/PostsContext';
import axios from "axios";
import Loader from './Loader';

const EditPost = (props) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const imgpath = "http://localhost:5000/images/";

    const CatsData = useContext(CategoryContext);
    const { cats, getAllCategory } = CatsData;

    const PostsData = useContext(PostsConext);
    const { updateByPostId } = PostsData;

    const location = useLocation();
    const currentPostId =  location.pathname.split("/")[3];    

    const [file, setFile] = useState('');
    const [title, setTitle] = useState('');
    const [cat, setCat] = useState('');
    const [desc, setDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const bigData = async() => {
        setLoading({ loading: true });
        getAllCategory();
        const res = await axios.get(`/posts/${currentPostId}`);
        const data = await res.data;
        await setFile(data.photo);
        await setTitle(data.title);
        await setDesc(data.desc);
        setCat(data.categories[0]);
        setLoading(false);
    }
    useEffect(() => {        
        bigData();
        // eslint-disable-next-line
    }, [currentPostId]);
    

    const handleSubmit = async(e) => {
        e.preventDefault();
        const errors = {}
        const updatePost = {}

        if (!user.username) {
            errors.username = 'You are not authorise to edit post';
        }else{
            updatePost.username = user.username;            
        }

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            if (filename) {
                updatePost.photo = imgpath + filename;
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
            updatePost.title = title; 
        }

        if (!cat) {
            errors.cat = 'Please select atleast one category';
        }else{
            updatePost.categories = cat; 
        }

        if (!desc) {            
            errors.desc = 'Description is required';
        }else if (desc.length < 3) { 
            errors.desc = 'Description should be greater then 3 character';            
        }else{
            updatePost.desc = desc; 
        }

        if (Object.keys(errors).length === 0) {
            updateByPostId(currentPostId, updatePost);
        }else{
            for (var k in errors) {
                if (errors.hasOwnProperty(k)) {
                   user[k] = errors[k];
                   props.showAlert(user[k], "danger");
                }
            }
        }
        
    }

    
    
  return (
    user ? (
        <div style={{ padding: "50px 0px", backgroundColor: "#eee"}}>
            <div className="container register-form">
                <div className="form row">
                    <div className='col-md-6'>
                    {loading ? 
                        <Loader></Loader>
                        :
                        title ?
                        <>
                        <div className="note">
                            <h1 className='mb-4'>Edit Post</h1>
                        </div>
                        <form className="form-content" method='post' onSubmit={handleSubmit}>                        
                            <div className="form-group mb-3">
                                <input type="file" name="file" className="form-control" placeholder="Upload your file *" onChange={(e)=>setFile(e.target.files[0])}/>
                                {
                                    file && typeof file !== 'object' &&
                                    <img className='img-fluid' src={file} alt="" id='img1' style={{width:"100%"}}/>
                                }
                            </div>
                            <div className="form-group mb-3">
                                <input type="test" name="title" className="form-control" placeholder="Title *" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                            </div>
                            <div className="form-group mb-3">
                                <select className="form-control" name='cats' value={cat} onChange={(e)=>setCat(e.target.value)}>   
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
                                <textarea name="desc" className="form-control" placeholder="Description *" rows="7" onChange={(e)=>setDesc(e.target.value)} value={desc}/>
                            </div> 
                            <button type="submit" className="btnSubmit btn btn-primary">Update Post</button>
                        </form> 
                        </>
                        :
                        <div>Data not found..!</div>
                    }        
                    
                    </div>
                    <div className='col-md-6'></div>                 
                </div>               
            </div>
        </div>            
        ) : (    
        <Denied/>
    )
  )
}

export default EditPost


