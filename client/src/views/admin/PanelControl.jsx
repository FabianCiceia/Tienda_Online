import React from 'react';
import { useNavigate} from "react-router-dom";
function PanelControl() {
    const navigate = useNavigate(); 
    const link = (link)=>{
        navigate(link)
    }
    return (
        <div className="panel">
        <button onClick={()=>link("../add")} className="panelButton">Agregar Producto</button>
        {/* <button onClick={()=>link("../edit")} className="panelButton">Editar Producto</button> */}
        </div>
    );
}

export default PanelControl;
