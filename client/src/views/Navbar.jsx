import React from 'react'
import '../styles/Navbar.css'
import { CiSearch , CiShoppingCart , CiUser   } from "react-icons/ci";
import { useNavigate} from "react-router-dom";
import SearchBar from '../components/SearchBar';

function Navbar() {
    const navigate = useNavigate(); 
    const link = (link)=>{
        navigate(link)
    }
    return (
        
        <div className='navbar'>
            <div onClick={()=>navigate("./store/home")} className='navbarIcon'>
                <h1>En</h1>
                <h1>Corto</h1>
            </div>
            <SearchBar/>
            <div className='navbarLinks'>
                <select className="navbarSelect" defaultValue="">
                    <option value=""disabled hidden>Inicio</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <select className="navbarSelect" defaultValue="">
                    <option value=""disabled hidden>Producto</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                <a href="#" className='navbarSelect'>Contacto</a>
            </div>
            <div className='navbarPerfil' >
                <CiShoppingCart onClick={()=>link("./user/cart")} className='navbarCart' />
                <CiUser onClick={()=>link("./user/perfile")}  className='navbarUser'/>
            </div>
        </div>
    )
}

export default Navbar
