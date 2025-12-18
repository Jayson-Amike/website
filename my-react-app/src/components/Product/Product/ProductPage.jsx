import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../../supabaseClient";

const ProductPage = () => {
  const location = useLocation();

  // data coming from navigate state
  const { table, category_id, category_name, description } =
    location.state || {};

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!table || !category_id) return;

    async function fetchProducts() {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("category_id", category_id);

      if (!error) setProducts(data || []);
    }

    fetchProducts();
  }, [table, category_id]);

  // safety check (direct page refresh)
  if (!location.state) {
    return <p>Category data not available.</p>;
  }

  return (
    <div>
      <h2>{category_name}</h2>
      <p>{description}</p>

      {products.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <p>Price: ${p.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
