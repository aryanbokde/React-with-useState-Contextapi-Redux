import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loading";

const LatestPost = () => {

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const pageSize = 3;

   const updateNew = async () => {
    
    const url = `http://localhost:5000/api/posts/all?page=${page}&limit=${pageSize}`;
    setLoading({ loading: true });
    let data = await fetch(url);  
    let parsedData = await data.json();
    setArticles(parsedData);    
    setLoading(false);   
  };

  useEffect(()=>{    
    updateNew();
    // eslint-disable-next-line
  }, []);
 

  const fetchMoreData = async () => {    
    const url = `http://localhost:5000/api/posts/all?page=${page + 1 }&limit=${pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setTotalResults(parsedData.length);
    setArticles(articles.concat(parsedData));
  }; 
 
  return (
    <>
      <div className="container my-5">
        <h2 className="text-center" style={{marginTop:"100px"}}>
          Top Headlines - 
        </h2>
      </div>
    {loading ? <Loader /> 
        :
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Loader />}
      >
        <div className="container">
          <div className="row">
        {
            
            articles.map((post) => {
              return (
                <div className="col-md-6" key={post._id}>
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        <div className="col p-4 d-flex flex-column position-static">
                            {<b className="d-inline-block mb-2 text-primary">{post.categories && post.categories}</b>}
                            <h5 className="mb-0">{post.title && post.title}</h5>
                            <div className="mb-1 text-muted">{post.createdAt}</div>
                            <p className="card-text mb-auto">{post.desc.slice(0, 88)}</p>
                            <Link to={`/post/${post._id}`} className="stretched-link">Continue reading</Link>
                        </div>
                        <div className="col-auto d-none d-lg-block">              
                            {post.photo && <img src={post.photo} className='' alt="" height="230" width="200"/>}
                        </div>
                    </div>
                </div>
              )
            }) 
            
        }
          </div>
        </div>
      </InfiniteScroll>
    }
    </>
  );
};

export default LatestPost;
