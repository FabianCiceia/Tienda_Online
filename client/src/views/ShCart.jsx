import React, { useEffect, useState } from 'react'
import Axios from "../hooks/useAxios"
import CardCart from '../components/CartCard';
import '../styles/Cart.css'
import axios from 'axios';
function ShCart() {
    const[total, setTotal] = useState()
    const[tax, setTax] = useState();
    function obtenerTotal() {
        // console.log(pront);
        axios
        .get(`http://localhost:8000/api/auth/cart/total`, { withCredentials: true })
        .then(res => {
            setTotal(Number(res.data.total.toFixed(2)));
            setTax(Number(res.data.tax.toFixed(2)))
            // console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    const baseURL =`http://localhost:8000/api/auth/cart/edit`;
    function addData(pront) {
        // console.log(pront);
        axios
        .post(`${baseURL}`, pront, { withCredentials: true })
        .then(res => {
            // Swal.fire({
            //     icon: "success",
            //     title: `fue cargado correctamente`,
            // });
            setCant(pront.quantity);
            // navigate("");
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: `Ha ocurrido un error`,
            });
            console.log(err);
        })
    }
    const { data, isLoading, error, setData } = Axios("http://localhost:8000/api/auth/cart/list");
    useEffect(()=>{
        obtenerTotal();
    },[data])
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
        // console.log(data)
    }
    return (
        <div className='containerCart'>
            <div className='listCart'>
                {
                    data.cart.map((data,i)=>(
                        <div key={i}>
                            {/* {data.quantity} */}
                            <CardCart setProduct={setData} products={data} />
                        </div>
                    ))
                }
            </div>
            <div className='orderCart'>
                <h1>resumen del pedido</h1>
                <div className='orderCartCost'>
                    <div>
                        <p>Sub total: </p><p>${(total)}</p>
                    </div>
                    <div>
                        <p>Impuestos estimados: </p><p>${(tax)}</p>
                    </div>
                    <div>
                        <p>Total a pagar: </p><p>${Number(total+tax).toFixed(2)}</p>
                    </div>
                </div>
                <div className='orderCartBuy'>
                    <button>Comprar</button>
                </div>
            </div>
        </div>
    )
    
}

export default ShCart
