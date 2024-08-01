import React, { useEffect, useState } from 'react';
import '../addbrand/add.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [brand, setBrand] = useState({
        name: "",
        logo:"",
        url: ""
    });
    const [file, setFile] = useState();

    const inputChange = (e) => {
        const { name, value } = e.target;
        setBrand({ ...brand, [name]: value });
    };

    useEffect(() => {
        axios.get(`http://localhost:7000/api/getone/${id}`)//getting id for update perticular Brand
            .then((response) => {
                setBrand(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [id]);

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('id', id); 
        try {
            const response = await axios.post("http://localhost:7000/api/upload", formData);
            console.log(response.data);
            toast.success('Image uploaded successfully!', { position: "top-right" });
            setBrand({ ...brand, logo: response.data.brand.logo });
        } catch (error) {
            console.error("Error uploading image: ", error);
            toast.error('Failed to upload image', { position: "top-right" });
        }
    };
    
    const submit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:7000/api/update/${id}`, brand);
            toast.success('Brand updated successfully!', { position: "top-right" });
            navigate("/");
        } catch (error) {
            console.log(error);
            toast.error('Failed to update brand', { position: "top-right" });
        }
    };

    return (
        <div className="addbrand">
            <div className="form-container">
                <Link to={"/"}> <i className="fa-solid fa-arrow-left"> Back </i> </Link>
                <form onSubmit={submit} encType="multipart/form-data">
                    <div className="form-group">
                        <input type="text" placeholder="Enter Brand name" name='name' value={brand.name} onChange={inputChange} className='form-control' required />
                        <i className="fa-brands fa-font-awesome"></i>
                    </div>
                    <div className="form-group">
                        <input type="file" name='logo' onChange={e => setFile(e.target.files[0])} className='form-control'  />
                        <i className="fa-solid fa-upload" onClick={handleUpload}></i>
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder='Enter Brand url' name='url' value={brand.url} onChange={inputChange} className='form-control' required />
                        <i className="fa-solid fa-link"></i>
                    </div>
                    <button type='submit'>Update</button>
                </form>
            </div>
        </div>
    );
};

export default Update;

