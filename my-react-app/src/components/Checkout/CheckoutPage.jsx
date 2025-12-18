import { useCart } from "../Cart/CartContext";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../supabaseClient";

const CheckoutPage = () => {
  const { cart, cartLoaded } = useCart();
  const { session } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [cardType, setCardType] = useState("VISA");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [street, setStreet] = useState("");

  // Fetch full product details
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

  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );

  // ✅ UPDATED handleSubmit to navigate to order confirmed page
  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally here you would process the payment
    console.log({
      cardType,
      cardName,
      cardNumber,
      expiry,
      cvv,
      country,
      postalCode,
      street,
      products,
    });

    // Redirect to Order Confirmed page
    navigate("/order-confirmed");
  };

  if (!cartLoaded || loading) return <p>Loading checkout...</p>;
  if (!products.length)
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/products/everything")}>
          Go Shopping
        </button>
      </div>
    );

  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        maxWidth: "1000px",
        margin: "2rem auto",
      }}
    >
      {/* Payment Form */}
      <div style={{ flex: 2 }}>
        <h2>Payment Details</h2>
        {!session && (
          <p style={{ color: "orange" }}>
            You are checking out as a guest. Please log in to complete your
            purchase.
          </p>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <label>
            Card Type:
            <select
              value={cardType}
              onChange={(e) => setCardType(e.target.value)}
            >
              <option value="VISA">VISA</option>
              <option value="MASTERCARD">MASTERCARD</option>
              <option value="AMEX">AMEX</option>
            </select>
          </label>

          <label>
            Cardholder Name:
            <input
              type="text"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              required
            />
          </label>

          <label>
            Card Number:
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              maxLength={16}
            />
          </label>

          <label>
            Expiry Date:
            <input
              type="month"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              required
            />
          </label>

          <label>
            CVV:
            <input
              type="text"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              maxLength={4}
            />
          </label>

          <label>
            Country:
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </label>

          <label>
            Postal Code:
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </label>

          <label>
            Street Address:
            <input
              type="text"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </label>

          <button type="submit" style={{ marginTop: "10px" }}>
            Submit Payment
          </button>
        </form>
      </div>

      {/* Cart Summary */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ccc",
          padding: "1rem",
          borderRadius: "8px",
        }}
      >
        <h3>Order Summary</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {products.map((product) => (
            <li
              key={product.id}
              style={{ marginBottom: "15px", borderBottom: "1px solid #eee" }}
            >
              <strong>{product.name}</strong>
              <p>
                Qty: {product.quantity} × ${product.price.toFixed(2)}
              </p>
              <p>Subtotal: ${(product.price * product.quantity).toFixed(2)}</p>
            </li>
          ))}
        </ul>
        <h4>Subtotal: ${subtotal.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default CheckoutPage;
