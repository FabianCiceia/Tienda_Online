import '../../styles/Cart.css'


import React, { useEffect, useState } from 'react'
import Axios from "../../hooks/useAxios"
import CardCart from '../../components/CartCard';
import axios from 'axios';
import ConfirmCard from './ConfirmCard';



function ShCart() {
    const [total, setTotal] = useState()
    const [tax, setTax] = useState();


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

    const handleOverlayClick = (event) => {
        if (event.target.classList.contains('modal-overlay')) {
            setIsOpen(false);
        }
    };



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
                    <ConfirmCard total={total} tax={tax} />
                </div>
            </div>
        </div>
    )

}

export default ShCart
