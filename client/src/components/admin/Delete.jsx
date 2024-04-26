import React from 'react'
import Swal from 'sweetalert2'
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Delete({id}) {
    const navigate = useNavigate(); 
    const baseURL = "http://localhost:8000/api/product/";
    const delet = () =>{
        Swal.fire({
            title: "Deseas eliminar ?",
            showDenyButton: true,
            showCancelButton: false,
            icon: "warning",
            confirmButtonText: "Eliminar",
            denyButtonText: `Cancelar`,
            confirmButtonColor: "#C6313A",
            denyButtonColor: "#7066E0",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${baseURL}delete/${id}`,{ withCredentials: true })
                .then((response) => {
                    if(response.data.result.deletedCount){
                        Swal.fire("Fue eliminado", "", "success");
                        navigate("../home");
                    }else{
                        Swal.fire("No pudo ser eliminado", "", "error");
                    }
                });
            
            }
        });
    }
    return (
        <button onClick={()=>delet()}>Delete</button>
    )
}

export default Delete
