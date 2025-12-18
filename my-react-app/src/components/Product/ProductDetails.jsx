import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../supabaseClient";
import { useCart } from "../Cart/CartContext";

const ProductDetails = ({ table }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [addedMessage, setAddedMessage] = useState("");

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

  const handleAddToCart = async () => {
    await addToCart({
      product_table: table,
      product_id: product.id,
      quantity: Number(quantity),
    });
    setAddedMessage("Item added to cart!");
    setTimeout(() => setAddedMessage(""), 2000);
  };

  return (
    <div className="product-details">
      <div className="product-details-left">
        <img src={product.imageurl} alt={product.name} />
      </div>

      <div className="product-details-right">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
                    <p>{product.price}</p>


        <label>Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <div className="product-actions">
          <button className="add-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="buy-now">Buy Now</button>
        </div>

        {addedMessage && <p className="added-message">{addedMessage}</p>}
      </div>
    </div>
  );
};

export default ProductDetails;
