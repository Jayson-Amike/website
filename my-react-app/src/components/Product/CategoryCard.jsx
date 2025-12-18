import { useNavigate } from "react-router-dom";
import supabase from "../../supabaseClient";
import { useEffect, useState } from "react";

const CategoryCard = ({ Name, tbName }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from(tbName).select("*");
      setProducts(data || []);
    }
    fetchProducts();
  }, []);

  return (
    <div className="category-container">
      <h1>{Name}</h1>

      <div className="category-card-container">
        {products.map((product) => (
          <div
            className="product-card"
            key={product.id}
            onClick={() => navigate(`/products/${tbName}/${product.id}`)}
          >
            <h3 className="product-title">{product.name}</h3>
            <img src={product.imageurl} className="product-img" />
            <p className="product-issuer">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
