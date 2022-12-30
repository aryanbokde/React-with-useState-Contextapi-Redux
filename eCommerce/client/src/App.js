import "react-toastify/dist/ReactToastify.css";
import './App.css';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont  from 'webfontloader';
import React, { useEffect } from 'react';
import { ToastContainer} from 'react-toastify';

import Header from './component/layout/Header/Header';
import Home from './component/layout/Home/Home';
import Footer from './component/layout/Footer/Footer';

function App() {

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Playfair Display"]
      }
    }); 
  }, []);
   
  return (   
    <div>
      
      <Router>
        <Header/> 
        <Routes>
          <Route exact path='/' element={<Home/>}/>
        </Routes>
        <Footer/>
      </Router>
      <ToastContainer/>
    </div>
  );
}

export default App;