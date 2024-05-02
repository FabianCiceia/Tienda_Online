import React from 'react'
import Axios from '../../hooks/useAxios'
import Not_image from '../../assets/Not_image.jpg';

const UserCart = (product) => {
    const { id } = product
    const { data, isLoading, error, setData } = Axios(`http://localhost:8000/api/product/${id}`);
    if (isLoading) {
        return (
            <div>Cargando</div>
        )
    }
    if (error) {
        return (
            <div>Esto va tardar mas de lo pensado</div>
        )
    }
    if (data) {

    }
    return (
        <>
            <img src={data.product.imageUrl} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
            <div className='cardImagenInfo'>
                <h4>{data.product.name}</h4>
                <p>{data.product.description}</p>
            </div>
            <p>Precio Unitario: {data.product.price}</p>
        </>
    )
}

export default UserCart
