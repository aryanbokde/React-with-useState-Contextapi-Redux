import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';

const Navbar = (props) => {
  const { user, dispatch } = useContext(Context);
  const navigate = useNavigate();
  


  const hanldeLogout = (e) => {
    e.preventDefault();
    dispatch({type:"LOGOUT"});
    props.showAlert("Logout successfully", "success");
    navigate('/login');
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
               
                {
                !user ? 
                <>
                  <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                </>   
                 : 
                <>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to={`/backend/edituser/${user.others._id}`} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={user.others.profilePic} style={{width:"30px", height:"30px", borderRadius:"15px"}} alt={user.others.username}/>
                    </Link>
                    <ul className="dropdown-menu">
                      <li><Link className="dropdown-item" to="/backend/addpost" >Add Post</Link></li>
                      <li><Link className="dropdown-item" to={`/backend/edituser/${user.others._id}`} >Setting</Link></li>
                      <li><Link className="dropdown-item" to="/backend/categories">Categories</Link></li>
                      <li><hr className="dropdown-divider"/></li>

                      <li><Link className="dropdown-item" to="/" onClick={hanldeLogout}>Logout</Link></li>
                    </ul>
                  </li>                   
                </>                
                }    
                       
            </ul>
            <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
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
