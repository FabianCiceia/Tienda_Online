import React from 'react'
import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci'

function PruebaComponente() {
    return (
        <div>
            <div>
                <div>
                    <h1>venta de componentes electronicos</h1>
                    <h1>phon9321847012938</h1>
                </div>

                <div>
                    <h3>Encarnacion paraguay</h3>
                    <h3>Contactanos: encorto@gmail.com</h3>
                    <div>
                        <CiFacebook />
                        <CiInstagram />
                        <CiTwitter />
                    </div>
                </div>

                <div>
                    <h3>Categorias</h3>
                    <p>Capacitor ceramico</p>
                    <p>Circuito integrado</p>
                    <p>Diodo led</p>
                    <p>Microcontrolador</p>
                </div>
            </div>
            <div>
                <p>Copyright © 2024 EnCorto</p>
            </div>
        </div>
    )
}

export default PruebaComponente
