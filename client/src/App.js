import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import Singlepost from './components/Singlepost';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from './components/register';
import Login from './components/login';
import { useContext } from 'react';
import { Context } from './context/Context';
import Addpost from './components/Addpost.js';
import Editpost from './components/Editpost';
import EditUser from './components/EditUser';
import Alert from './components/Alert';
import { useState } from 'react';
import Denied from './components/Denied';
import Categories from './components/Categories';

function App() {
  const { user } = useContext(Context);
  const [alert, setAlert] = useState(null);

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
        // window.location.reload();        
    }, 1000*60*60);
  }
}
  return (
    <div onLoad={unsetUser}>    
    <Router>
      <Navbar showAlert={showAlert}/>
      <Alert alert={alert}/>
        <Routes>

          <Route path='/' element={<Home showAlert={showAlert}/>}/>  
          <Route path='/about' element={<About showAlert={showAlert}/>}/>
          <Route path='/post/:id' element={<Singlepost showAlert={showAlert}/>}/>
          <Route path={'/unauthories'} element={<Denied showAlert={showAlert}/>}/>

          <Route path={"/backend/addpost"} element={<Addpost showAlert={showAlert}/>} />
          <Route path={"/backend/editpost/:id"} element={<Editpost showAlert={showAlert}/>} />
          <Route path={'/backend/edituser/:id'} element={<EditUser showAlert={showAlert}/>}/>
          <Route path={'/backend/categories'} element={<Categories showAlert={showAlert}/>}/>
          
          <Route path={'/register'} element={<Register showAlert={showAlert}/>}/>
          <Route path={'/login'} element={<Login showAlert={showAlert}/>}/>
          {/* {user ? (
              <>
              <Route path={"/backend/addpost"} element={<Addpost showAlert={showAlert}/>} />
              <Route path={"/backend/editpost/:id"} element={<Editpost showAlert={showAlert}/>} />
              <Route path={'/backend/edituser/:id'} element={<EditUser showAlert={showAlert}/>}/>
              </>
            ) : (
              <>
              <Route path={'/register'} element={<Register showAlert={showAlert}/>}/>
              <Route path={'/login'} element={<Login showAlert={showAlert}/>}/>
              </>
          )} */}
          
        </Routes>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;





