import React from 'react';

const Pagination = (props) => {
    const nPages = props.nPages;
    const currentPage = props.currentPage;
    const setCurrentPage = props.setCurrentPage;

    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const nextPage = (e) => {
        if(currentPage !== nPages) 
            setCurrentPage(currentPage + 1)
            
    }
    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }
    
    return (
        <nav className=''>
            <ul className='pagination justify-content-center'>
                <li className='page-item'>
                    <button className={`page-link next-btn ${currentPage === 1 ? 'disabled' : ''}`} onClick={prevPage} >Previous</button>
                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber} className={`page-item ${currentPage === pgNumber ? 'active' : ''}`}>
                        <button className='page-link page-link-btn' onClick={() => setCurrentPage(pgNumber)} >{pgNumber}</button>
                    </li>
                ))}
                <li className='page-item'>
                    <button  className={`page-link next-btn ${nPages === currentPage ? 'disabled' : ''}`} onClick={nextPage}>Next</button>
                    
                </li>
            </ul>
        </nav>
    )
}

export default Pagination;