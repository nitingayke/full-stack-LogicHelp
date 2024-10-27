import React from 'react';

import "./UserProfile.css";
import UserData from './UserData';
import Consistency from './Consistency';


export default function UserProfile() {

    return (
        <div className="p-2 mt-4 mt-lg-0">
            <UserData />

            <Consistency />
            
        </div>
    )
}