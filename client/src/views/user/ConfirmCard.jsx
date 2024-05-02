import '../../styles/user/ConfirmCard.css';

import React, { useState } from 'react'
import Axios from '../../hooks/useAxios'
import UserCart from './UserCart';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { CiUser } from 'react-icons/ci';
import Not_image from '../../assets/Not_image.jpg';
const ConfirmCard = ({ total, tax, producto }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useContext(UserContext);

    const { data, isLoading, error, setData } = Axios("http://localhost:8000/api/auth/cart/list");
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
        <>
            <button type='button' className='ProductCartShop' onClick={() => { setIsOpen(true) }}>Comprar</button>

            {isOpen && (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal">
                        <div className='modalIzq'>
                            <div className="modalHeader">
                                <h2>Pantalla de compra</h2>
                                <h3><CiUser />{user.email}</h3>
                            </div>
                            <div className='modalProduc'>
                                {
                                    !producto ?
                                        data.cart.map((data, i) => (
                                            <div key={i} className='cardImagen'>
                                                <UserCart id={data.product} />
                                            </div>
                                        ))
                                        :
                                        <div className='cardImagen'>
                                            <img src={producto.product.imageUrl} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
                                            <div className='cardImagenInfo'>
                                                <h4>{producto.product.name}</h4>
                                                <p>{producto.product.description}</p>
                                            </div>
                                            <p>Precio Unitario: {producto.product.price}</p>
                                        </div>
                                }

                            </div>
                        </div>
                        <div className='modalDer'>
                            <h1>Resumen de compra</h1>
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
                            <div className="modal-content">
                                <button className='button-primary' onClick={() => { setIsOpen(false) }}>Confirmar compra</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ConfirmCard
