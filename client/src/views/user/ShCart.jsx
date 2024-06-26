// import '../../styles/Cart.css'


import React, { useEffect, useState } from 'react'
import Axios from "../../hooks/useAxios"
import CardCart from '../../components/cart/CartCard';
import axios from 'axios';
import "../../styles/Cart.css"


function ShCart() {
    const [total, setTotal] = useState(0)
    const [tax, setTax] = useState(0);


    function obtenerTotal() {

        axios
            .get(`http://localhost:8000/api/auth/cart/total`, { withCredentials: true })
            .then(res => {
                setTotal(Number(res.data.total.toFixed(2)));
                setTax(Number(res.data.tax.toFixed(2)))
            })
            .catch(err => {
                return;
            })
    }
    const baseURL = `http://localhost:8000/api/auth/cart/edit`;
    function addData(pront) {
        axios
            .post(`${baseURL}`, pront, { withCredentials: true })
            .then(res => {
                setCant(pront.quantity);
            })
            .catch(err => {
                Swal.fire({
                    icon: "error",
                    title: `Ha ocurrido un error`,
                });
            })
    }
    const { data, isLoading, error, setData } = Axios("http://localhost:8000/api/auth/cart/list");
    useEffect(() => {
        obtenerTotal();
    }, [data])
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
    return (
        <div className='containerCart'>
            <div className='listCart'>
                {
                    data.cart.map((data, i) => (
                        <div key={i}>
                            {/* {data.quantity} */}
                            <CardCart setProduct={setData} products={data} />
                        </div>
                    ))
                }
            </div>
            <div className='orderCart container'>
                <h1>resumen del pedido</h1>
                <div className='orderCartCost'>
                    <div>
                        <p>Sub total: </p><p>₲ {(total)}</p>
                    </div>
                    <div>
                        <p>Impuestos estimados: </p><p>₲ {(tax)}</p>
                    </div>
                    <div>
                        <p>Total a pagar: </p><p>₲ {Number(total + tax).toFixed(0)}</p>
                    </div>
                </div>
                <div className='orderCartBuy'>
                    
                    {/* <ConfirmCard total={total} tax={tax} /> */}
                    <button className='button-primary' >Confirmar </button>
                </div>
            </div>
        </div>
    )

}

export default ShCart
