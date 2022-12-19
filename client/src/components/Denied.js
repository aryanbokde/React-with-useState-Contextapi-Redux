import React from 'react'


const Denied = () => {
  return (
    <div style={{ padding: "50px 0px", backgroundColor: "#eee" }}>
      <div className="container register-form">
        <div className="form text-center">
          <div className="note">
            <h1 className="mb-4">Denied Access</h1>
          </div>
          <h1>403</h1>
          <h2>Not this time, access forbidden!</h2>
        </div>
      </div>
    </div>
  );
}

export default Denied
