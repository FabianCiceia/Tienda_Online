import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import Axios from "../hooks/useAxios"
import Not_image from '../assets/Not_image.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CiTrash } from "react-icons/ci";

function CartCard({products, setProduct}) {
    // const {  } = useParams(); 
    const baseURL =`http://localhost:8000/api/auth/cart/edit`;
    function addData(pront) {
        // console.log(pront);
        axios
        .post(`${baseURL}`, pront, { withCredentials: true })
        .then(res => {

            setProduct(res.data);
            
            // navigate("");
        })
        .catch(err => {
            Swal.fire({
                icon: "error",
                title: `Ha ocurrido un error`,
            });
            console.log(err);
        })
    }
    const buttonPress = (productId, quantity) => {
        const data = {
            productId: productId,
            quantity: quantity
        };
        addData(data);
        setCant(data.quantity);
    }
    const id = products.product
    const[cant, setCant] =useState(products.quantity);
    const[like, setLike] = useState(false);
    const cliklike = ()=>{
        setLike(!like);
        // console.log(like)
    }

    const { data, isLoading, error, setData } = Axios(`http://localhost:8000/api/product/${id}`);
    if (isLoading){
        return(
            <div>Cargando</div>
        )
    }
    if (error){
        return(
            <div>Esto va tardar mas de lo pensado</div>
        )
    }
    const deleteProduct = (productId)=>{
        Swal.fire({
            title: "Estas seguro ?",
            text: "Vas a eliminar el producto del carrito",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    productId: productId,
                    quantity: 0
                };
                addData(data);
                Swal.fire({
                    icon: "success",
                });
            }
        });

    }
    // console.log(data)

    const handleChange = (event) => {
        ((event.target.value) < 0  || (event.target.value) > Number(data.product.stock))?null:setCant(Number(event.target.value));
    };
    return (
        <div className='listCart-container'>
            <div className='listCartImg'>
                <img src={data.product.imageUrl} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
            </div>
            <div className='listCartDescripcion'>
                <div className='title'>
                    <h1>{data.product.name}</h1>
                    <button className='deleteProductCart' onClick={() =>{deleteProduct(data.product._id)}}><CiTrash /></button>
                </div>
                <p>${data.product.price}</p>
                <div className='listCartCant'>
                    {
                        (cant==1)?<button className='deleteProductCartMovile' onClick={() =>{deleteProduct(data.product._id)}}><CiTrash /></button>:<button onClick={()=>{(cant==1 )?null:buttonPress(data.product._id, (cant-1))}}>-</button>
                    }
                    
                    <p>{cant}</p>
                    <button onClick={()=>{(cant>= Number(data.product.stock))?null:buttonPress(data.product._id, (cant+1))}}>+</button>
                </div>
                <p>{data.product.stock ? "✅ En stock" : "❌No hay stock"} ({data.product.stock})</p>
            </div>
        </div>
    )
}
export default CartCard
const data = {
    "message": "Product added to cart successfully",
    "user": {
        "_id": "6620cc4576fd24a26a7d632e",
        "firstName": "Daniel",
        "lastName": "Ciceia",
        "email": "ciceiafabian@gmail.com",
        "rule": "user",
        "phone": 124324,
        "reference": "casa",
        "password": "$2b$10$S1lXe4Blu5aBlHtoO9JRJ.znh/5cSpYf7msJTGz0knVirdhvbypF2",
        "createdAt": "2024-04-18T07:31:17.587Z",
        "updatedAt": "2024-04-19T20:38:48.914Z",
        "__v": 14,
        "Card": [
            {
                "product": "662091199f6a630002eddb93",
                "quantity": 105,
                "_id": "6620d5f716dac0f1f7ade60d"
            },
            {
                "product": "661dba5d2e8f7c1b9a4ee0bd",
                "quantity": 22,
                "_id": "6620d5fa16dac0f1f7ade61b"
            },
            {
                "product": "661dba5d2e8f7c1b9a4ee0ba",
                "quantity": 1,
                "_id": "6620d5fd16dac0f1f7ade62a"
            },
            {
                "product": "661dba5d2e8f7c1b9a4ee0bc",
                "quantity": 14,
                "_id": "6620d60116dac0f1f7ade63a"
            },
            {
                "product": "661dba5d2e8f7c1b9a4ee0be",
                "quantity": 1,
                "_id": "66215b8416dac0f1f7adefec"
            },
            {
                "product": "661dba5d2e8f7c1b9a4ee0c0",
                "quantity": 1,
                "_id": "66215b8616dac0f1f7adeffe"
            },
            {
                "product": "661dba5d2e8f7c1b9a4ee0c4",
                "quantity": 1,
                "_id": "66218fd516dac0f1f7adf14f"
            }
        ]
    }
}