
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Categories = () => {

    const [cats, setCats] = useState([]);
    
    // console.log(search);
    
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await axios.get('/categories');
            setCats(res.data);
        }
        fetchPosts();
        //eslint-disable-next-line       
    }, []);

  return (
    <div className='categories' style={{padding : "50px 0px"}}>
                <select name="cats">
                    <option value="">Select Category</option>
                    {cats.map((p)=>(
                        <option key={p._id} value={p.name}>
                            {p.name}
                        </option>
                    ))}   
                </select>
                   

    </div>
  )
}

export default Categories
