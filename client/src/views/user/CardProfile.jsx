import '../../styles/user/CardProfile.css'

import React from 'react'
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { CiUser } from 'react-icons/ci';



function CardProfile() {
  const { user } = useContext(UserContext);

  return (
    <div className='container userCard'>
      <div className='userCard_head'>       
        <CiUser className='userImage'/> 
        <h2>{user.firstName}{user.lastName}</h2>
      </div>
      <div className='userCard_body'>
        <p>Gmail: {user.email}</p>
        <p>Phone: none</p>
        <p>Referencias: none</p>
      </div>
      <div className='userCard_footer'>
        <button type="button" className='button-primary'>Editar</button>
      </div>
    </div>
  )
}

export default CardProfile