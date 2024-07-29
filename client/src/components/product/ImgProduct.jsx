import React, { useEffect, useState } from "react";
import ReactImageMagnify from 'react-image-magnify';
import '../../styles/Product/ImgProduct.css';
import notImage from '../../assets/Not_image.jpg'

function CustomPaging() {
    const [image, setImage] = useState("");
    const [listImage, setListImage] = useState([]);

    useEffect(() => {
        setImage("http://localhost:8000/api/uploads/imagen-1.webp");
        setListImage([
            "http://localhost:8000/api/uploads/imagen-1.webp",
            "http://localhost:8000/api/uploads/ESP3202.png",
            "http://localhost:8000/api/uploads/ESP3203.png",
            "http://localhost:8000/api/uploads/voltimetro.png",
            "http://localhost:8000/api/uploads/cargador_bateria.png",
            "http://localhost:8000/api/uploads/ESP3205.png",
            // "http://localhost:8000/api/uploads/ESP3204.png"
        ]);
    }, []);

    const handleImageClick = (img) => {
        setImage(img);
    };

    const handleError = (e) => {
        e.target.src = notImage;
    };

    return (
        <div className="productImg">
            <div className="primary-image">
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Product Image',
                        isFluidWidth: true,
                        src: image,
                        onError: handleError
                    },
                    largeImage: {
                        src: image,
                        width: 1200,
                        height: 1200,
                        onError: handleError
                    },
                    enlargedImageContainerStyle: { zIndex: 9 }
                }} />
            </div>
            <div className="list-images">
                {
                    listImage.map((img, i) => (
                        <div 
                            className={`image-list ${img === image ? 'image-list-focus' : ''}`} 
                            key={i} 
                            onClick={() => handleImageClick(img)}
                        >
                            <img src={img} alt="" onError={handleError} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default CustomPaging;
