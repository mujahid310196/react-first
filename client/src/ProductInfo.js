import React, { useEffect, useState } from 'react';


function ProductInfo(product) {
    return <div>
    <div>
    <img src={product.image} alt={product.title} />
    </div>
    <div>
        <h1>{product.title}</h1>
        <p>{product.short_desc}</p>
        <p>{product.price}</p>
        <button>Inquiry Now</button>
    </div>
  </div>;
  }
  
  export default ProductInfo;