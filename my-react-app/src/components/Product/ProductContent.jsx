import React from 'react';
import CategoryCard from './CategoryCard.jsx';

const ProductContent = ({ Categories }) => {
  let content;

  switch (Categories) {
    case "career":
      content = <CategoryCard Name="Career Fields" tbName="careerfieldcategories" />;
      break;
    case "entry":
      content = <CategoryCard Name="Entry Levels" tbName="entrylevels" />;
      break;
       case "everything":
      content = (
        <>
          <CategoryCard Name="Careers" tbName="careers" />
        </>
      );
      break;
    default:
      content = (
        <>
          <CategoryCard Name="Career Fields" tbName="careerfieldcategories" />
          <CategoryCard Name="Entry Levels" tbName="entrylevels" />
        </>
      );
  }

  return <div className="product-container">{content}</div>;
};

export default ProductContent;