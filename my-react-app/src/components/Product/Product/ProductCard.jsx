import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../../../supabaseClient";
import { useEffect, useState, useMemo } from "react";

const ProductCard = ({ Name, tbName, route, filtervalue }) => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState("default"); // State for sorting
  const navigate = useNavigate();
  const location = useLocation();

  const {
    table,
    category_id: categoryId,
    category_name,
    description,
  } = location.state || {};

  useEffect(() => {
    async function fetchProducts() {
      let query = supabase.from(tbName).select("*");

      if (table && categoryId) {
        query = query.eq(table, categoryId);
      }

      const { data, error } = await query;
      if (!error) setProducts(data || []);
    }

    fetchProducts();
  }, [tbName, table, categoryId]);

  // Logic to handle sorting based on the dropdown selection
  const sortedProducts = useMemo(() => {
    let result = [...products];
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "name-desc") {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }
    return result;
  }, [products, sortBy]);

  const title = category_name ? `${category_name} ${Name}` : Name;

  return (
    <div className="category-container">
      <div style={{ display: "flex", justifyContent: "space-between", justifyContent: "center", alignItems: "center" }}>
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

       
      </div>
       {/* Sorting Dropdown */}
        <div className="sort-container">
          <label htmlFor="sort" style={{ marginRight: "10px", fontWeight: "bold" }}>Sort By:</label>
          <select 
            id="sort" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A-Z</option>
            <option value="name-desc">Name: Z-A</option>
          </select>
        </div>

      <div className="category-card-container">
        {/* Render sortedProducts instead of products */}
        {sortedProducts.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => navigate(`/products/${route}/${product.id}`)}
          >
            <h3 className="product-title">{product.name}</h3>
            <img
              src={product.imageurl}
              alt={product.name}
              className="product-img"
            />
            <p className="product-issuer">{product.description}</p>
            <p className="product-price">{product.price}$</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
