import React from 'react'
import { useNavigate } from 'react-router-dom';
import Not_image from '../../assets/Not_image.jpg';
import { FiCheckSquare } from "react-icons/fi";
import UseImg from '../../hooks/UseImg';

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
        <div className='card' onClick={()=>{navigate(`../product/${id}`)}}>
            <div>
                
                <img src={UseImg(imageUrl[0])} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
                <h1>{name.length > 20 ? name.substring(0, 20) + '...' : name}</h1>
            </div>
            <div>
                <h2>₲ {price}</h2>
                {stockOn()}
            </div>
        </div>
    )
}

export default Card
