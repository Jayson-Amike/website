import React from 'react';
import { useCart } from "../Cart/CartContext";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

const CheckoutPage = () => {
  const { cart, cartLoaded, clearCart } = useCart();
  const { session } = useAuth();
  const navigate = useNavigate();

  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Payment form state
  const [cardType, setCardType] = useState("VISA");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");

  const [errors, setErrors] = useState({});

  // Fetch full career details based on cart
  useEffect(() => {
    async function fetchCareers() {
      if (!cartLoaded) return;

      if (!cart.length) {
        setCareers([]);
        setLoading(false);
        return;
      }

      const detailed = await Promise.all(
        cart.map(async (item) => {
          const { data, error } = await supabase
            .from("careers") // always careers table
            .select("id, name, price, inventory")
            .eq("id", item.product_id)
            .single();
          if (error) return null;
          return data
            ? { ...data, quantity: item.quantity }
            : null;
        })
      );

      setCareers(detailed.filter(Boolean));
      setLoading(false);
    }

    fetchCareers();
  }, [cart, cartLoaded]);

  const subtotal = careers.reduce(
    (acc, career) => acc + career.price * career.quantity,
    0
  );

  // Simple form validation
  const validateForm = () => {
    const newErrors = {};
    if (!/^[A-Za-z\s]+$/.test(cardName)) newErrors.cardName = "Cardholder name must contain only letters";
    if (!/^\d{16}$/.test(cardNumber)) newErrors.cardNumber = "Card number must be 16 digits";
    if (!/^\d{3}$/.test(cvv)) newErrors.cvv = "CVV must be 3 digits";
    if (!/^[A-Za-z\s]+$/.test(country)) newErrors.country = "Country must contain only letters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Confirm order and reduce inventory
  const confirmOrder = async () => {
    try {
      // Check inventory
      for (const career of careers) {
        if (career.inventory < career.quantity) {
          throw new Error(`Not enough stock for ${career.name}. Available: ${career.inventory}`);
        }
      }

      // Reduce inventory
      for (const career of careers) {
  // career.inventory is the foreign key pointing to inventory.id
  const { data, error } = await supabase
    .from("inventory")
    .select("quantity")
    .eq("id", career.inventory)
    .single();

  if (error) throw new Error(error.message);

  if (data.quantity < career.quantity) {
    throw new Error(`Not enough stock for ${career.name}. Available: ${data.quantity}`);
  }

  // Update the quantity in the inventory table
  const { error: updateError } = await supabase
    .from("inventory")
    .update({ quantity: data.quantity - career.quantity })
    .eq("id", career.inventory);

  if (updateError) throw new Error(updateError.message);
}

      // Save order if user is logged in
      if (session?.user) {
        const { data: orderData, error: orderError } = await supabase
          .from("orders")
          .insert([{ user_id: session.user.id, total: subtotal, status: "confirmed" }])
          .select();

        if (orderError) throw new Error(orderError.message);

        const orderId = orderData[0].id;

        // Insert order items
        for (const career of careers) {
          await supabase.from("orderitems").insert([
            {
              order_id: orderId,
              product_id: career.id,
              quantity: career.quantity,
            },
          ]);
        }
      }

      // Clear cart
      await clearCart();

      navigate("/order-confirmed");
    } catch (err) {
      alert("Error confirming order: " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    await confirmOrder();
  };

  if (!cartLoaded || loading) return <p>Loading checkout...</p>;
  if (!careers.length)
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/products/everything")}>Go Shopping</button>
      </div>
    );

  return (
    <div style={{ display: "flex", gap: "2rem", maxWidth: "1000px", margin: "2rem auto" }}>
      {/* Payment Form */}
      <div style={{ flex: 2 }}>
        <h2>Payment Details</h2>
        {!session?.user && <p style={{ color: "orange" }}>You are checking out as a guest. Please log in to complete your purchase.</p>}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label>
            Card Type:
            <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
              <option value="VISA">VISA</option>
              <option value="MASTERCARD">MASTERCARD</option>
              <option value="AMEX">AMEX</option>
            </select>
          </label>

          <label>
            Cardholder Name:
            <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
            {errors.cardName && <p style={{ color: "red" }}>{errors.cardName}</p>}
          </label>

          <label>
            Card Number:
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required maxLength={16} />
            {errors.cardNumber && <p style={{ color: "red" }}>{errors.cardNumber}</p>}
          </label>

          <label>
            Expiry Date:
            <input type="month" value={expiry} onChange={(e) => setExpiry(e.target.value)} required />
          </label>

          <label>
            CVV:
            <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} required maxLength={3} />
            {errors.cvv && <p style={{ color: "red" }}>{errors.cvv}</p>}
          </label>

          <label>
            Country:
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
            {errors.country && <p style={{ color: "red" }}>{errors.country}</p>}
          </label>

          <label>
            Postal Code:
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
          </label>

          <label>
            Street Address:
            <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} required />
          </label>

          <button type="submit" style={{ marginTop: "10px" }}>Submit Payment</button>
        </form>
      </div>

      {/* Cart Summary */}
      <div style={{ flex: 1, border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>
        <h3>Order Summary</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {careers.map((career) => (
            <li key={career.id} style={{ marginBottom: "15px", borderBottom: "1px solid #eee" }}>
              <strong>{career.name}</strong>
              <p>Qty: {career.quantity} Ã— ${career.price.toFixed(2)}</p>
              <p>Subtotal: ${(career.price * career.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <h4>Subtotal: ${subtotal.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default CheckoutPage;

