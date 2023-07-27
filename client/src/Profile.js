import React from 'react';

const Profile = ({data}) => {
    if(!data) return <div>No data selected</div>
    return (
        <div>
            <h3>Profile</h3>
            <p>Name: {data.name}</p>
        </div>
    );
}

export default Profile;
