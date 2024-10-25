import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Styles/ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div className="container-fluid home">
      <div className="row row-one">
        <div className="col-12">
          <h1 className="container text-center mt-5">Dynamic Product Creation Form</h1>
        </div>
      </div>
      <div className="row row-two">
        <div className="col-12 pd-list">
          <div className="col-9">
            <p >Product List </p>
          </div>
          <div className="col-3">
            <span className="btn btn-success create-btn">
              <Link to="/create">Create New Product</Link>
            </span>
          </div>
        </div>
      </div>
      <div className="row row-three"></div>

      <div className="product-list-view container">
        <table className="table container">
          <thead className="table-dark">
            <tr>
              <th>No</th>
              <th scope="col">Title</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="table-data">
                <th>{index + 1}</th>
                <td scope="row">{product.title}</td>
                <td scope="row" className="table-btns">
                  <Link className="btn btn-info" to={`/view/${index}`}>
                    View
                  </Link>
                  <Link className="btn btn-warning mx-3" to={`/edit/${index}`}>
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
