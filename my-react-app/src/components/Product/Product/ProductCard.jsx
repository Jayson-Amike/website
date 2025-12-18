import { useNavigate, useLocation } from "react-router-dom";
import supabase from "../../../supabaseClient";
import { useEffect, useState } from "react";

const ProductCard = ({ Name, tbName, route, filtervalue }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 get data from navigation state
  const {
    table,
    category_id: categoryId,
    category_name,
    description,
  } = location.state || {};

  useEffect(() => {
    async function fetchProducts() {
      let query = supabase.from(tbName).select("*");

      if (table && categoryId) {
        query = query.eq(table, categoryId);
      }

      const { data, error } = await query;

      if (!error) setProducts(data || []);
    }

    fetchProducts();
  }, [tbName, table, categoryId]);

  const title = category_name ? `${category_name} ${Name}` : Name;

  return (
    <div className="category-container">
      <h1>{title}</h1>
      <p>{description}</p>

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
            <p>{product.price}$</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
