import { useNavigate } from "react-router-dom";
import supabase from "../../../supabaseClient";
import { useEffect, useState } from "react";

const ProductCard = ({ Name, tbName, route, filtervalue }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const table = searchParams.get("table");
  const categoryId = searchParams.get("category_id");

  console.log("Filter Value:", filtervalue);
  console.log("Table Name:", tbName);
  console.log("Route:", route);

  console.log("searchParams:", searchParams.toString()=="");
  console.log("table:", table);
  console.log("categoryId:", categoryId);
  useEffect(() => {
    async function fetchProducts() {
      let query = supabase.from(tbName).select("*");

      // 👇 apply filter if provided
      // if (filtervalue?.column && filtervalue?.value !== undefined) {
      //   query = query.eq(filtervalue.column, filtervalue.value);
      // }
       if (table!=null && categoryId!=null) {
        query = query.eq(table, categoryId);
      }

      const { data, error } = await query;

      if (!error) setProducts(data || []);
    }

    fetchProducts();
  }, [tbName, filtervalue]);

  return (
    <div className="category-container">
      <h1>{Name}</h1>

      <div className="category-card-container">
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() =>
              navigate(`/products/${route}/${product.id}`)
            }
          >
            <h3 className="product-title">{product.name}</h3>
            <img
              src={product.imageurl}
              alt={product.name}
              className="product-img"
            />
            <p className="product-issuer">{product.description}</p>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
