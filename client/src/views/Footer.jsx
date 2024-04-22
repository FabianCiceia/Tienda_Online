import React from 'react'
import Axios from "../hooks/useAxios"
function Footer() {
    const { data, isLoading, error, setData } = Axios("http://localhost:8000/api/poduct/image/a");
    if(isLoading){
        return (<div>isLoading</div>)
    }
    if(error){
        console.log(error)
        return(
            <div>Error</div>
        )
    }
    console.log(data);
    return (
        <div>
            <div>
                <div>
                    <h2>Venta de componentes electronicos</h2>
                    <h3>0985 xxx xxx</h3>
                </div>
                <div>
                    <p>Encarnacion - Paraguay</p>
                </div>
                <div></div>
            </div>
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Footer
