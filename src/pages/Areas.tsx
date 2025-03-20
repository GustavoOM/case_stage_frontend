import React from 'react';
import Navbar from '../components/Navbar';
import AreaList from '../components/AreaList';
import { Container } from '@mui/material';

const Areas: React.FC = () => {
    return (
        <div>
            <Navbar />
            <Container>
                <AreaList />
            </Container>
        </div>
    );
};

export default Areas;