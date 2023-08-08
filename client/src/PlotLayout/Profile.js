import React, { useEffect } from 'react';

const Profile = ({data}) => {
    console.log('Profile props:', data);
    
    useEffect(() => {
        console.log('New data in Profile:', data);
    }, [data]); // The effect depends on 'data', so it runs whenever 'data' changes.
  
    if(!data) {
      return (
        <div className="card" style={{ width: "100%", height: "100%"}}>
            <h5 className="card-header">Instructions</h5>
            <div className="card-body">
                <p className="card-text">The data on the left plot is loading. 
                This can take up to 2 minutes. Once it loads, hover over points to 
                get data about the protein. Use mouse wheel to zoom, and pan using
                mouse. </p>
            </div>
        </div>
      );
    }

    return (
        <div className="card" style={{ width: "100%", height: "100%"}}>
            <h5 className="card-header">Name: {data.alias}</h5>
            <div className="card-body">
                <p className="card-text">ID: {data.id}</p>
                <p className="card-text">Annotation: {data.annotation}</p>
                <p className="card-text">Seq Len: {data.seq_len}</p>
            </div>
        </div>
    );
}

export default Profile;

