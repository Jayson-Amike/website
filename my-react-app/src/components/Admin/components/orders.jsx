import Order_Table from "../../dummy_database/OrderTable";
import AdminDashboard from "../AdminDashboardTemplate";


export default function Orders() {
  const columns = Object.keys(Order_Table[0]);

  return (
    <div>
      <AdminDashboard title="Orders" description="List of all orders in the system" />
      <h2>Order Table</h2>
<table class="inventory-table">
        <thead>
          <tr>
            {columns.map((col) => 
            
            {if (col === "User_ID") {
              return <th key={col}> <a href="/admin/users">{col}</a></th>;
            } else {
              return <th key={col} >{col}</th>;
            }})}
          </tr>
        </thead>
        <tbody>
          {Order_Table.map((row, index) => (
            <tr id={Order_Table[index].Order_ID} key={index}>
              {columns.map((col) => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
