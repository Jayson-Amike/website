import React from 'react';
import { MapPin, Share2, Award, CheckCircle } from 'lucide-react';
import './Product.css'; 
import CategoryCard from './CategoryCard.jsx';
import supabase from "../../supabaseClient";
import { useState, useEffect } from 'react';



const ProductLayout = () => {
  return (
    <div>

      {/* <div className="profile-banner"></div>

       <ProfileInfo />
       <select className="filter-select">
                  <option>Most Recent</option>
                  <option>Most Popular</option>
        </select>

      <Dashboard /> */}
      <div className='product-container'>
        <CategoryCard Name="Career Fields" tbName="careerfieldcategories" />
        <CategoryCard Name="Entry Levels" tbName="entrylevels" />
      </div>
      
    </div>
  );
};

export default ProductLayout;