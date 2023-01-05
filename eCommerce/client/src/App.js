
import './App.css';
import "react-toastify/dist/ReactToastify.css";

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer} from 'react-toastify';

import Navbar from './components/View/Navbar';
import Footer from './components/View/Footer';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import ProductDetail from './components/Products/ProductDetail';
import LoginSignup from './components/User/LoginSignUp';




function App() {
 
  
  return (
    <div>
      <ToastContainer/>
      <Router>        
        <Navbar/>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/products' element={<Products/>}/>
            <Route exact path='/product/:id' element={<ProductDetail/>}/>
            <Route path='/products/:keyword' element={<Products/>}/>
            <Route exact path='/login' element={<LoginSignup/>}/>
          </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
