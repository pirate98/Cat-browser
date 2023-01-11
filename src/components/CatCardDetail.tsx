import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useCat } from '../apis/getCatById';
import { Card, Button } from 'antd';
import Spinner from './Spinner';

const CatCardDetail = () => {
    const cat = useParams();
    const navigate = useNavigate();
    const catQuery = useCat(cat?.catId as string);
    if (catQuery.isLoading) {
        return <Spinner />;
    }

    if (!catQuery.data) return null;

    const breed = catQuery.data?.breeds[0];

    const handleClick = () => {
        navigate('/', { state: { breed: breed.id } });
    };

    return (
        <div className="Cat">
            <Container>
                <Button className="back" type="primary" onClick={handleClick}>
                    Back
                </Button>
                <Card hoverable cover={<img src={catQuery.data?.url} title={breed.name} />}>
                    <h5>Origin: {breed.origin}</h5>
                    <h6>{breed.temperament}</h6>
                    <p>{breed.description}</p>
                </Card>
            </Container>
        </div>
    );
};

export default CatCardDetail;
