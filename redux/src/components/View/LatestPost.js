import React, { useState } from "react";
import { Link } from "react-router-dom";

const LatestPost = (props) => {

  const posts = props.data;  
  const [searchInput, setSearchInput] = useState(''); 
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (e) => {
    if (searchInput !== '') {
        const filteredData = posts.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
        setFilteredResults(filteredData)
    }
    else{
        setFilteredResults(posts)
    }
  }


  return (
    <div style={{ padding: "50px 0px" }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="my-4">Lastest Blog</h2>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-6">
           
          </div>
          <div className="col-6">
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control" type="text" placeholder="Search.." value={searchInput} onKeyUp={(e)=> searchItems(e.target.value)} onChange={(e) => setSearchInput(e.target.value)}/>
          </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {
          posts.length > 0 ? 
            searchInput.length > 1 ? (
              filteredResults.length > 0 ? 
                filteredResults.map((post) => (
                  <div className="col-md-6" key={post._id}>
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            {<b className="d-inline-block mb-2 text-primary">{post.categories && post.categories}</b>}
                            <h5 className="mb-0">{post.title && post.title}</h5>
                            <div className="mb-1 text-muted">{post.createdAt}</div>
                            <p className="card-text mb-auto">{post.desc.slice(0, 88)}</p>
                            <Link to={`/post/${post._id}`} className="stretched-link">Continue reading</Link>
                        </div>
                        <div className="col-auto d-none d-lg-block">              
                            {post.photo && <img src={post.photo} className='' alt="" height="230" width="200"/>}
                        </div>
                    </div>
                  </div>
                ))
              :
              <div className='col-md-6'>
                <h5 className='text-danger'>Blog Not Found..!</h5>
              </div>
            ):(
              posts.map((post) => (
                <div className="col-md-6" key={post._id}>
                  <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                      <div className="col p-4 d-flex flex-column position-static">
                          {<b className="d-inline-block mb-2 text-primary">{post.categories && post.categories}</b>}
                          <h5 className="mb-0">{post.title && post.title}</h5>
                          <div className="mb-1 text-muted">{post.createdAt}</div>
                          <p className="card-text mb-auto">{post.desc.slice(0, 88)}</p>
                          <Link to={`/post/${post._id}`} className="stretched-link">Continue reading</Link>
                      </div>
                      <div className="col-auto d-none d-lg-block">              
                          {post.photo && <img src={post.photo} className='' alt="" height="230" width="200"/>}
                      </div>
                  </div>
                </div>
                ))
            )
          
          :
          <div className='col-md-6'>
            <h5 className='text-danger'>Blog Not Found..!</h5>
          </div> 
          }
          
        </div>          
      </div>
    </div>
  );
};

export default LatestPost;
