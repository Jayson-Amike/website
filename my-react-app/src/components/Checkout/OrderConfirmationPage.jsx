import React from 'react';
import { useNavigate } from "react-router-dom";

const OrderConfirmedPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>ðŸŽ‰ Order Confirmed!</h1>
      <p>Thank you for your purchase. Your order has been successfully placed.</p>
      <button onClick={() => navigate("/products/careers")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderConfirmedPage;

