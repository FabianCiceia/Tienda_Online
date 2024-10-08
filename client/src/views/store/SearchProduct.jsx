import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from "../../hooks/useAxios"
import Card from '../../components/commun/Card';
import PriceRange from '../../components/search/PriceRange'
import axios from "axios";
//estilado principal
import '../../styles/search/SearchProduct.css'
//estilado de los filtro de la barra lateral
import '../../styles/search/Filter.css'
import CategoryRange from '../../components/search/CategoryRange';
import { Divider, Drawer, Pagination } from 'antd';
import { CiFilter } from "react-icons/ci";
function SearchProduct() {
    const { search } = useParams();
    const[page, setPage] = useState(0);
    const[valuefilter, setvaluefilter] = useState(true);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const[category, setCategory] = useState([]);
    const [minPrice, setMinPrice] = useState(null);
    const [maxPrice, setMaxPrice] = useState(null);

    const [open,setOpen] = useState(false)
    const onChange = (page) => {
        setPage(page);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        filter();
    };
    
        const onClose = () => {
            setOpen(false);
            filter();
        };
        const showDrawer = () => {
            setOpen(true);
        };

    const filter = () => {
        axios
            .get(`http://localhost:8000/api/product/search`, {
                params: {
                    searchTerm: search,
                    page: page,
                    costMin: minPrice,
                    costMax: maxPrice,
                    categories: category.join(','), 
                    pageSize: 20,
                },
                withCredentials: true
            })
            .then((response) => {
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
                console.log(error);
            });
    };
    useEffect(()=>{
        filter();
        setvaluefilter(true);
    },[search]);
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
    if(data){
        console.log(data);
        
    }
    return (
        <div className='containerSearchProduct'>
            <div className='searchProducts'>
                <div className='searchProductfilterMovile'>
                    <button className='button-primary filter' onClick={showDrawer}><CiFilter />Filtros</button>
                    <Drawer
                        title="Filtros"
                        placement={'left'}
                        closable={false}
                        onClose={onClose}
                        visible={open}
                        key={'left'}
                        width={'80%'}
                        className='Drawer'
                    >
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
                    </Drawer>
                </div>
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
