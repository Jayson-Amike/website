import React from 'react';
import ProductCard from '../Product/ProductCard.jsx';

const ProductContent = () => {
  let content;
  content = <ProductCard Name="Careers" tbName="careers" route="careers" />;


  return (
    <div className="product-container">
      {content}


    </div>
  );
};
export default ProductContent;