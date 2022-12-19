import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({data}) => {

    const d = new Date(data.createdAt);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthname = monthNames[d.getMonth()];
    let daydate = d.getDate();
    if (daydate < 10) {
        daydate = "0" + daydate;
    }else{
        daydate = d.getDate();
    }
    const date = monthname + "-" + daydate;
    const PF = "http://localhost:5000/images/";

  return (
        
            <div className="col-md-6">
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        {<b className="d-inline-block mb-2 text-primary">{data.categories[0]} </b>}
                        <h5 className="mb-0">{data.title}</h5>
                        <div className="mb-1 text-muted">{date}</div>
                        <p className="card-text mb-auto">{data.desc.slice(0, 88)}</p>
                        <Link to={`/post/${data._id}`} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        {data.photo && <img src={PF + data.photo} className='' alt={data.title} height="230" width="200"/>}
                    </div>
                </div>
            </div>
        
        
    
  )
}

export default Post 
 