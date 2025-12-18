import { useCart } from "../Cart/CartContext";
import { useAuth } from "../Auth/AuthContext";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { cart } = useCart();
  const { session } = useAuth();
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <div style={{ textAlign: "center" }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/products/everything")}>
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h1>Checkout</h1>

      {!session && (
        <p style={{ color: "orange" }}>
          You are checking out as a guest. Please log in to complete your
          purchase.
        </p>
      )}

      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            {item.product_table} - {item.product_id} (Qty: {item.quantity})
          </li>
        ))}
      </ul>

      <button
        onClick={() => alert("Payment integration coming next")}
        style={{ marginTop: "20px" }}
      >
        Continue to Payment
      </button>
    </div>
  );
};

export default CheckoutPage;
