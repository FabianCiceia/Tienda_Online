import React, { useState } from 'react';
import { Slider, InputNumber, Row, Col } from 'antd';

const PriceRangeSlider = () => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(100);

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

    return (
        <Row>
            <Col span={6}>
                <InputNumber
                min={0}
                max={maxPrice}
                value={minPrice}
                onChange={handleMinPriceChange}
                />
            </Col>
            <Col span={12}>
                <Slider
                range
                min={0}
                max={1000}
                value={[minPrice, maxPrice]}
                onChange={handleSliderChange}
                />
            </Col>
            <Col span={6}>
                <InputNumber
                min={minPrice}
                max={1000}
                value={maxPrice}
                onChange={handleMaxPriceChange}
                />
            </Col>
        </Row>
    );
};

export default PriceRangeSlider;
