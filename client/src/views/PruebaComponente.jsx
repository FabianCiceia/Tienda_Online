import React, { useEffect } from 'react'
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Axios from "../hooks/useAxios"
import CardCart from '../components/CartCard';


function PruebaComponente() {

  const { data, isLoading, error, setData } = Axios("http://localhost:8000/api/auth/cart/list"); //Datos de el carrito... Devuelve un array donde el id es la variable producto

  const ProductosCard = () => {
    const id = products.product
    const { dataProducto , isLoading, errorProducto, setData } = Axios(`http://localhost:8000/api/product/${id}`);
  }




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
    // console.log(data)
  }

  // const { data, isLoading, error, setData } = Axios(`http://localhost:8000/api/product/${id}`); Obtiene los datos de el producto con el id de arriba

  const { user } = useContext(UserContext);
  // console.log(user)
  return (
    <div>
      Estas en el componente de prueba
      {
        data.cart.map((data, i) => (
          <div key={i}>
            {/* {data.quantity} */}
            <CardCart setProduct={setData} products={data} />
          </div>
        ))
      }
    </div>
  )
}

export default PruebaComponente
