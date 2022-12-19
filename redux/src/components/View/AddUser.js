import React from 'react'
import Denied from '../Denied';

const AddUser = () => {
    const data = 5;
  return (
    data ? (
        <div style={{ padding: "50px 0px", backgroundColor: "#eee"}}>
            <div className="container register-form">
                <div className="form">
                    <div className="note">
                        <h1 className='mb-4'>Add User</h1>
                    </div>
                    
                    <form className="form-content" method='post' >
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-3">
                                    <input type="file" name="profilePic" className="form-control" placeholder="Upload your file *" />
                                </div>
                                <div className="form-group mb-3">
                                    <input type="test" name="username" className="form-control"/>
                                </div>
                                <div className="form-group mb-3">
                                    <input type="email" name="email" className="form-control" />
                                </div>
                                
                                <div className="form-group mb-3">
                                    <input type="password" name="password" className="form-control" placeholder='Enter your new password'  autoComplete='false'/>
                                </div>
                            </div>
                            <div className="col-md-6">
                            </div>
                        </div>
                        <button type="submit" className="btnSubmit btn btn-primary">Update User</button>
                    </form>
                    
                </div>
            </div>
        </div>
    ) : (
        <Denied/>
    )
  )
}

export default AddUser
