import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from "../../hooks/useAxios"
import Card from '../../components/Card';
import PriceRange from '../../components/SearchProduct/PriceRange'
import axios from "axios";
//estilado principal
import '../../styles/SearchProduct/SearchProduct.css'
//estilado de los filtro de la barra lateral
import '../../styles/SearchProduct/Filter.css'
import CategoryRange from '../../components/SearchProduct/CategoryRange';
import { Divider, Pagination } from 'antd';

function SearchProduct() {
    const { search } = useParams();
    const[page, setPage] = useState(0);
    const[valuefilter, setvaluefilter] = useState(true);
    const { data, isLoading, error, setData } = Axios(`http://localhost:8000/api/product/search?searchTerm=${search}&page=${page}`);

    //variables para el filtro
    const[category, setCategory] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);

    const onChange = (page) => {
        console.log(page);
        setPage(page);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


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
        // console.log(data);
        
    }
    // console.log(category);
    const a = "http://tudominio.com/api/products/search?searchTerm=laptop&category=electronics&costMin=500&costMax=1500&page=2";
    const filter = () => {
        axios
            .get(`http://localhost:8000/api/product/search`, {
                params: {
                    searchTerm: search,
                    page: page,
                    costMin: minPrice,
                    costMax: maxPrice,
                    categories: category.join(','), 
                },
                withCredentials: true
            })
            .then((response) => {
                console.log(response.data);
                setData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    return (
        <div className='containerSearchProduct'>
            <div className='searchProducts'>
                <div className='searchProductfilter'>

                    <PriceRange
                        data={data}
                        minPrice={minPrice}
                        setMinPrice={setMinPrice}
                        maxPrice={maxPrice}
                        setMaxPrice={setMaxPrice}
                        rangeMaxPrice = {data.priceMax}
                        rangeMinPrice = {data.priceMin}
                        setvaluefilter={setvaluefilter}
                        valuefilter={valuefilter}
                    />

                    <Divider/>
                    <CategoryRange
                        setCategory={setCategory}
                        category={category}
                        plainOptions = {data.categories}
                    />
                    <button className='button-primary' onClick={()=>filter()}>Aplicar filtros</button>
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
            <Pagination
            onChange={onChange}
            current={page}
            className="pagination"
            hideOnSinglePage={true} 
            simple 
            defaultCurrent={2} 
            total={data.totalPages*10}
            />
        </div>
    )
}

export default SearchProduct
