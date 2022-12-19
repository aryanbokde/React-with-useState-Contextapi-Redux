import AuthContext from "./authContext";
import axios from "axios";
import React from "react";


const AuthState = (props) => {
    
   
    //Register a new user 
    const addUser = async(username, email, password, profilePic) => {
        try {
            await axios.post('/auth/register', {
                username, email, password, profilePic,
            });
            props.showAlert("Registration successfully", "success");
        } catch (error) {
            console.log(error);
            props.showAlert("Please try again..!", "danger");
        }        
    }

    //Login user 
    const userLogin = async(username, password) => {
        try {
            const res = await axios.post('/auth/login', {
                username, password,
            });            
            const user = res.data.user;
            localStorage.setItem('user', JSON.stringify(user));
            props.showAlert("Successfully login", "success");
        } catch (error) {
            console.log(error);
            props.showAlert("Please try again..!", "danger");
        }        
    }

    //Update user 
    const userUpdate = async(updateUser) => {
        
            try {
                await axios.put("/users/" + updateUser.userId, updateUser);
                const res = await axios.get('/users/' +  updateUser.userId);
                const user = res.data;
                localStorage.removeItem("user");
                localStorage.setItem('user', JSON.stringify(user));
                props.showAlert("User updated successfully..!", "success");
            } catch (error) {
                props.showAlert("Something went wrong, Please try again..!", "danger");
            }
            
    }

    //Get all user 
    // const getAllUsers = async() => {
        
        
    //         const res = await axios.get("/users/"); 
    //         console.log(res);
         
        
    // }

    

    return (
        <AuthContext.Provider value={{ addUser, userLogin, userUpdate }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;