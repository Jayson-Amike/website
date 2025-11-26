import Product_Table from "../../dummy_database/ProductTable";
import AdminDashboard from "../AdminDashboardTemplate";


export default function Orders() {
  const columns = Object.keys(Product_Table[0]);

  return (
    <div>
      <AdminDashboard title="Orders" description="List of all orders in the system" />
      <h2>Order Table</h2>
<table class="inventory-table">
        <thead>
          <tr>
            {columns.map((col) => 
            <th key={col} >{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {Product_Table.map((row, index) => (
            <tr id={Product_Table[index].Product_ID} key={index}>
              {columns.map((col) => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
