import React from 'react'
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { CiShoppingCart , CiUser } from "react-icons/ci";
import { Link, useNavigate} from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";
function MenuBurger({open ,setOpen}) {
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); 
    const link = (link)=>{
        navigate(link)
    }
    const toggleMenu = () => {
        setOpen(!open);
    };
    return (
        <div  className={`menuBurger ${open ? 'open' : ''}`}>
        <div onBlur={toggleMenu} className='menuBurgerlinks'>
            <div className='menuBurgerUser' 
                onClick={()=>{
                    if(user){
                        link("../user/perfile");
                        setOpen(false);
                    }else{
                        link("../login");
                        setOpen(false);
                    }}}>
                <CiUser  className=''/>
                <p>{(user)?user.firstName:"Iniciar Seccion"}</p>
            </div>
            <Link className='menuBurgerlink'>Inicio</Link>
            <Link className='menuBurgerlink'>Productos</Link>
            <Link className='menuBurgerlink'>Contacto</Link>    
            <Link className='menuBurgerlink'>Cerrar Seccion</Link>
        </div>
        <div className='closeMenuBurger' onClick={toggleMenu}>
            <RiCloseFill />
        </div>
    </div>
    )
}

export default MenuBurger
