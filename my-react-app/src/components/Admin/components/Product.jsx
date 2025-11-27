import Product_Table from "../../dummy_database/ProductTable";
import AdminDashboard from "../AdminDashboardTemplate";
import supabase from "../../../supabaseClient";
import { useEffect, useState } from "react"


export default function Orders() {
 const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")

      if (error) {
        console.error(error)
      } else {
        setProducts(data)
      }

      setLoading(false)
    }

    fetchProducts()
  }, [])

  if (loading) return <p>Loading...</p>

  const columns = Object.keys(products[0]);

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
          {products.map((row, index) => (
            <tr id={products[index].Product_ID} key={index}>
              {columns.map((col) => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
