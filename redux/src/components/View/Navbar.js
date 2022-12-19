import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUserByAuthToken } from "../../Reducers/authReducer";
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';

const Navbar = () => {
  const userLogedIn = localStorage.getItem("token");
  const nav = useNavigate();
  const {loading, data} = useSelector((state)=> state.auth);
  const userData = data;
  const dispatch = useDispatch();


  useEffect(() => {
    if (userLogedIn) {
      dispatch(getUserByAuthToken());
    }    
    // eslint-disable-next-line
  },[])

  const handleLogout = async() => {
    await localStorage.removeItem('token').then(()=>{
      setTimeout(() => {
          nav("/");
      }, 1000);      
    });
    toast.success("Logout Successfully");
  };

  // const searchItems = (searchValue) => {
  //   setSearchInput(searchValue);
  //   const filteredData = APIData.filter((item) => {
  //     return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
  // })
  // console.log(filteredData)
  // }

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
                  <Link className="nav-link" to="/loading">Loader</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/denied">Denied</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                  </li>
                  {  
                    loading ? <div>Loading menu...</div>: 
                     userLogedIn ? 
                      <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to={`/user/edituser/${userData._id}`} role="button" data-bs-toggle="dropdown" aria-expanded="true">
                        <img src={userData.profilePic} alt="" style={{width:"30px", height:"30px", borderRadius:"15px"}}/>
                        </Link>
                        <ul className="dropdown-menu">
                          <li><Link className="dropdown-item" to="/user/manage-post" >Manage Posts</Link></li>
                          <li><Link className="dropdown-item" to="/user/addpost" >Add Post</Link></li>
                          <li><Link className="dropdown-item" to={`/user/editprofile/${userData._id}`}>Edit Profile</Link></li>
                          <li><hr className="dropdown-divider"/></li>
                          <li><Link className="dropdown-item" to="/" onClick={handleLogout}>Logout</Link></li>
                        </ul>
                      </li>
                    : <div>Loading menu...</div>                    
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
