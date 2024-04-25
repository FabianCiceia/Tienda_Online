import React, { useEffect, useRef } from 'react'
import '../../styles/Navbar/MenuUser.css'
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Logout from '../../components/Logout';
import { CiCircleRemove , CiHeart, CiUser } from "react-icons/ci";

function MenuUser({open, setOpen}) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); 
    const link = (link)=>{
        navigate(link)
    }
    const logout = ()=>{
        if(user){
            return(
                <div className='menuUserLogout menuOption'>
                    <CiCircleRemove className='menuIcon'/><Logout/>
                </div>
            )
        }
    }
    const menuUserRef = useRef(null);
    useEffect(() => {
        // Si open es true, enfocamos el div
        if (open) {
            menuUserRef.current.focus();
        }
    }, [open]);
    return (
        <div className='menuUserContainer'>
            <div
                className={`menuUser ${open ? 'open' : ''}`}
                ref={menuUserRef} // Asignamos la referencia al div
                tabIndex={0} // Aseguramos que el div pueda recibir el foco
                onBlur={() => setOpen(false)} // Cerrar el menú cuando pierde el foco
            >
                <div className='menuUserPerfile menuOption'
                    onClick={()=>{
                        if(user){
                            link("../user/perfile");
                            setOpen(false);
                        }else{
                            link("../login");
                            setOpen(false);
                        }}}
                >
                    <CiUser className='menuIcon'/>{(user)?user.firstName:"Iniciar Seccion"}
                </div>
                {logout()}
                {/* <div className='menuUserLogout menuOption'>
                    <CiCircleRemove className='menuIcon'/><Logout/>
                </div> */}
                <div className='menuUserFavorite menuOption' 
                    onClick={()=>{
                        if(user){
                            link("../user/perfile");
                            setOpen(false);
                        }else{
                            link("../login");
                            setOpen(false);
                        }}}>
                    <CiHeart className='menuIcon'/>
                    Lista de favoritos
                </div>
            </div>

        </div>
    )
}

export default MenuUser
