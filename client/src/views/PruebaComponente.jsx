import Axios from '../hooks/useAxios';
import React from 'react'


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
    console.log(data)
  }

  return (
    <>
      <div className='container productCard'>
        {
          data.cart.slice(0, 3).map((data, i) => (
            <div key={i}  >
             <UserCart id={data.product} />
            </div>
          ))
        }
      </div>
      <div>

      </div>
    </>
  )
}

export default PruebaComponente
