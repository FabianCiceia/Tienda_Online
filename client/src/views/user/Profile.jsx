import '../../styles/user/CardCartUser.css'

import Axios from '../../hooks/useAxios';
import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
// import CardProfile from './CardProfile';
import { Link } from "react-router-dom";
import UserCart from './UserCart';

const Profile = () => {

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
          <Link to={"../cart"}> <button type="button" className='button-primary'>Ir al carrito</button></Link>
          </div>
        </div>
        {/* <CardProfile /> */}
      </div>
    </>
  )
}

export default Profile
