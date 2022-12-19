import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Context } from '../context/Context';


const Addpost = (props) => {
    
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [cats, setCats] = useState([]);
    const [scat, setScat] = useState('');
    const { user } = useContext(Context);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/categories');
            setCats(res.data);
        }
        fetchPosts();
        //eslint-disable-next-line       
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username : user.others.username,
            title,
            desc,
            categories : scat,
        };
        
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;           
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("/upload", data);
                // console.log(res);
            } catch (error) {
            }      
                
        } 
        
        if(title === '' || desc === ''){
            props.showAlert("Title or description is empty..!", "danger");
        }else{
            try {
                await axios.post("/posts", newPost);
                props.showAlert("New post added successfully..!", "success");  
                window.location.reload();          
            } catch (error) {
                console.log(error);
                props.showAlert("Something went wrong or duplicate content..!", "danger");
            }
        }   
    }

    
    const onOptionChangeHandler = (event) => {
        setScat(event.target.value);
        // console.log("User Selected Value - ", event.target.value);
        // let options = event.target.options;
        // let value = [];
        // for (let i = 0, l = options.length; i < l; i++) {
        //     if (options[i].selected) {
        //     value.push(options[i].value);
        //     }
        // }
        // setScat(value);

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
                                    <input type="file" name="file" className="form-control" placeholder="Upload your file *" onChange={(e)=>setFile(e.target.files[0])} />
                                    { file && 
                                        <img className='img-fluid' src={URL.createObjectURL(file)} alt=""/>
                                    }
    
                                </div>
                                <div className="form-group mb-3">
                                    <input type="test" name="title" className="form-control" placeholder="Title *"  onChange={(e)=>setTitle(e.target.value)} />
                                </div>
                                <div className="form-group mb-3">
                                    <select onChange={onOptionChangeHandler} className="form-control" name='cats' value={scat} required >   
                                    <option value="">Select Category</option> 
                                        {cats.map((p)=>(                                            
                                            <option key={p._id} value={p.name}>
                                                {p.name}
                                            </option>
                                        ))}   
                                    </select>
                                </div>
                                <div className="form-group mb-3">
                                    <textarea name="desc" className="form-control" placeholder="Description *"  onChange={(e)=>setDesc(e.target.value)} rows="7" />
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

export default Addpost
