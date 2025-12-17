import supabase from "../../supabaseClient";
import { useEffect, useState } from "react"
const CategoryCard = ({Name, tbName}) => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from(tbName)
        .select("*")

      if (error) {
        console.error(error)
      } else {
        setProducts(data)
        // console.log(data)
      }

      setLoading(false)
    }


    fetchProducts()
  }, [])

  if (loading) return <p>Loading...</p>


  return(
  <div className="category-container">
          <h1>{Name}</h1>

    <div className="category-card-container">
      {products.map((product) => (
        
         <div className="product-card" key={product.id}>
          <h3 className="product-title">{product.name}</h3>

      <img src={product.imageurl} alt={product.title} className="product-img" />
      <p className="product-issuer">{product.description}</p>
      <p className="product-date">{product.jobtrend2025}</p>
      <button className="verify-btn">Verify</button>
    </div>
      ))}
    </div>
  </div>

  )
};

 

export default CategoryCard;