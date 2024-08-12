import React, { useState } from 'react'
import Axios from "../../hooks/useAxios"
import { Link } from 'react-router-dom';
import { CiSignpostR1 } from "react-icons/ci";
import { Drawer } from 'antd';
import LoadingCategory from '../skeleton/LoafingCategory';

function HomeListCategory() {
    const { data, isLoading, error, setData } = Axios("http://localhost:8000/api/product/list/category");
    const [open,setOpen] = useState(false);
    const onClose = () => {
        setOpen(false);
        filter();
    };
    const showDrawer = () => {
        setOpen(true);
    };
    if (isLoading){
        return(
            <div><LoadingCategory/></div>
        )
    }
    if (error){
        return(
            <div>Esto va tardar mas de lo pensado</div>
        )
    }
    
    if(data){
        console.log(data)
    }
    return (
        <div>
            <div className='category container'>
                <h1>Categorias</h1>
                {
                    data.map((data, i) => (
                        <div key={i} className='categoryLink'>
                            <CiSignpostR1/>
                            <Link to={`/store/category/${data}`} >{data}</Link>
                        </div>
                    ))
                }
            </div>
            <div className='categoryMovile'>
                <button className='button-primary' onClick={showDrawer}>Categorias</button>
                <Drawer
                    title="Categorias"
                    placement={'top'}
                    closable={false}
                    onClose={onClose}
                    visible={open}
                    key={'left'}
                    className='Drawer'
                >
                    {
                        data.map((data, i) => (
                            <div key={i} className='categoryLink'>
                                <CiSignpostR1/>
                                <Link to={`/store/category/${data}`} >{data}</Link>
                            </div>
                        ))
                    }
                </Drawer>
            </div>
        </div>
    )
}

export default HomeListCategory

// http://localhost:8000/api/product/list/category