import React, { useEffect } from 'react'
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Axios from "../hooks/useAxios"
import CardCart from '../components/CartCard';


function PruebaComponente() {
  // const { user } = useContext(UserContext);

return (
  <div>
    Estas en el componente de prueba

  </div>
)
}

export default PruebaComponente
