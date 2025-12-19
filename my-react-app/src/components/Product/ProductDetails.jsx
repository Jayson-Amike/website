import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../Auth/AuthContext";

const ProductDetails = ({ table }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .single();
      setProduct(data);
    };
    fetchProduct();
  }, [table, id]);

  if (!product) return <p>Loading product...</p>;

  const handleAddToCart = async () => {
    await addToCart({ product_table: table, product_id: product.id, quantity });
    setAddedMessage("Item added to cart!");
    setTimeout(() => setAddedMessage(""), 2000);
  };

  const handleBuyNow = async () => {
    await addToCart({ product_table: table, product_id: product.id, quantity });
    if (session) {
      navigate("/checkout");
    } else {
      localStorage.setItem("post_login_redirect", "/checkout");
      navigate("/login");
    }
  };

  return (
    <div className="product-details">
      <div className="product-details-left">
        <img src={product.imageurl} alt={product.name} />
      </div>

      <div className="product-details-right">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
                    <p>{product.price}$</p>


      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />

      <div className="product-actions">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleBuyNow}>Buy Now</button>
      </div>

      {addedMessage && <p>{addedMessage}</p>}
    </div>
    </div>
  );
};

export default ProductDetails;


