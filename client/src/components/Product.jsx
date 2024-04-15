import React from 'react'
import { useNavigate } from 'react-router-dom';
import Not_image from '../assets/Not_image.jpg';
function Product({imageUrl, name, stock, price, id}) {
    const navigate = useNavigate(); 
    return (
        <div className='product' onClick={()=>{navigate(`../product/${id}`)}}>
            <div>
                <img src={imageUrl} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
                <h1>{name}</h1>
            </div>
            <div>
                <h2>{price}</h2>
                <p>{stock ? "✅ En stock" : "❌No hay stock"}</p>
            </div>
        </div>
    )
}

export default Product
