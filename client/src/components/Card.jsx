import React from 'react'
import { useNavigate } from 'react-router-dom';
import Not_image from '../assets/Not_image.jpg';
import { FiCheckSquare } from "react-icons/fi";

function Card({imageUrl, name, stock, price, id}) {
    const stockOn = ()=> {
        if(stock){
            return(
                <p className='stockOn'>
                    <FiCheckSquare/>En Stock
                </p>
            )
        }else{
            return(
                <p>
                    ❌No hay stock
                </p>
            )
        }
        
    }
    const navigate = useNavigate(); 
    return (
        <div className='cart' onClick={()=>{navigate(`../product/${id}`)}}>
            <div>
                <img src={imageUrl} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
                <h1>{name}</h1>
            </div>
            <div>
                <h2>{price}</h2>
                {stockOn()}
            </div>
        </div>
    )
}

export default Card
