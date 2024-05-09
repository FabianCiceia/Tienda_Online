import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import Axios from "../../hooks/useAxios"
import Not_image from '../../assets/Not_image.jpg';
import axios from 'axios';
import Swal from 'sweetalert2';
import { CiTrash } from "react-icons/ci";
import UseImg from '../../hooks/UseImg';
function CartCard({products, setProduct}) {
    // const {  } = useParams(); 
    const baseURL =`http://localhost:8000/api/auth/cart/edit`;
    function addData(pront) {
        // console.log(pront);
        axios
        .post(`${baseURL}`, pront, { withCredentials: true })
        .then(res => {
            setProduct(res.data);
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
        <div className='listCart-container container'>
            <div className='listCartImg'>
                <img src={UseImg(data.product.imageUrl[0])} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
            </div>
            <div className='listCartDescripcion'>
                <div className='title'>
                    <h1>{data.product.name}</h1>
                    <button className='deleteProductCart' onClick={() =>{deleteProduct(data.product._id)}}><CiTrash /></button>
                </div>
                <p>₲ {data.product.price}</p>
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
