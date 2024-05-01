import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Axios from "../hooks/useAxios";
import Card from "../components/Card";
// import '../styles/prueba.css'
import '../styles/CategoryProducts.css'
// Componente para el botón de siguiente (NextArrow)
const NextArrow = (props) => {
  const { onClick, style } = props;

  return (
    <button 
      className="pruebaButton" 
      onClick={onClick}
      style={{ ...style, display: "block", color:'#000'}}
    >
      {">"}
    </button>
  );
};

// Componente para el botón de anterior (PrevArrow)
const PrevArrow = (props) => {
  const { onClick, style } = props;
  return (
    <button 
      className="pruebaButton" 
      onClick={onClick}
      style={{ ...style, display: "block"}}
    >
      {"<"}
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
export default function SimpleSlider() {

  const { data, isLoading, error, setData } = Axios(`http://localhost:8000/api/product/category/Microcontroladores`);
  
  if (isLoading) {
    return <div>Cargando</div>;
  }
  
  if (error) {
    return null;
  }

  if (data){
    // console.log(data);
  }

  const settings = {
    dots: false,
    touchMove:false,
    arrows: true, // Mostrar flechas de navegación
    infinite: true,
    speed: 700,
    autoplaySpeed: 4000,
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="containerp">
      <div className="container prueba">
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
