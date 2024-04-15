import React from 'react'
import { useParams } from 'react-router-dom'

function Product() {
    const { id } = useParams(); 
    return (
        <div>
            {id}
        </div>
    )
}

export default Product
