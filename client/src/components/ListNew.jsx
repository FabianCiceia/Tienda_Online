import React from 'react'
import Axios from "../hooks/useAxios"
import { Link } from 'react-router-dom';
import Not_image from '../assets/Not_image.jpg'
import Product from './Product';
import '../styles/Product.css'
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
    // if(data){
    //     console.log(data)
    // }
    return (
        <div className='newProduct'>
            {
                data.products.map((product, i) => (
                    <div key={i}>
                        <Product
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
