
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState } from 'react';
import Header from './component/Header';
import Home from './component/frontend/Home';
import About from './component/frontend/About';
import Login from './component/frontend/Login';
import Register from './component/frontend/Register';
import Footer from './component/Footer';
import EditProfile from './component/user/EditProfile';
import AddPost from './component/user/AddPost';
import AddUser from './component/user/AddUser';
import EditPost from './component/user/EditPost';
import Alert from './component/Alert';
import AuthState from './component/Context/auths/AuthState';
import AllPosts from './component/user/AllPosts';
import PostsState from './component/Context/posts/PostsState';
import CategoryState from './component/Context/category/CategoryState';
import SinglePost from './component/frontend/SinglePost';
import Loader from './component/user/Loader';

function App() {

  const [alert, setAlert] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  
  const showAlert = (message, type) =>{
    setAlert({
      msg : message,
      type : type, 
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  }

  const unsetUser = () => {
    if (user !== null) {
      setTimeout(() => {
          localStorage.removeItem("user");          
          // console.log("working");
          window.location.reload();        
      }, 1000*60*60);
    }
  }

  return (
    <div onLoad={unsetUser}>
    <CategoryState showAlert={showAlert}>
      <PostsState showAlert={showAlert}>
        <AuthState showAlert={showAlert}>
          <Router>
            <Header/>
            <Alert alert={alert}/>
            <Routes>
              <Route exact path='/' element={<Home showAlert={showAlert}/>}/>
              <Route exact path='/about' element={<About showAlert={showAlert}/>}/>
              <Route exact path='/loader' element={<Loader showAlert={showAlert}/>}/>
              <Route exact path='/login' element={<Login showAlert={showAlert}/>}/>
              <Route exact path='/register' element={<Register showAlert={showAlert}/>}/>
              <Route exact path='/post/:id' element={<SinglePost showAlert={showAlert}/>}/>
              <Route exact path='/user/allposts' element={<AllPosts showAlert={showAlert}/>}/>
              <Route exact path='/user/adduser' element={<AddUser showAlert={showAlert}/>}/>
              <Route exact path='/user/editprofile/:id' element={<EditProfile showAlert={showAlert}/>}/>
              <Route exact path='/user/addpost' element={<AddPost showAlert={showAlert}/>}/>
              <Route exact path='/user/editpost/:id' element={<EditPost showAlert={showAlert}/>}/>
            </Routes>
            <Footer/>
          </Router>
        </AuthState>
      </PostsState>
    </CategoryState>
    </div>
  );
}

export default App;
