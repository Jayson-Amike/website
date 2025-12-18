import { useCart } from "./CartContext";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const CartPage = () => {
  const { cart, removeFromCart, cartLoaded } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch full product details
  useEffect(() => {
    async function fetchProducts() {
      if (!cartLoaded) return; // Wait until cart is loaded

      if (!cart.length) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const detailedProducts = await Promise.all(
        cart.map(async (item) => {
          const { data, error } = await supabase
            .from(item.product_table)
            .select("*")
            .eq("id", item.product_id)
            .single();
          if (!error) return { ...data, quantity: item.quantity, table: item.product_table };
          return null;
        })
      );

      setProducts(detailedProducts.filter(Boolean));
      setLoading(false);
    }

    fetchProducts();
  }, [cart, cartLoaded]);

  if (!cartLoaded || loading) return <p>Loading your cart...</p>;
  if (!products.length) return <p>Your cart is empty.</p>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {products.map((product) => (
        <div key={product.id} className="cart-item">
          <img src={product.imageurl} alt={product.name} width={80} />
          <div>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={() => removeFromCart(product.id, product.table)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartPage;
