import React from 'react';
import { Skeleton, Card, Row, Col } from 'antd';

const LoadingNew = () => {
  const skeletonItems = Array(4).fill(null); // Suponiendo que tienes 4 productos

    return (
        <Row gutter={16}>
        {skeletonItems.map((_, index) => (
            <Col span={6} key={index}>
                <Card>
                    <Skeleton.Image style={{ margin: 5 }} active />
                    <Skeleton.Input style={{ margin: 5 }} active />
                    <Skeleton.Input style={{ margin: 5 }} active />
                </Card>
            </Col>
        ))}
        </Row>
    );
};

export default LoadingNew;
