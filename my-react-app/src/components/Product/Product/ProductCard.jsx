const ProductCard = ({ product, isPage = false }) => {
  return (
    <div className={`product-card ${isPage ? "page" : ""}`}>
      <h1>{product.name}</h1>
      <img src={product.imageurl} alt={product.name} />
      <p>{product.description}</p>

      {isPage && (
        <button>Add to Cart</button>
      )}
    </div>
  );
};

export default ProductCard;
