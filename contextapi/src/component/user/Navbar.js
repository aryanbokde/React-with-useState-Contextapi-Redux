import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = () => {
  
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const hanldeLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  }
  return (
    <>
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">Navbar</Link>
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
                  <Link className="nav-link" to="/loader">Loader</Link>
                  </li>
                  {
                    user && 
                    <>
                    <li className="nav-item dropdown">
                      <Link className="nav-link dropdown-toggle" to={`/user/edituser/`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <img src={user.profilePic} alt={user.username} style={{width:"30px", height:"30px", borderRadius:"15px"}}/>
                      </Link>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to="/user/allposts" >All Posts</Link></li>
                        <li><Link className="dropdown-item" to="/user/addpost" >Add Post</Link></li>
                        <li><Link className="dropdown-item" to={`/user/editprofile/${user._id}`}>Edit Profile</Link></li>
                        <li><hr className="dropdown-divider"/></li>
                        <li><Link className="dropdown-item" to="/" onClick={hanldeLogout}>Logout</Link></li>
                      </ul>
                    </li>
                    </>
                  }                      
              </ul>
            </div>
        </div>
      </nav>
    </div>
    </>    
  )
}

export default Navbar
