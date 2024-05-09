import React, { useEffect, useState } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

const PriceRange = ({rangeMaxPrice = 100000, rangeMinPrice = 0, minPrice , setMinPrice , maxPrice, setMaxPrice, setvaluefilter,valuefilter}) => {
    useEffect(()=>{
        setMinPrice(rangeMinPrice);
        console.log('MinPrince: ', rangeMinPrice)
        setMaxPrice(rangeMaxPrice);
        setvaluefilter(false);
    },[valuefilter]);

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
    // console.table({rangeMinPrice, rangeMaxPrice})   
    return (
        <Row className='princeRange'>
            <div className='input'>
                <p>Precio minimo:</p>
                <InputNumber
                    min={rangeMinPrice}
                    max={maxPrice}
                    value={minPrice}
                    prefix="Gs."
                    type='number'
                    step={100}
                    // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    onChange={handleMinPriceChange}
                />
            </div>
            <Slider
            className='slider'
            range
            min={rangeMinPrice}
            max={rangeMaxPrice}
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
                    max={rangeMaxPrice}
                    value={maxPrice}
                    prefix="Gs."
                    step={100}
                    // formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    onChange={handleMaxPriceChange}
                />
            </div>
        </Row>
    );
};

export default PriceRange;
