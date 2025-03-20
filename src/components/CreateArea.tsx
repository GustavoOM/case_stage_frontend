import React, { useState } from 'react';
import api from '../services/api';
import { TextField, Button, Box, Typography } from '@mui/material';

interface CreateAreaProps {
    onAreaCreated: () => void;
}

const CreateArea: React.FC<CreateAreaProps> = ({ onAreaCreated }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/area', { name });
            console.log('Area created successfully');
            setName('');
            onAreaCreated();
        } catch (error) {
            console.error('Error creating area:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ marginBottom: 4, marginTop: 4 }}>
            <Typography variant="h5" gutterBottom>
                Criar Nova Área
            </Typography>
            <TextField
                label="Nome da Área"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
                Criar
            </Button>
        </Box>
    );
};

export default CreateArea;