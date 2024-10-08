

// // http://localhost:8000/api/product/newest
import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from "../../hooks/useAxios";
import Card from "../commun/Card";
import { AiOutlineArrowRight, AiOutlineArrowLeft  } from "react-icons/ai";
// import '../styles/prueba.css'
import '../../styles/CategoryProducts.css'
import LoadingNew from "../skeleton/LoadingNew";
// Componente para el botón de siguiente (NextArrow)
const NextArrow = (props) => {
    const { onClick, style } = props;

    return (
        <button 
        className="categoriaButton" 
        onClick={onClick}
        style={{ ...style}}
        >
        <AiOutlineArrowRight/>
        </button>
    );
};

// Componente para el botón de anterior (PrevArrow)
const PrevArrow = (props) => {
    const { onClick, style } = props;
    return (
        <button 
        className="categoriaButton" 
        onClick={onClick}
        style={{ ...style}}
        >
        <AiOutlineArrowLeft/>
        </button>
    );
};

const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
    margin:'0 10px',
    
};

// Componente principal
export default function SimpleSlider({ category, name ='Categoria' }) {

    const { data, isLoading, error, setData } = Axios(`http://localhost:8000/api/product/category/${category}`);
    
    if (isLoading) {
        return <div><LoadingNew/></div>;
    }
    
    if (error) {
        return null;
    }
    const settings = {
        dots: false,
        touchMove:false,
        arrows: true, // Mostrar flechas de navegación
        infinite: true,
        speed: 700,
        autoplaySpeed: 3000,
        autoplay: true,
        slidesToShow: 5,
        slidesToScroll: 4,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        pauseOnHover: true,
        responsive: [
        {
            breakpoint: 1024,
            settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            touchMove:true,
            infinite: true,
            }
        },
        {
            breakpoint: 680,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            // initialSlide: 2,
            touchMove:true,
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            touchMove:true,
            }
        }
        ]
    };

    return (
        <div className="container">
            <h1>{name}</h1>
            <div className="containerProductoCategoria">
                <Slider {...settings}>
                {data.products.map((product, i) => (
                    <div className='productocategoria'  key={i}>
                    <Card
                        imageUrl={product.imageUrl}
                        name={product.name}
                        price={product.price}
                        stock={product.stock}
                        id={product._id}
                    />
                    </div>
                ))}
                </Slider>
            </div>
        </div>
    );
}
