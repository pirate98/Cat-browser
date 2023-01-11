import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CatCardGrid from './CatCardGrid';
import { useBreeds } from '../apis/getBreeds';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import { Select, Form, Typography } from 'antd';
import Spinner from './Spinner';

const Home = () => {
    const { state } = useLocation();
    const breedsQuery = useBreeds();
    const [selectedBreed, setSelectedBreed] = useState<string>(state?.breed || 'Select');

    const CatGridContainer = styled(Container)`
        padding: 20px;
    `;

    if (breedsQuery.isLoading) {
        return <Spinner />;
    }

    if (!breedsQuery.data) return null;

    return (
        <CatGridContainer>
            <Typography.Title aria-level={6}>Cat Browser</Typography.Title>
            <Form>
                <Typography>Breed</Typography>
                <Select
                    value={selectedBreed}
                    style={{ width: 200 }}
                    onChange={setSelectedBreed}
                    options={breedsQuery.data.map(({ id, name }: { id: string; name: string }) => ({
                        label: name,
                        value: id
                    }))}
                />
            </Form>
            <br></br>
            {selectedBreed && <CatCardGrid breedId={selectedBreed} />}
        </CatGridContainer>
    );
};

export default Home;
