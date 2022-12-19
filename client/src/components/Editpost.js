import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Context } from '../context/Context';
const Editpost = (props) => {
    const location = useLocation();
    const path = location.pathname.split("/")[3];

    const { user } = useContext(Context);
    
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const PF = "http://localhost:5000/images/";

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/posts/'+ path);
            setFile(res.data.photo);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        fetchPosts();
    }, [path]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatePost = {
            username : user.others.username,
            title,
            desc,
        };
        
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            if (filename) {
              updatePost.photo = filename;
            }            
            try {
                await axios.post("/upload", data);
            } catch (error) {
            }
        }
        if(title === '' || desc === ''){
            props.showAlert("Title or description is empty..!", "danger");
        }else{
            try {            
                await axios.put("/posts/" + path, updatePost);  
                props.showAlert("Post updated successfully..!", "success");          
                // window.location.reload();
            } catch (error) {
                console.log(error);
                props.showAlert("Something went wrong, or Duplicate Value..!", "danger");
            }
        }
    }

    const changeImage = (e) => {
        setFile(e.target.files[0]);
    };

  return (

        user ? (
            <div style={{ padding: "50px 0px", backgroundColor: "#eee"}}>
                <div className="container register-form">
                    <div className="form">
                        <div className="note">
                            <h1 className='mb-4'>Edit Post</h1>
                        </div>
                        <form className="form-content" method='post' onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group mb-3">
                                        <input type="file" name="file" className="form-control" placeholder="Upload your file *" onChange={changeImage}/>
                                        {/* { typeof file === 'object' && file !== null ?
                                            <img className='img-fluid' src={URL.createObjectURL(file)} alt=""/>
                                            
                                            :
                                            <img className='img-fluid' src={PF + file} alt="" id='img'/>
                                        } */}
                                        {
                                        file && typeof file !== 'object' &&
                                        <img className='img-fluid' src={PF + file} alt="" id='img1'/>
                                        }
                                        
                                        
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="test" name="title" className="form-control" placeholder="Title *"  onChange={(e)=>setTitle(e.target.value)} value={title}/>
                                    </div>
                                    <div className="form-group mb-3">
                                        <textarea name="desc" className="form-control" placeholder="Description *"  onChange={(e)=>setDesc(e.target.value)} value={desc} rows="7"/>
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
                    <h1 className="mb-4">Denied Access</h1>
                    </div>
                    <h1>403</h1>
                    <h2>Not this time, access forbidden!</h2>
                </div>
                </div>
            </div>
        )

    )
}
export default Editpost