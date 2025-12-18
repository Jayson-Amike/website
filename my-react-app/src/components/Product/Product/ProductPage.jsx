import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase from "../../../supabaseClient";
import ProductCard from "./ProductCard";
const { category, slug } = useParams();

const ProductPage = () => {
  const { category, name } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from(category)
        .select("*")
  .eq("slug", slug)
        .single();

      setProduct(data);
    }

    fetchProduct();
  }, [category, name]);

  if (!product) return <p>Loading...</p>;

  return <ProductCard product={product} isPage />;
};

export default ProductPage;
