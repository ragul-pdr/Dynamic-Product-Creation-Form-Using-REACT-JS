
import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";
import "./App.css";
import EditForm from "./EditForm";
import ViewForm from "./ViewForm";

const App = () => {


  const handleFormSubmit = (product) => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    storedProducts.push(product);
    localStorage.setItem("products", JSON.stringify(storedProducts));
  };

  const handleEditProduct = (index, product) => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    storedProducts[index] = product;
    localStorage.setItem("products", JSON.stringify(storedProducts));

  };

  const handleViewProduct=(index,product)=>{
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    storedProducts[index] = product;
    localStorage.setItem("products", JSON.stringify(storedProducts));


  }

  return (
    <BrowserRouter>
      <div className="main">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path="/create"
            element={<ProductForm onSubmit={handleFormSubmit} />}
          />
          <Route
            path="/edit/:index"
            element={<EditProduct onSubmit={handleEditProduct} />}
          />
          <Route
            path="/view/:index"
            element={<ViewProduct onSubmit={handleViewProduct} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

const EditProduct = ({ onSubmit }) => {
  const { index } = useParams();
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const existingProduct = storedProducts[index];

  const handleEditProduct = (product) => {
    onSubmit(index, product);

  };

  if (!existingProduct) {
    return <p>Product not found.</p>;
  }

  return (
    <EditForm
      existingProduct={existingProduct}
      onSubmit={handleEditProduct}
    />
  );
};



const ViewProduct = () => {
  const { index } = useParams();
  const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
  const existingProduct = storedProducts[Number(index)];

  return <ViewForm existingProduct={existingProduct} />;
};




export default App;
