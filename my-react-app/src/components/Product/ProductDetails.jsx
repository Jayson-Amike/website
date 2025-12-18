import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";

const ProductDetails = () => {
  const { table, id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .single();

      if (!error) setProduct(data);
    }

    fetchProduct();
  }, [table, id]);

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="product-details">
      {/* Left */}
      <div className="product-details-left">
        <img src={product.imageurl} alt={product.name} />
      </div>

      {/* Right */}
      <div className="product-details-right">
        <h1>{product.name}</h1>
        <p>{product.description}</p>

        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <div className="product-actions">
          <button className="add-cart">Add to Cart</button>
          <button className="buy-now">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
