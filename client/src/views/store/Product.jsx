import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Axios from "../../hooks/useAxios"
import Not_image from '../../assets/Not_image.jpg';
import { CiHeart } from "react-icons/ci";
import AddCart from '../../components/AddCart'
import UserContext from '../../context/UserContext';
import '../../styles/Product.css'
import Delete from '../../components/admin/Delete';

function Product() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate(); 
    const link = (link)=>{
        navigate(link)
    }
    const { id } = useParams(); 
    const edit = () => {
        if (user && user.role === 'admin') {
            return(
                <div className='adminButton'>
                    <button onClick={()=>link(`../../admin/edit/${id}`)} >Editar</button>
                    <Delete id={id}/>
                </div>
            );
        }
    }
    const[cant, setCant] =useState(1);
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

    const handleChange = (event) => {
        ((event.target.value) < 0  || (event.target.value) > Number(data.product.stock))?null:setCant(Number(event.target.value));
    };
    return (
        <div className='product-container'>
            <div className='productImg'>
                <img src={data.product.imageUrl} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
            </div>
            <div className='productDescripcion'>
                <div>
                    <div>
                    <h1>{data.product.name}</h1>
                    <p>${data.product.price}</p>
                    <p>{data.product.stock ? "✅ En stock" : "❌No hay stock"} ({data.product.stock})</p>
                    </div>
                    <h2>{data.product.description}</h2>
                </div>
                <div>
                    <div className='cartButtonCant'>
                        <button className='ButtonCant' onClick={()=>{(cant==1 )?null:setCant(cant-1)}}>-</button>
                        <input type="number" min={1} className='ButtonCant' value={cant} onChange={handleChange}/>
                        <button className='ButtonCant'  onClick={()=>{(cant>= Number(data.product.stock))?null:setCant(cant+1)}}>+</button>
                    </div>
                    {edit()}
                    <div className='buttonsAddFavor'>
                        <AddCart productId={id} quantity={cant} />
                        <button onClick={cliklike}  className={like ? 'favorCart redColor' : 'favorCart blackColor'}><CiHeart /></button>
                    </div>
                </div>
            </div>
            <div className='ProductCart'>
                <p className='yourCart'>Your Cart</p>
                <div className='ProductCartProduct'>
                    <img src={data.product.imageUrl} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
                    <div>
                        <h3>{data.product.name}</h3>
                        <p>{cant} x ${data.product.price}</p>
                        
                    </div>
                </div>
                <div className='ProductCartSubTotal'>
                    <p>Sub Total: </p>
                    <p>${(cant * data.product.price).toFixed(2)}</p>
                </div>
                <div>
                    <button className='ProductCartShop'>Comprar</button>
                </div>
            </div>
        </div>
    )
}
// const data = {
//     "product": {
//         "_id": "661dba5d2e8f7c1b9a4ee0b9",
//         "name": "ESP8266",
//         "description": "Módulo de Wi-Fi de bajo costo y alto rendimiento para conectar dispositivos a Internet de forma inalámbrica.",
//         "price": 5.99,
//         "category": "microcontrolador",
//         "stock": 100,
//         "imageUrl": "https://m.media-amazon.com/images/I/617T2JKnxiL._AC_UF1000,1000_QL80_.jpg",
//         "createdAt": "2024-04-14T00:00:00.000Z",
//         "updatedAt": "2024-04-14T00:00:00.000Z"
//     }
// }
export default Product
