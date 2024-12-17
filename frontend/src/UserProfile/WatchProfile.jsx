import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import axios from 'axios';
import UserProfile from './UserProfile';

export default function WatchProfile({ loginUser }) {
    const { id } = useParams();
    const [currUser, setCurrUser] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const findUserById = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`https://logichelp-backend.onrender.com/user/get-user/${id}`);

                if (response.data.user) {
                    setCurrUser(response.data.user);
                }
            } catch (error) {
                setCurrUser();
            } finally {
                setIsLoading(false);
            }
        }

        if (id) {
            findUserById();
        }
    }, [id])

    if (isLoading) {
        return (
            <div className='col-12 py-5 text-center d-flex align-items-center justify-content-center'>
                <h3 className='opacity-75 m-0 me-3'>Loading</h3>
                <div class="spinner-border text-light"></div>
            </div>
        )
    }

    if (!currUser) {
        return (
            <div className='col-12 py-5'>
                <h2 className='fw-semibold text-secondary d-flex align-items-center justify-content-center'>User Not Found <ErrorOutlineIcon className='ms-1 text-danger fs-2' /></h2>
            </div>
        )
    }
    return (
        <div className='col-lg-6 col-md-10 mx-auto'>
            <UserProfile loginUser={loginUser} currUser={currUser} />
        </div>
    )
}
