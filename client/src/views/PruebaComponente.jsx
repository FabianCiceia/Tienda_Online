import React, { useState } from 'react';
import '../styles/user/ConfirmCard.css';
import Axios from '../hooks/useAxios';

import { useContext } from 'react';
import UserContext from '../context/UserContext';
import { CiUser } from 'react-icons/ci';

import UserCart from './user/UserCart';

const PruebaComponente = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleOverlayClick = (event) => {
    if (event.target.classList.contains('modal-overlay')) {
      closeModal();
    }
  };


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
    <div>
      <button onClick={openModal}>Abrir Modal</button>
      {isOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal">
            <div className="modal-header">
              <h2>Modal</h2>
              {
                data.cart.slice(0, 3).map((data, i) => (
                  <div key={i} className='cardImagen'>
                    <UserCart id={data.product} />
                  </div>
                ))
              }

            </div>
            <div className="modal-content">
              <button onClick={closeModal}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PruebaComponente;
