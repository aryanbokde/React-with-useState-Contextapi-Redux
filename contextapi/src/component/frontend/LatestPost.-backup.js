import React from 'react';
import PostItem from './PostItem';

const LatestPost = (props) => { 
  return (
    <div style={{padding: "50px 0px"}}>
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h2 className='my-4'>Lastest Blog</h2>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                  <PostItem props={props}/>                 
            </div>
        </div>
    </div>
      
  )
}

export default LatestPost
