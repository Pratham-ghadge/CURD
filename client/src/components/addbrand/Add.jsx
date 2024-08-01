import React, { useState } from "react";
import "../addbrand/add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const [brand, setBrand] = useState({
    name: "",
    url: "",
    logo: null,
  });
  const navigate = useNavigate();// use for nvigation

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setBrand({ ...brand, [name]: value });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setBrand({ ...brand, logo: file });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", brand.logo);
    formData.append("name", brand.name);
    formData.append("url", brand.url);

    try {
      const response = await axios.post(
        "http://localhost:7000/api/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // used for sending files 
          },
        }
      );
      console.log(response.data);
      toast.success(response.data.msg, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.error("Error creating brand: ", error);
      toast.error("Failed to create brand", { position: "top-right" });
    }
  };

  return (
    <div className="addbrand">
      <div className="form-container">
        <Link to={"/"}>
          <i className="fa-solid fa-arrow-left">Back </i>
        </Link>
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Brand name"
              name="name"
              onChange={inputHandler}
              className="form-control"
              required
            />
            <i className="fa-brands fa-font-awesome"></i>
          </div>

          <div className="form-group">
            <input
              type="file"
              name="logo"
              onChange={handleUpload}
              className="form-control"
            />
            <i className="fa-solid fa-upload"></i>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Enter Brand url"
              name="url"
              onChange={inputHandler}
              className="form-control custom-file-input"
              required
            />
            <i className="fa-solid fa-link"></i>
          </div>
          <button type="submit">Add </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
