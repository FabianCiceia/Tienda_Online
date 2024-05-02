import React, { useState } from 'react'
import '../styles/Navbar/Navbar.css'
import { CiShoppingCart , CiUser } from "react-icons/ci";
import Logo from '../assets/Logo.png'
import { Link, useNavigate} from "react-router-dom";
import SearchBar from '../components/Navbar/SearchBar';

import { useContext } from 'react';
import UserContext from '../context/UserContext';
import MenuBurger from '../components/Navbar/MenuBurger';
import MenuUser from '../components/Navbar/MenuUser';
function Navbar() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); 

    const [menuOpen, setMenuOpen] = useState(false);
    const [ menuUser, setMenuUser] = useState(false);
    const link = (link)=>{
        navigate(link)
    }

    const admin = () => {
        if (user && user.role === 'admin') {
            return <div onClick={()=>link("./admin/panel")} className='navbarSelect'>Admin</div>;
        }
    }
    


    return (
        
        <div className='navbar'>
            <div className='navbarIcon'>
                <div  className='menuBurgerButton' onClick={()=>setMenuOpen(!menuOpen)}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <MenuBurger open={menuOpen} setOpen={setMenuOpen}/>
                {/* <div className='LogoContainer'>
                    <img src={Logo} alt="" className='Logo' />
                </div> */}
                    <h1>En</h1>
                    <h1>Corto</h1>  
            </div>
            <div className='navbarPerfilMovile' >

                <CiShoppingCart onClick={()=>link("./user/cart")} className='navbarCart' />

            </div>
            <SearchBar/>
            <div className='navbarLinks'>
                <Link className='navbarSelect' to={"../store/home"}>Inicio</Link>
                <a href="#" className='navbarSelect'>Contacto</a>
                {admin()}
                
            </div>
            <div className='navbarPerfil' >
                <CiShoppingCart onClick={()=>link("./user/cart")} className='navbarCart' />
                <CiUser  onClick={()=>setMenuUser(!menuUser)}  className='navbarUser'/>
                <MenuUser open={menuUser} setOpen={setMenuUser} />
            </div>
        </div>
    )
}

export default Navbar
