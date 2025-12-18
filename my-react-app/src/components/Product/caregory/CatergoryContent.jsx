import React from 'react';
import CategoryCard from './CategoryCard.jsx';
import ProductCard from '../Product/ProductCard.jsx';

const CatergoryContent = ({ Categories }) => {
  let content;

  switch (Categories) {
    case "career":
      content = <CategoryCard Name="Career Fields" tbName="careerfieldcategories"   route="career_fields"
/>;
      break;

    case "entry":
      content = <CategoryCard Name="Entry Levels" tbName="entrylevels" route="entry_levels" />;
      break;

    default:
      content = (
        <>
          <CategoryCard Name="Career Fields" tbName="careerfieldcategories" />
          <CategoryCard Name="Entry Levels" tbName="entrylevels" />
        </>
      );
  }

  return (
    <div className="product-container">
      {content}


    </div>
  );
};
export default CatergoryContent;