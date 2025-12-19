import React from 'react';
import { Outlet } from 'react-router-dom';
import "./Product.css";
const ProductLayout = () => {
  return (
    <div className="layout-shell">
      {/* <h1>Product Dashboard</h1> */}
      <Outlet /> {/* Child routes will inject ProductContent here */}
    </div>
  );
};

export default ProductLayout;
