import React from 'react';
import { Cat } from '../types';
import { Card, Button } from 'antd';

interface CatProps {
    item: Cat;
}

const CatCard: React.FC<CatProps> = ({ item }) => {
    return (
        <Card
            hoverable
            style={{ width: 240, textAlign: 'center' }}
            cover={<img alt="example" src={item.url} height={210} className="card-img" />}>
            <Button type="primary" href={'/detail/' + item.id}>
                View details
            </Button>
        </Card>
    );
};

export default CatCard;
