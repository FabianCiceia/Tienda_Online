
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { CiCircleRemove, CiShoppingCart , CiUser } from "react-icons/ci";
import { Link, useNavigate} from "react-router-dom";
import { RiCloseFill } from "react-icons/ri";
import React, { useState } from 'react';
import { Drawer} from 'antd';
import Logout from './Logout';

const MenuBurger = ({open, setOpen}) => {
    // const [open, setOpen] = useState(false);

    const { user } = useContext(UserContext);
    const navigate = useNavigate(); 
    const link = (link)=>{
        navigate(link)
    }
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const logout = ()=>{
        if(user){
            return(
                    <Logout className='menuBurgerlink'/>
            )
        }
    }

    return (
        <>
        <Drawer
            title="Menu"
            placement={'left'}
            closable={false}
            onClose={onClose}
            visible={open}
            key={'left'}
        >
            <div className='menuBurgerlinks'>
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
                <Link onClick={()=>Link('./')} className='menuBurgerlink'>Inicio</Link>
                <a href="https://wa.me/00000" className='menuBurgerlink' target="_blank" rel="noopener noreferrer">Contacto</a>
                {logout()}
            </div>
        </Drawer>
        </>
    );
};

export default MenuBurger;
