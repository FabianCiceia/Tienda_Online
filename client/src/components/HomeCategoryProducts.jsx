import React, { useState } from 'react';
import Axios from "../hooks/useAxios";
// import { Link } from 'react-router-dom';

import Product from './Product';
import '../styles/CategoryProducts.css'
function categoryProducts({ category, name }) {
    const { data, isLoading, error, setData } = Axios(`http://localhost:8000/api/product/category/${category}`);
    const [currentPage, setCurrentPage] = useState(0);

    if (isLoading) {
        return (
            <div>Cargando</div>
        )
    }
    if (error) {
        return (
            <div>Esto va tardar más de lo pensado</div>
        )
    }

    const productsPerPage = 4;
    const totalPages = Math.ceil(data.products.length / productsPerPage);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className='container-categoryProducts'>
            <h1>{name}</h1>
        <div className='categoryProducts'>
            <button onClick={handlePrevPage} disabled={currentPage === 0}>{"<"}</button>
            {
                data.products.slice(currentPage * productsPerPage, (currentPage + 1) * productsPerPage).map((product, i) => (
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
            <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>{">"}</button>
        </div>
        </div>
    )
}

export default categoryProducts;


// http://localhost:8000/api/product/newest
