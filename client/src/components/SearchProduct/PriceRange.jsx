import React, { useState } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

const PriceRange = ({maxprice = 0, minprice = 0}) => {
    const [minPrice, setMinPrice] = useState(minprice);
    const [maxPrice, setMaxPrice] = useState(maxprice);

    const handleMinPriceChange = (value) => {
        setMinPrice(value);
    };

    const handleMaxPriceChange = (value) => {
        setMaxPrice(value);
    };

    const handleSliderChange = (value) => {
        setMinPrice(value[0]);
        setMaxPrice(value[1]);
    };

    const formatPrice = (value) => `Gs${value}`;
    
    return (
        <Row className='princeRange'>
            <div className='input'>
                <p>Precio minimo:</p>
                <InputNumber
                min={minprice}
                max={maxPrice}
                value={minPrice}
                prefix="Gs."
                type='number'
                step={100}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                onChange={handleMinPriceChange}
                />
            </div>
            <Slider
            className='slider'
            range
            min={minprice}
            max={maxprice}
            step={100}
            value={[minPrice, maxPrice]}
            onChange={handleSliderChange}
            />
            <div  className='input'>
                <p>Precio maximo: </p>
                <InputNumber 
                className='number'
                type='number'
                min={minPrice}
                max={maxprice}
                value={maxPrice}
                prefix="Gs."
                step={100}
                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                onChange={handleMaxPriceChange}
                />
            </div>
        </Row>
    );
};

export default PriceRange;
