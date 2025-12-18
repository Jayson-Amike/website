import { useNavigate } from "react-router-dom";
import supabase from "../../../supabaseClient";
import { useEffect, useState } from "react";

const CategoryCard = ({ Name, tbName, route, filtervalue }) => {
  const [category, setcategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategory() {
      const { data, error } = await supabase.from(tbName).select("*");
      if (!error) setcategory(data || []);
    }

    fetchCategory();
  }, [tbName]);

  return (
    <div className="category-container">
      <h1>{Name}</h1>

      <div className="category-card-container">
        {category.map((category) => (
          <div
            className="product-card"
            key={category.id}
            onClick={() =>
  navigate("/products/careers", {
    state: {
      table: tbName,
      category_id: category.id,
      category_name: category.name,
      description: category.description
    }
  })
}

          >
            <h3 className="product-title">{category.name}</h3>
            <img
              src={category.imageurl}
              alt={category.name}
              className="product-img"
            />
            <p className="product-issuer">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
