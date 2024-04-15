import React from 'react'
import Axios from "../hooks/useAxios"
import { Link } from 'react-router-dom';
function HomeListCategory() {
    const { data, isLoading, error, setData } = Axios("http://localhost:8000/api/product/list/category");
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
        <div className='category'>
            {
                data.map((data, i) => (
                    <Link className='categoryLink' to={`/store/category/${data}`} key={i}>{data}</Link>
                ))
            }
        </div>
    )
}

export default HomeListCategory

// http://localhost:8000/api/product/list/category