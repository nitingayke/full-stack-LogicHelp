import React, { useState } from 'react';
import "./UserProfile.css";
import Avatar from '@mui/material/Avatar';
import UserData from './UserData';
import Consistency from './Consistency';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function UserProfile({ loginUser, currUser }) {
    const [changeProfile, setChangeProfile] = useState(false);
    const [image, setImage] = useState(null);
    const [updatedImage, setUpdatedImage] = useState(currUser?.image);
    const [isLoading, setIsLoading] = useState(false);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleChangeProfile = (status) => {
        setChangeProfile(status);
    }

    const handleUpload = async () => {

        if (!loginUser) {
            toast.error("Login user not found");
            return;
        }

        if (!image) {
            toast.error("Please select an image!");
            return;
        }

        const formData = new FormData();
        formData.append("userImage", image);

        try {
            setIsLoading(true);
            const response = await axios.post(`http://localhost:9658/user/upload/profile-image/${loginUser?._id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                setUpdatedImage(response.data.url);
                setImage();
            } else {
                toast.error("Failed to update profile. Please try again."); // print message 
            }
        } catch (error) {
            toast.error("Failed to update profile. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    if (changeProfile) {
        return (
            <div className='py-5 text-center'>
                <Avatar
                    alt={(loginUser?.username || "").toUpperCase()}
                    src={updatedImage || loginUser?._id}
                    sx={{ width: 180, height: 180 }}
                    className='mx-auto fs-1 fw-bold'
                />
                <input type="file" onChange={handleImageChange} className='border border-secondary mt-4' />
                <br />
                {
                    (!image)
                        ? <button className='mt-3 px-3 py-1 border-secondary border bg-transparent text-secondary fs-16'>Update</button>
                        : <button type='button' onClick={handleUpload} className='mt-3 px-3 py-1 border-secondary border bg-transparent text-light fs-16 hover-orange'>Update
                            {
                                isLoading && <div class="spinner-border spinner-border-sm ms-2" ></div>
                            }
                        </button>
                }
                <button
                    onClick={()=>handleChangeProfile(false)}
                    type='button'
                    className='mt-3 ms-1 px-3 py-1 border-secondary border bg-transparent text-light fs-16 hover-orange'>Cancel
                </button>
            </div>
        )
    }

    return (
        <div className="p-2 mt-4 mt-lg-0">
            <UserData loginUser={loginUser} currUser={currUser} handleChangeProfile={handleChangeProfile} />
            <Consistency currUser={currUser} />
        </div>
    )
}