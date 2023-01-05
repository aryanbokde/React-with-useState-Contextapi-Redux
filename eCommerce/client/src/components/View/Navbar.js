import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../images/shop.png";


const Navbar = () => {
  const history = useNavigate();
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandle = (e) => {
    e.preventDefault();
    if (keyword.trim()) {      
      history(`/products/${keyword}`);
    }else{
      history(`/products/`);
    }

    
  }
  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img src={logo} style={{ width:"30px"}} alt="Best E-coomerce app"/></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/About">About</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/products">Products</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/login">Login/Register</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                  </li>
                 
                      <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to={`/user/edituser/`} role="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img src='' alt="" style={{width:"30px", height:"30px", borderRadius:"15px"}}/>
                        </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/user/manage-post" >Manage Posts</Link></li>
                          <li><Link className="dropdown-item" to="/user/addpost" >Add Post</Link></li>
                          <li><Link className="dropdown-item" to={`/user/editprofile/`}>Edit Profile</Link></li>
                          <li><hr className="dropdown-divider"/></li>
                          <li><Link className="dropdown-item" to="/" >Logout</Link></li>
                        </ul>
                      </li>                    
              </ul>
              <form className="d-flex" onSubmit={searchSubmitHandle}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setKeyword(e.target.value) } value={keyword}/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </div>
        </div>
      </nav>
    </div>
    
    </>    
  )
}

export default Navbar
