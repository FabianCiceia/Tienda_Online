import '../styles/user/CardCartUser.css'

import Axios from '../hooks/useAxios';
import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
import CardProfile from './user/CardProfile';

import UserCart from './user/UserCart';

const PruebaComponente = () => {

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
  if (data) {
    //console.log(data)
  }

  return (
    <>
      <div className='profileUser'>


        <div className='container productCard'>
          <div className='cardTitleUser'>
            <CiShoppingCart className='cartLogo' />
            <h2> Productos en tu carrito</h2>
          </div >
          {
            data.cart.slice(0, 3).map((data, i) => (
              <div key={i} className='cardImagen'>
                <UserCart id={data.product} />
              </div>
            ))
          }
          <div className='cardFooterUser'>
            <button type="button" className='button-primary'>Ir al carrito</button>
          </div>
        </div>

        <CardProfile />
      </div>
    </>
  )
}

export default PruebaComponente
