import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../getbrand/brand.css";
import axios from "axios";
import toast from "react-hot-toast";

const Brand = ({ onLogout, isLoggedIn }) => {
  const [brands, setbrands] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:7000/api/getAll");
      setbrands(response.data);
    };

    fetchData();
  }, []);

  const deleteBrand = async (brandId) => {
    await axios
      .delete(`http://localhost:7000/api/delete/${brandId}`)
      .then((response) => {
        setbrands((prevbrand) =>
          prevbrand.filter((brand) => brand._id !== brandId)
        );
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="brandTable">
      <Link to={"/add"} className="addbutton">
        {" "}
        Add <i className="fa-solid fa-plus"></i>
      </Link>
      {isLoggedIn && (
        <button className="logoutbutton" onClick={onLogout}>
          Logout <i class="fa-solid fa-right-from-bracket"></i>
        </button>
      )}
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Brand Name</th>
            <th>Brand Logo</th>
            <th>Brand Url</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {brands.map((brand, index) => {
            return (
              <tr key={brand._id}>
                <td>{index + 1}</td>
                <td>{brand.name}</td>
                <td>
                  {" "}
                  <img
                    src={`http://localhost:7000/images/` + brand.logo}
                    alt="logo"
                    className="logo"
                  ></img>{" "}
                </td>

                <td>
                <a href={`https://${brand.url}`} target="_blank" rel="noopener noreferrer">
    Click here <i class="fa-solid fa-arrow-pointer"></i>
  </a>
                </td>
                <td className="action">
                  <button onClick={() => deleteBrand(brand._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <Link to={`/update/` + brand._id}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Brand;
