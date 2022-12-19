import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../user/Loader';
import InfiniteScroll from "react-infinite-scroll-component";
import PostItem from './PostItem';

const LatestPost = (props) => { 
   
    const {loading, posts, getAllPosts} = props.PostsData;
    // User is currently on this page
    const [page, setPage] = useState(1);
    // No of Records to be displayed on each page   
    const [recordsPerPage] = useState(3);

    useEffect(() => {
        getAllPosts();
        // eslint-disable-next-line
    },[])


    const indexOfLastRecord = page * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    // Records to be displayed on the current page
    const currentRecords = posts.slice(indexOfFirstRecord, 
        indexOfLastRecord);

    const nPages = Math.ceil(posts.length / recordsPerPage);

    // console.log("posts lenght = " + posts.length);
    // console.log("currentPage = " + page);
    // console.log("recordsPerPage = " + recordsPerPage);
    // console.log("indexOfLastRecord = " + indexOfLastRecord);
    // console.log("indexOfFirstRecord = " + indexOfFirstRecord);
    // console.log("currentRecords = " + currentRecords);
    // console.log("nPages = " + nPages);

  return (
    <>
      <div className="container my-5">
        <h2 className="" style={{marginTop:"100px"}}>
          Top Headlines
        </h2>
      </div>
      {loading && <Loader />}
      <InfiniteScroll
        dataLength={posts.length}
        next={currentRecords}
        hasMore={posts.length !== posts.length}
        loader={<Loader />}
      >
        <div className="container">
          <div className="row">           
                <PostItem posts={posts} ></PostItem>
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

export default LatestPost



