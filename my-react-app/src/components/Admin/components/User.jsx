import UserTable from "../../dummy_database/UserTable";
import AdminDashboard from "../AdminDashboardTemplate";


export default function Users() {
  const columns = Object.keys(UserTable[0]);

  return (
    <div>
      <AdminDashboard title="Users" description="List of all users in the system" />
      <h2>User Table</h2>
<table class="inventory-table">
        <thead>
          <tr>
            {columns.map((col) => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {UserTable.map((row, index) => (
            <tr id={UserTable[index].User_ID} key={index}>
              {columns.map((col) => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
