import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import supabase from "../../../supabaseClient";

const ProductPage = () => {
  const { route } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const table = searchParams.get("table");
  const categoryId = searchParams.get("category_id");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!table || !categoryId) return;

    async function fetchProducts() {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("category_id", categoryId);

      if (!error) setProducts(data || []);
    }

    fetchProducts();
  }, [table, categoryId]);

  return (
    <div>
      <h2>Products in {route}</h2>
      {products.map((p) => (
        <div key={p.id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;
