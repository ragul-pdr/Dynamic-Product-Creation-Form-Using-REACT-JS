import React from "react";
import "./Styles/ViewForm.css";

const ViewForm = ({ existingProduct }) => {
  if (!existingProduct) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="productView-Page">
      <div className="row row-1">
        <div className="col-12">
          <h2 className="">View Product</h2>
        </div>
      </div>
      <div className="row row-2 ">
        <div className="col-5">
          <img src="" alt="Loading..." />
        </div>
        <div className="col-6">
          <ul>
            <li>
              <strong>Title: </strong> &nbsp;
              {existingProduct.title}
            </li>
            <li>
              <strong>Description: </strong> &nbsp;
              {existingProduct.description}
            </li>
            <li>
              <strong>Category: </strong> &nbsp;
              {existingProduct.category}
            </li>
            <li>
              <strong>Stock: </strong> &nbsp;
              {existingProduct.stock}
            </li>
            <li>
              <strong>Weight: </strong> &nbsp;
              {existingProduct.weight}
            </li>
            <li>
              <strong>Prices: </strong> &nbsp;
              <ol>
                {existingProduct.prices.map((price, i) => (
                  <>
                    <li key={i}>
                      <strong> Currency Name:</strong> &nbsp;
                      {price.countryName}
                    </li>
                    <li key={i}>
                      <strong>Currency Code:</strong> &nbsp;
                      {price.countryCode}
                    </li>
                    <li key={i}>
                      {" "}
                      <strong> Currency Price: </strong> &nbsp;
                      {price.price}
                    </li>
                    <br />
                  </>
                ))}
              </ol>
            </li>
            <li>
              <strong>Nutrition Values: </strong> &nbsp;
              <ol>
                {existingProduct.nutritionValues.map((nutrition, i) => (
                  <>
                    <li key={i}>
                      <strong> Name:</strong> &nbsp;
                      {nutrition.name}
                    </li>
                    <li key={i}>
                      <strong> Amount :</strong> &nbsp;
                      {nutrition.amount}
                    </li>
                    <li key={i}>
                      <strong> Value: </strong> &nbsp;
                      {nutrition.value}
                    </li>
                    <br />
                  </>
                ))}
              </ol>
            </li>
            <li>
              <strong>Specifications: </strong>
              <ol>
                {existingProduct.specifications.map((spec, i) => (
                  <>
                    <li key={i}>
                      <strong> Name: </strong>
                      {spec.name}
                    </li>
                    <li key={i}>
                      {" "}
                      <strong>Value: </strong>
                      {spec.value}
                    </li>
                    <br />
                  </>
                ))}
              </ol>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ViewForm;
