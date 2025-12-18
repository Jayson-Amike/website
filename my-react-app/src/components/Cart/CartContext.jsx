import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "../Auth/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { session } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false); // important for guests

  // Load cart on mount or when session changes
  useEffect(() => {
    async function loadCart() {
      if (session?.user) {
        const { data } = await supabase
          .from("carts")
          .select("*")
          .eq("user_id", session.user.id);
        setCart(data || []);
      } else {
        // Guest: load from localStorage
        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart);
      }
      setCartLoaded(true);
    }
    loadCart();
  }, [session]);

  // Keep guest cart in localStorage
  useEffect(() => {
    if (!session?.user && cartLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, session, cartLoaded]);

  const addToCart = async ({ product_table, product_id, quantity }) => {
    if (session?.user) {
      const existing = cart.find(
        (item) =>
          item.product_id === product_id && item.product_table === product_table
      );
      if (existing) {
        await supabase
          .from("carts")
          .update({ quantity: existing.quantity + quantity })
          .eq("id", existing.id);
      } else {
        await supabase.from("carts").insert({
          user_id: session.user.id,
          product_table,
          product_id,
          quantity,
        });
      }
      const { data } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", session.user.id);
      setCart(data || []);
    } else {
      setCart((prev) => {
        const existing = prev.find(
          (item) =>
            item.product_id === product_id && item.product_table === product_table
        );
        if (existing) {
          return prev.map((item) =>
            item.product_id === product_id && item.product_table === product_table
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product_table, product_id, quantity }];
      });
    }
  };

  const removeFromCart = async (product_id, product_table) => {
  if (session?.user) {
    // Wait for Supabase deletion to complete
    await supabase
      .from("carts")
      .delete()
      .eq("user_id", session.user.id)
      .eq("product_id", product_id)
      .eq("product_table", product_table);

    // Refresh the cart from Supabase after deletion
    const { data } = await supabase
      .from("carts")
      .select("*")
      .eq("user_id", session.user.id);

    setCart(data || []);
  } else {
    // Guest: just update local state (already works)
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.product_id === product_id && item.product_table === product_table)
      )
    );
  }
};

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cartLoaded }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
