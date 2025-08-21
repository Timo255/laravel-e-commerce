import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const RelatedProducts = () => {
   const[relatedProducts, setRelatedProducts] = useState()

    useEffect(()=>{
      const getRelatedProducts = async () =>{
        const {data} = await axios.get(`${import.meta.env.VITE_APIURL}/api/relatedProducts`);
        console.log("related prds : ", data?.prds);
        setRelatedProducts(data?.prds)
      }

      getRelatedProducts();
    },[])
      
  return (
    <div id='Product-div'>
      <h1>Related Product</h1>
      <div className="dash"></div>
      <div className="product-img-div">
        {
         relatedProducts && relatedProducts.map(item => (
           <div className="product-img-details" key={item.uuid}>
             <div className="img-product">
                <Link to={`/shop/${item.uuid}`} onClick={() => window.scroll(0,0)}>
                  <img src={`${import.meta.env.VITE_APIURL}/images/${item.img}`} alt="" />
                </Link>
             </div>
             <div className="product-details">
               <div className="name-price">
                <p className="product-name">{item.nameShop}</p>
                <p className="price">{item.price}</p>
               </div> 
             </div>
           </div> 
         ))   
        }
      </div>
    </div>
  )
}

export default RelatedProducts