import PostsConext from "./PostsContext";
import axios from 'axios';
import React, { useState } from "react";

const PostsState = (props) => {

    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    //Add New post
    const addNewPost = async(newPost) => {
        try {
            await axios.post("/posts", newPost);
            props.showAlert("New post added successfully..!", "success");                      
        } catch (error) {
            props.showAlert("Something went wrong or duplicate content..!", "danger");
        }
    }

    //Get all posts 
    const getAllPosts = async(userName) => {
        try {
            let res = "";
            setLoading({ loading: true });
            if (userName) {
                res = await axios.get('/posts/', { params: { username: userName } });
            }else{
                res = await axios.get('/posts/'); 
            }   
            const data = await res.data;     
            await setPosts(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    //Delete a Note
    const deletePost = async (deleteData) => {
        //Todo Api calls
        try {
            await axios.delete(`/posts/${deleteData.postId}`, {data:{username:deleteData.username}});
            props.showAlert("Post deleted successfully..!", "success");

        } catch (error) {
            console.log(error);
            props.showAlert("You can delete only your post..!", "danger");
        }
    }

    //Get post by PostId
    const postGetById = async (postId) => {
        //Todo Api calls
        try {
            setLoading({ loading: true });
            const res = await axios.get(`/posts/${postId}`);
            const data = await res.data;
            await setPosts(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    //Update Post By PostId
    const updateByPostId = async (updateId, data) => {
        //Todo Api calls
        try {
            await axios.put(`/posts/${updateId}`, data);
            props.showAlert("Post updated successfully..!", "success");
        } catch (error) {
            props.showAlert("Post update failed..!", "success");
        }
    }

    return(        
        <PostsConext.Provider value={{ loading, posts, getAllPosts, deletePost, addNewPost, postGetById, updateByPostId }}>
            {props.children}
        </PostsConext.Provider>
    )

}

export default PostsState