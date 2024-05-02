import '../styles/Footer.css'

import React from 'react'
import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci'
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className='containerFooter'>
            <div className='info'>
                <div className='infoPhone'>
                    <h3>venta de componentes<br /> electronicos</h3>
                    <h4>(025) XXXX 25 16</h4>
                </div>

                <div className='infoContacto'>
                    <h5>Encarnacion - Paraguay</h5>
                    <h4>Contáctanos: encorto@gmail.com</h4>
                    <div>
                    <Link to={"#"} className='link'> <CiFacebook className='imaRedes'/></Link>
                    <Link to={"#"} className='link'><CiInstagram className='imaRedes'/></Link>
                    <Link to={"#"} className='link'> <CiTwitter className='imaRedes'/></Link>
                    </div>
                </div>

                <div className='infoLink'>
                    <h4>Categorias</h4>
                    <Link to={"#"} className='link'>Capacitor ceramico</Link>
                    <Link to={"#"} className='link'>Circuito integrado</Link>
                    <Link to={"#"} className='link'>Diodo led</Link>
                    <Link to={"#"} className='link'>Microcontrolador</Link>
                </div>
            </div>
            <div className='copyright'>
                <p>Copyright © 2024 EnCorto</p>
            </div>
        </div>
    )
}

export default Footer
