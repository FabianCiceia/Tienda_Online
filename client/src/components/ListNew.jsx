import React from 'react'
import Axios from "../hooks/useAxios"
import { Link } from 'react-router-dom';
import Not_image from '../assets/Not_image.jpg'
import Card from './Card';
import '../styles/Card.css'
function ListNew() {
    const { data, isLoading, error, setData } = Axios("http://localhost:8000/api/product/newest");
    if (isLoading){
        return(
            <div>Cargando</div>
        )
    }
    if (error){
        return(
            <div>Esto va tardar mas de lo pensado</div>
        )
    }
    return (
        <div className='newProduct'>
            {
                data.products.map((product, i) => (
                    <div key={i}>
                        <Card
                            imageUrl={product.imageUrl} 
                            name={product.name}
                            price={product.price}
                            stock={product.stock}
                            id={product._id}
                        />
                    </div>
                ))
            }
        </div>
    )
    
    
}

export default ListNew

// http://localhost:8000/api/product/newest
