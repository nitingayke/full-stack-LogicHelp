import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserProfile from './UserProfile';

export default function WatchProfile({ loginUser }) {
    const { id } = useParams();
    const [currUser, setCurrUser] = useState();

    useEffect(() => {
        const findUserById = async () => {
            try {
                const response = await axios.get(`http://localhost:9658/user/get-user/${id}`);

                if (response.data.user) {
                    setCurrUser(response.data.user);
                }
            } catch (error) {
                setCurrUser();
            }
        }

        if(id){
            findUserById();
        }
    }, [id])

    return (
        <div className='col-lg-6 col-md-10 mx-auto'>
            <UserProfile loginUser={loginUser} currUser={currUser} />
        </div>
    )
}
