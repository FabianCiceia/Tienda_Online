import React, { useContext } from 'react';
import axios from "axios";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';

function AddCart({ productId, quantity} ) {
    const navigate = useNavigate(); 
    const baseURL =`http://localhost:8000/api/auth/cart/`;
    const { user } = useContext(UserContext);

    function addData(pront) {
        axios
        .post(`${baseURL}`, pront, { withCredentials: true })
        .then(res => {
            Swal.fire({
                icon: "success",
                title: `fue cargado correctamente`,
            });
            // console.log(res);
            // navigate("");
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: `Ha ocurrido un error`,
            });
            // console.log(err);
        })
    }

    const buttonPress = (productId, quantity) => {
        const data = {
            productId: productId,
            quantity: quantity
        };

        if (user) {
            if(quantity == 0){
                Swal.fire({
                    icon: "error",
                    title: `No puedes agregar 0 productos `,
                });
                return;
            }
            addData(data);
        } else {
            navigate("/login"); 
        }

    }

    return (
        <button className="addCart" onClick={() => buttonPress(productId, quantity)}>Agregar al carrito</button>
    )
}

export default AddCart;
