import React, { Component } from "react";
import Slider from "react-slick";
import '../../styles/Product/ImgProduct.css'
// import { baseUrl } from "./config";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function CustomPaging() {
    const baseUrl = 'http://localhost:8000/api/uploads/';
    const settings = {
        customPaging: function(i) {
        return (
            <a className="ImgPaging">
                <img src={`${baseUrl}/ESP320${i + 1}.png`} />
            </a>
        );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
    };
    return (
        <div className="slider-container">
        <Slider {...settings}>
            <div>
            <img src={baseUrl + "/ESP3201.png"} />
            </div>
            <div>
            <img src={baseUrl + "/ESP3202.png"} />
            </div>
            <div>
            <img src={baseUrl + "/ESP3203.png"} />
            </div>
            <div>
            <img src={baseUrl + "/ESP3204.png"} />
            </div>
        </Slider>
        </div>
    );
}

export default CustomPaging;
