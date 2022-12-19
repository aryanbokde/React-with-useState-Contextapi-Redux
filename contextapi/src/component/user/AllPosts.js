import React, { useContext, useEffect, useState } from 'react';
import Denied from '../Denied';
import PostsConext from '../Context/posts/PostsContext';
import Pagination from "./Pagination";
import PostItem from './PostItem';
import Loader from "./Loader";

const AllPosts = () => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    const postsData = useContext(PostsConext);
    const { loading, posts, getAllPosts } = postsData;
    
    useEffect(() => {
        const userName = user.username;
        getAllPosts(userName); 
        // eslint-disable-next-line       
    },[]);
    // User is currently on this page
    const [currentPage, setCurrentPage] = useState(1);
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(5);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Records to be displayed on the current page
    const currentRecords = posts.slice(indexOfFirstRecord, 
        indexOfLastRecord);

    const nPages = Math.ceil(posts.length / recordsPerPage);

    return (
        user ? (
            <div style={{ padding: "50px 0px", backgroundColor: "#eee"}}>
                <div className="container register-form">
                    <div className="form">
                        <div className="note">
                            <h1 className='mb-4'>All Posts</h1>
                            <hr className='hr'></hr>
                        </div>
                        {
                            loading ? (
                                <>
                                <Loader></Loader>  
                                </>
                            ) : (
                                
                                 posts.length > 0 ? 
                                    <>                       
                                    <PostItem currentRecords={currentRecords}/> 
                                    <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage }/>
                                    </>
                                    :                          
                                    <div className='col-12'>
                                        <h2 className='text-danger'>Blog Not Found..!</h2>
                                    </div>                               
                            )                
                        }                       
                    </div>
                </div>
            </div>
        ) : (
            <Denied/>
        )
    )
}

export default AllPosts

