import React from 'react';
// src/components/Cart/CartContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import supabase from "../../supabaseClient";
import { useAuth } from "../Auth/AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { session } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartLoaded, setCartLoaded] = useState(false);

  // Load cart on mount or when session changes
  useEffect(() => {
    async function loadCart() {
      if (session?.user) {
        // Logged-in user: fetch Supabase cart
        let { data } = await supabase
          .from("carts")
          .select("*")
          .eq("user_id", session.user.id);

        data = data || [];

        // Merge guest cart from localStorage
        const guestCart = JSON.parse(localStorage.getItem("cart") || "[]");
        for (const item of guestCart) {
          const exists = data.find(
            (d) =>
              d.product_id === item.product_id &&
              d.product_table === item.product_table
          );
          if (exists) {
            await supabase
              .from("carts")
              .update({ quantity: exists.quantity + item.quantity })
              .eq("id", exists.id);
          } else {
            await supabase.from("carts").insert({
              user_id: session.user.id,
              product_table: item.product_table,
              product_id: item.product_id,
              quantity: item.quantity,
            });
          }
        }

        // Refresh cart after merge
        const { data: mergedData } = await supabase
          .from("carts")
          .select("*")
          .eq("user_id", session.user.id);

        setCart(mergedData || []);
        localStorage.removeItem("cart"); // clear guest cart
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

  // Add to cart
  const addToCart = async ({ product_table, product_id, quantity }) => {
    if (quantity < 1) return;

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
      // Guest
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

  // Remove item from cart
  const removeFromCart = async (product_id, product_table) => {
    if (session?.user) {
      await supabase
        .from("carts")
        .delete()
        .eq("user_id", session.user.id)
        .eq("product_id", product_id)
        .eq("product_table", product_table);

      const { data } = await supabase
        .from("carts")
        .select("*")
        .eq("user_id", session.user.id);

      setCart(data || []);
    } else {
      setCart((prev) =>
        prev.filter(
          (item) =>
            !(item.product_id === product_id && item.product_table === product_table)
        )
      );
    }
  };

  // Update quantity
  const updateQuantity = async (product_id, product_table, quantity) => {
    if (quantity < 1) return;

    if (session?.user) {
      await supabase
        .from("carts")
        .update({ quantity })
        .eq("user_id", session.user.id)
        .eq("product_id", product_id)
        .eq("product_table", product_table);
    }

    setCart((prev) =>
      prev.map((item) =>
        item.product_id === product_id && item.product_table === product_table
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Clear entire cart
  const clearCart = async () => {
    if (session?.user) {
      await supabase.from("carts").delete().eq("user_id", session.user.id);
    }
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartLoaded,
        clearCart, // <- add this
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

