import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from "../../hooks/useAxios"
import Card from '../../components/Card';
import PriceRange from '../../components/SearchProduct/PriceRange'

//estilado principal
import '../../styles/SearchProduct/SearchProduct.css'
//estilado de los filtro de la barra lateral
import '../../styles/SearchProduct/Filter.css'
import CategoryRange from '../../components/SearchProduct/CategoryRange';
import { Divider } from 'antd';

function SearchProduct() {
    const { search } = useParams();
    const[paguina, setPaguina] = useState(0);
    const[category, setCategory] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    const { data, isLoading, error, setData } = Axios(`http://localhost:8000/api/product/search?searchTerm=${search}&page=${paguina}`);
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

    if (data){
        console.log(data);
    }
    
    return (
        <div className='containerSearchProduct'>
            <div className='searchProducts'>
                <div className='searchProductfilter'>
                    <PriceRange
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        maxprice = {50000}
                        minprice = {2000}
                    />
                    <Divider/>
                    <CategoryRange
                        setCategory={setCategory}
                        category={category}
                    />
                </div>
                <div className='searchProductList'>
                    {
                        data.products.map((product, i) => (
                            <div className='searchProduct' key={i}>
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
            </div>
            <div className="pagination">
                
                <a onClick={()=>{setPaguina(1);scrollToTop()}}>1</a>
                <a onClick={()=>{setPaguina(2);scrollToTop()}}>2</a>
                <a onClick={()=>{setPaguina(3);scrollToTop()}}>3</a>
                <a onClick={()=>{setPaguina(4);scrollToTop()}}>4</a>
            </div>
        </div>
    )
}

export default SearchProduct
