import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditProfile({ loginUser }) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: loginUser?.name,
        about: loginUser?.about,
        linkedin: loginUser?.socialLink?.linkedIn,
        github: loginUser?.socialLink?.github,
        portfolio: loginUser?.socialLink?.portFolio,
        country: loginUser?.country,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();

        if(!loginUser?._id){
            toast.error('Login user not found.');
            return ;
        }

        if (!formData.fullName || !formData.about){
            toast.error('Name and About are required.');
            return ;
        }
        
        if(formData.about.length > 65){

            toast.error(`About must be under 65 characters.`);
            return ;
        }

        try {
            const res = await axios.put(`http://localhost:9658/user/update-profile/${loginUser._id}`, {
                userData: formData
            });

            if(res.status === 200){
                navigate('/');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong.");
        }
    };

    return (
        <Container
            className="p-4 border rounded shadow-sm my-3"
            style={{ maxWidth: "600px", backgroundColor: "#f8f9fa" }}
        >
            <h2 className="text-center fw-bold text-info mb-4">LOGICHELP</h2>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <div className="mb-3">
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        variant="outlined"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        fullWidth
                        label="Country"
                        name="country"
                        variant="outlined"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        fullWidth
                        label="About"
                        name="about"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={formData.about}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        fullWidth
                        label="LinkedIn URL"
                        name="linkedin"
                        variant="outlined"
                        value={formData.linkedin}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        fullWidth
                        label="GitHub URL"
                        name="github"
                        variant="outlined"
                        value={formData.github}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        fullWidth
                        label="Portfolio URL"
                        name="portfolio"
                        variant="outlined"
                        value={formData.portfolio}
                        onChange={handleChange}
                    />
                </div>
                <div className="text-center">
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{ width: "100%" }}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Container>
    );
}
