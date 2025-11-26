import Order_Table from "../../dummy_database/OrderTable";

export default function Orders() {
  const columns = Object.keys(Order_Table[0]);

  return (
    <div>
      <h2>Order Table</h2>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {columns.map((col) => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {Order_Table.map((row, index) => (
            <tr key={index}>
              {columns.map((col) => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
