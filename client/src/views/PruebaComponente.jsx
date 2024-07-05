// import React, { useContext, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import Axios from "../hooks/useAxios"
// import Not_image from '../assets/Not_image.jpg';
// // import { CiHeart } from "react-icons/ci";
// import AddCart from '../components/commun/AddCart'
// import UserContext from '../context/UserContext';
// import '../styles/Product.css'
// import Delete from '../components/admin/Delete';
// import UseImg from '../hooks/UseImg';
// import Slider from "react-slick";
// import ImgProduct from '../components/product/ImgProduct';
// function SimpleSlider() {
//         const settings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1
//         };
//         return (
//         <div className="slider-container">
//             <Slider {...settings}>
//             <div>
//                 <h3>1</h3>
//             </div>
//             <div>
//                 <h3>2</h3>
//             </div>
//             <div>
//                 <h3>3</h3>
//             </div>
//             <div>
//                 <h3>4</h3>
//             </div>
//             <div>
//                 <h3>5</h3>
//             </div>
//             <div>
//                 <h3>6</h3>
//             </div>
//             </Slider>
//         </div>
//         );
//     }
// function Product() {
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();
//     const link = (link) => {
//         navigate(link)
//     }
//     const  id  = '66390f4cecdf6950c5a79e83';
    
//     const edit = () => {
//         if (user && user.role === 'admin') {
//             return (
//                 <div className='adminButton'>
//                     <button onClick={() => link(`../../admin/edit/${id}`)} >Editar</button>
//                     <Delete id={id} />
//                 </div>
//             );
//         }
//     }
//     const [cant, setCant] = useState(1);
//     const [like, setLike] = useState(false);
//     const cliklike = () => {
//         setLike(!like);
//     }

//     const { data, isLoading, error, setData } = Axios(`http://localhost:8000/api/product/${id}`);
//     if (isLoading) {
//         return (
//             <div>Cargando</div>
//         )
//     }
//     if (error) {
//         return (
//             <div>Esto va tardar mas de lo pensado</div>
//         )
//     }
//     if(data){
//         console.log(data);
//     }

//     const handleChange = (event) => {
//         ((event.target.value) < 0 || (event.target.value) > Number(data.product.stock)) ? null : setCant(Number(event.target.value));
//     };
//     return (
//         <div className='product-container container'>
//             <div className='productImg'>
//                 <img src={UseImg(data.product.imageUrl[0])} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
//             </div>
//             <div className='productDescripcion'>
//                 <div>
//                     <div>
//                         <h1>{data.product.name}</h1>
//                         <p>₲ {data.product.price}</p>
//                         <p>{data.product.stock ? "✅ En stock" : "❌No hay stock"} ({data.product.stock})</p>
//                     </div>
//                     <h2>{data.product.description}</h2>
//                 </div>
//                 <div className='containerButtonsProduct'>
//                     <div className='cartButtonCant'>
//                         <button className='ButtonCant' onClick={() => { (cant == 1) ? null : setCant(cant - 1) }}>-</button>
//                         <input type="number" min={1} className='ButtonCant' value={cant} onChange={handleChange} />
//                         <button className='ButtonCant' onClick={() => { (cant >= Number(data.product.stock)) ? null : setCant(cant + 1) }}>+</button>
//                     </div>
//                     {edit()}
//                     <div className='buttonsAddFavor'>
//                         <AddCart productId={id} quantity={cant} />
                        
//                         {/* <button onClick={cliklike}  className={like ? 'favorCart redColor' : 'favorCart blackColor'}><CiHeart /></button> */}
//                     </div>
//                 </div>
//             </div>
//             <div className='ProductCart'>
//                 <p className='yourCart'>Your Cart</p>
//                 <div className='ProductCartProduct'>
//                     <img src={UseImg(data.product.imageUrl[0])} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} />
//                     <div>
//                         <h3>{data.product.name}</h3>
//                         <p>{cant} x ₲{data.product.price}</p>

//                     </div>
//                 </div>
//                 <div className='ProductCartSubTotal'>
//                     <p>Sub Total: </p>
//                     <p>₲ {(cant * data.product.price)}</p>
//                 </div>
//                 <div className='buttonshop'>
//                     <button className='button-primary '>Comprar</button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Product
import React from 'react'
import ImgProduct from '../components/product/ImgProduct'

function PruebaComponente() {
    return (
        <ImgProduct/>
    )
}

export default PruebaComponente
