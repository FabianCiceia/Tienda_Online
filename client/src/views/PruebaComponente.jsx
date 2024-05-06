import React, { useState, useRef } from "react";
import Slider from "react-slick";
// import { baseUrl } from "./config";
import UseImg from "../hooks/UseImg";
import '../styles/prueba.css'
function SlickGoTo({imgs=["ESP3201.png","ESP3202.png","ESP3203.png","ESP3204.png"]}) {
  const [slideIndex, setSlideIndex] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);
  let sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: () => setUpdateCount(updateCount + 1),
    beforeChange: (current, next) => setSlideIndex(next)
  };
  return (
    <div className="slider-container">
      <p>Total updates: {updateCount} </p>
      <input
        onChange={e => sliderRef.slickGoTo(e.target.value)}
        value={slideIndex}
        type="range"
        min={0}
        max={3}
      />
      <Slider
        ref={slider => {
          sliderRef = slider;
        }}
        {...settings}
      >
        {imgs.map((img, i) => (
            <div  key={i}>
              <img src={UseImg(img)} alt="" />
            </div>
        ))}
      </Slider>
    </div>
  );
}

export default SlickGoTo;
