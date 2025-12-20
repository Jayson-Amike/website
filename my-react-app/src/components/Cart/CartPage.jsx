import React from 'react';
import { useCart } from "./CartContext";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartLoaded } = useCart();
  const { session } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      if (!cartLoaded) return;

      if (!cart.length) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const detailed = await Promise.all(
        cart.map(async (item) => {
          const { data } = await supabase
            .from(item.product_table)
            .select("*")
            .eq("id", item.product_id)
            .single();

          return data
            ? { ...data, quantity: item.quantity, table: item.product_table }
            : null;
        })
      );

      setProducts(detailed.filter(Boolean));
      setLoading(false);
    }

    fetchProducts();
  }, [cart, cartLoaded]);

  if (!cartLoaded || loading) return <p>Loading cart...</p>;
  if (!products.length) return <p>Your cart is empty.</p>;

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  const handleBuyNow = () => {
    if (session) {
      navigate("/checkout");
    } else {
      localStorage.setItem("post_login_redirect", "/checkout");
      navigate("/login");
    }
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>

      {products.map((product) => (
        <div key={product.id} className="cart-item" style={{ marginBottom: "20px", display: "flex", alignItems: "center" }}>
          <img src={product.imageurl} alt={product.name} width={80} style={{ marginRight: "15px" }} />

          <div style={{ flex: 1 }}>
            <h2>{product.name}</h2>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>

            <div className="quantity-controls" style={{ display: "flex", alignItems: "center", margin: "10px 0" }}>
              <button
                onClick={() =>
                  updateQuantity(product.id, product.table, product.quantity - 1)
                }
                style={{ padding: "5px 10px" }}
              >
                -
              </button>

              <span style={{ margin: "0 10px" }}>{product.quantity}</span>

              <button
                onClick={() =>
                  updateQuantity(product.id, product.table, product.quantity + 1)
                }
                style={{ padding: "5px 10px" }}
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeFromCart(product.id, product.table)}
              style={{ background: "red", color: "white", padding: "5px 10px", border: "none", cursor: "pointer", marginRight: "10px" }}
            >
              Remove Item
            </button>
          </div>
        </div>
      ))}

      <h2>Total: ${totalPrice.toFixed(2)}</h2>

      <button
        onClick={handleBuyNow}
        style={{ background: "green", color: "white", padding: "10px 20px", border: "none", cursor: "pointer", marginTop: "20px" }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default CartPage;

