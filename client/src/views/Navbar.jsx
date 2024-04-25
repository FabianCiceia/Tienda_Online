import React, { useState } from 'react'
import '../styles/Navbar.css'
import { CiShoppingCart , CiUser } from "react-icons/ci";
import { RiCloseFill } from "react-icons/ri";
import { Link, useNavigate} from "react-router-dom";
import SearchBar from '../components/SearchBar';
import Logout from '../components/Logout';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
function Navbar() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); 
    const link = (link)=>{
        navigate(link)
    }
    console.log(user)
    const admin = () => {
        if (user && user.role === 'admin') {
            return <div onClick={()=>link("./admin/panel")} className='navbarSelect'>Admin</div>;
        }
    }
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        
        <div className='navbar'>
            <div onClick={()=>navigate("./store/home")} className='navbarIcon'>
                <div  className='menuBurgerButton' onClick={toggleMenu}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <h1>En</h1>
                <h1>Corto</h1>
                
            </div>
            <div className='navbarPerfilMovile' >

                <CiShoppingCart onClick={()=>link("./user/cart")} className='navbarCart' />
                
                <div  className={`menuBurger ${menuOpen ? 'open' : ''}`}>
                    <div onBlur={toggleMenu} className='menuBurgerlinks'>
                        <div className='menuBurgerUser' 
                            onClick={()=>{
                                if(user){
                                    link("../user/perfile");
                                    setMenuOpen(false);
                                }else{
                                    link("../login");
                                    setMenuOpen(false);
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
            </div>
            <SearchBar/>
            <div className='navbarLinks'>
                <Link className='navbarSelect' to={"../store/home"}>Inicio</Link>
                <a href="#" className='navbarSelect'>Contacto</a>
                {admin()}
                <Logout/>
            </div>
            <div className='navbarPerfil' >
                <CiShoppingCart onClick={()=>link("./user/cart")} className='navbarCart' />
                <CiUser onClick={()=>link("./user/perfile")}  className='navbarUser'/>
            </div>
        </div>
    )
}

export default Navbar
