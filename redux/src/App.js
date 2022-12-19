
import './App.css';
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import {addToken} from './Reducers/authReducer';
import {useDispatch} from 'react-redux';

import Navbar from './components/View/Navbar';
import Footer from './components/View/Footer';
import Home from './components/View/Home';
import Login from './components/View/Login';
import Register from './components/View/Register';
import Loading from './components/View/Loading';
import About from './components/View/About';
import Denied from './components/View/Denied';
import ManagePosts from './components/View/ManagePosts';
import AddPost from './components/View/AddPost';
import EditPost from './components/View/EditPost';
import EditProfile from './components/View/EditProfile';
import Singlepost from './components/View/Singlepost';
import Demo from './components/View/Demo';



function App() {
  // const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(addToken());
    // eslint-disable-next-line
  },[]);
  
  return (
    <div>
      <ToastContainer/>
      <Router>        
        <Navbar/>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/post/:id' element={<Singlepost/>}/>
            <Route exact path='/demo' element={<Demo/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/loading' element={<Loading/>}/>
            <Route exact path='/denied' element={<Denied/>}/>
            <Route exact path='/login' element={<Login/>}/>            
            <Route exact path='/register' element={<Register/>}/>
            <Route exact path='/user/manage-post' element={<ManagePosts/>}/>
            <Route exact path='/user/addpost' element={<AddPost/>}/>
            <Route exact path='/user/editpost/:id' element={<EditPost/>}/>
            <Route exact path='/user/editprofile/:id' element={<EditProfile/>}/>
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
