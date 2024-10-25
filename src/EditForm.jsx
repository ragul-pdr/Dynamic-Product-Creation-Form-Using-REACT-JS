import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/ProductForm.css";


const EditForm = ({ existingProduct, onSubmit }) => {
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
    mainImages: [],
    category: "",
    stock: 0,
    weight: 0,
    prices: [{ countryName: "", countryCode: "", price: "" }],
    nutritionValues: [{ name: "", amount: "", unit: "" }],
    specifications: [{ name: "", value: "" }],
  });

  useEffect(() => {
    if (existingProduct) {
      setFormData(existingProduct);
    }
  }, [existingProduct]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    console.log(e)
    if (type === "file") {
      if (name === "thumbnail") {
        setFormData({ ...formData, thumbnail: files[0] });
      } else {
        setFormData({ ...formData, mainImages: Array.from(files) });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addPriceField = () => {
    setFormData({
      ...formData,
      prices: [
        ...formData.prices,
        { countryName: "", countryCode: "", price: "" },
      ],
    });
  };

  const handlePriceChange = (index, e) => {
    const updatedPrices = formData.prices.map((price, i) =>
      i === index ? { ...price, [e.target.name]: e.target.value } : price
    );
    setFormData({ ...formData, prices: updatedPrices });
  };

  const addNutritionField = () => {
    setFormData({
      ...formData,
      nutritionValues: [
        ...formData.nutritionValues,
        { name: "", amount: "", unit: "" },
      ],
    });
  };

  const handleNutritionChange = (index, e) => {
    const updatedNutrition = formData.nutritionValues.map((nutrition, i) =>
      i === index
        ? { ...nutrition, [e.target.name]: e.target.value }
        : nutrition
    );
    setFormData({ ...formData, nutritionValues: updatedNutrition });
  };

  const addSpecificationField = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { name: "", value: "" }],
    });
  };

  const handleSpecificationChange = (index, e) => {
    const updatedSpecs = formData.specifications.map((spec, i) =>
      i === index ? { ...spec, [e.target.name]: e.target.value } : spec
    );
    setFormData({ ...formData, specifications: updatedSpecs });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData.title.length < 3 , formData.description.length < 10)
    if (formData.title.length < 3 || formData.description.length < 10) {
      alert("Kindly check your title and description");
      return;
    }
    if (formData.mainImages.length !== 3) {
      alert("You Must be upload exactly 3 main images");
      return;
    }
    if (
      formData.prices.some(
        (price) => !price.countryName || !price.countryCode || price.price <= 0
      )
    ) {
      alert("Please check your price");
      return;
    }

    onSubmit(formData);
    navigate("/")

  };

  return (
    <div className="product-cretae-page">
      <div className="inner-page">
        <h1 className="text-center my-4">Product Creation Form</h1>
        <form className="form-control" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title:</label>
            <input
              className="form-control"
              type="text"
              name="title"
              required
              minLength="3"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              name="description"
              required
              minLength="10"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Thumbnail Image:</label>
            <input
              className="form-control"
              type="file"
              name="thumbnail"
              accept="image/jpeg, image/png"
              
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Main Images:</label>
            <input
              className="form-control"
              type="file"
              name="mainImages"
              accept="image/jpeg, image/png"
              multiple
              
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <select
              className="form-control"
              name="category"
              required
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Home">Home</option>
            </select>
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input
              className="form-control"
              type="number"
              name="stock"
              min="0"
              required
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Weight in Grams:</label>
            <input
              className="form-control"
              type="number"
              name="weight"
              min="0"
              required
              value={formData.weight}
              onChange={handleChange}
            />
          </div>

          <br />
          <h3>Price by Currency</h3>
          {formData.prices.map((price, index) => (
            <div className="form-group" key={index}>
              <input
                className="form-control"
                type="text"
                name="countryName"
                placeholder="Enter Currency Name"
                value={price.countryName}
                onChange={(e) => handlePriceChange(index, e)}
                required
              />
              <input
                className="form-control"
                type="text"
                name="countryCode"
                placeholder="Enter Currency Code"
                value={price.countryCode}
                onChange={(e) => handlePriceChange(index, e)}
                required
              />
              <input
                className="form-control"
                type="number"
                name="price"
                placeholder=" Enter Price"
                value={price.price}
                onChange={(e) => handlePriceChange(index, e)}
                min="0"
                required
              />
            </div>
          ))}
          <button
            className="btn btn-dark"
            type="button"
            onClick={addPriceField}
          >
            Add Price Entry
          </button>
          <br />
          <br />
          <h3>Nutritional Values</h3>
          {formData.nutritionValues.map((nutrition, index) => (
            <div className="form-group" key={index}>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter Nutrient Name"
                value={nutrition.name}
                onChange={(e) => handleNutritionChange(index, e)}
              />
              <input
                className="form-control"
                type="number"
                name="amount"
                placeholder="Enter Amount"
                value={nutrition.amount}
                onChange={(e) => handleNutritionChange(index, e)}
              />
              <input
                className="form-control"
                type="text"
                name="unit"
                placeholder="Unit"
                value={nutrition.unit}
                onChange={(e) => handleNutritionChange(index, e)}
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-dark"
            onClick={addNutritionField}
          >
            Add Nutritional Value
          </button>
          <br />
          <br />
          <h3>Specifications</h3>
          {formData.specifications.map((spec, index) => (
            <div className="form-group" key={index}>
              <input
                className="form-control"
                type="text"
                name="name"
                placeholder="Enter Specification Name"
                value={spec.name}
                onChange={(e) => handleSpecificationChange(index, e)}
              />
              <input
                className="form-control"
                type="text"
                name="value"
                placeholder=" Enter a Value"
                value={spec.value}
                onChange={(e) => handleSpecificationChange(index, e)}
              />
            </div>
          ))}
          <button
            className="btn btn-dark "
            type="button"
            onClick={addSpecificationField}
          >
            Add Specification
          </button>
          <br />
          <div className="create-btn">
            <button id="createProduct" className="btn btn-success my-5" type="submit">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
