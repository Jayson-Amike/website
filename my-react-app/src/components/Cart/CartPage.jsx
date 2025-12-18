// src/components/Cart/CartPage.jsx
import { useCart } from "./CartContext";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { buyNowRedirect } from "../Buy/buyNowRedirect";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartLoaded } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();
  const navigate = useNavigate();

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
          return data ? { ...data, quantity: item.quantity, table: item.product_table } : null;
        })
      );

      setProducts(detailed.filter(Boolean));
      setLoading(false);
    }

    fetchProducts();
  }, [cart, cartLoaded]);

  if (!cartLoaded || loading) return <p>Loading cart...</p>;
  if (!products.length) return <p>Your cart is empty.</p>;

  const handleBuyNow = () => {
    buyNowRedirect(session, navigate);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {products.map((product) => (
        <div key={product.id} className="cart-item">
          <img src={product.imageurl} alt={product.name} width={80} />

          <div>
            <h2>{product.name}</h2>

            <div className="quantity-controls">
              <button
                onClick={() => updateQuantity(product.id, product.table, product.quantity - 1)}
              >
                −
              </button>
              <span>{product.quantity}</span>
              <button
                onClick={() => updateQuantity(product.id, product.table, product.quantity + 1)}
              >
                +
              </button>
            </div>

            <button onClick={() => removeFromCart(product.id, product.table)}>Remove Item</button>
          </div>
        </div>
      ))}

      {products.length > 0 && (
        <button onClick={handleBuyNow} style={{ marginTop: "20px" }}>
          Buy Now
        </button>
      )}
    </div>
  );
};

export default CartPage;

