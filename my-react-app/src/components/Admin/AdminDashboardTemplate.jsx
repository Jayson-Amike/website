import Order from "./components/orders.jsx";
export default function AdminDashboard({ title, description }) {
  return (
    <div className="page">
      <h1>{title}</h1>
      <p>{description}</p>
      <Order />

    </div>
  );
}
