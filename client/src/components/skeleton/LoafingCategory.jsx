import React from 'react';
import { Skeleton } from 'antd';

const LoadingCategory = () => {
    return (
        <div>
        <Skeleton.Input style={{ width: 200, height: 20, margin: 20 }} active />
        <Skeleton.Input style={{ width: 200, height: 20, margin: 20 }} active />
        <Skeleton.Input style={{ width: 200, height: 20, margin: 20 }} active />
        <Skeleton.Input style={{ width: 200, height: 20, margin: 20 }} active />
        <Skeleton.Input style={{ width: 200, height: 20, margin: 20 }} active />
        <Skeleton.Input style={{ width: 200, height: 20, margin: 20 }} active />
        </div>
    );
};

export default LoadingCategory;
