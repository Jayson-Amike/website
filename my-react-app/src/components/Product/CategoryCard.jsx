import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import { useEffect, useState } from "react";

const CategoryCard = ({ Name, tbName, route }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from(tbName).select("*");
      if (!error) setProducts(data || []);
    }

    fetchProducts();
  }, [tbName]);

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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
