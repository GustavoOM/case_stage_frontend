import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Area } from '../../types';
import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateArea from './CreateArea';
import EditAreaModal from './EditAreaModal';
import DeleteAreaModal from './DeleteAreaModal';
import Loading from './Loading';

const AreaList: React.FC = () => {
    const [areas, setAreas] = useState<Area[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [selectedArea, setSelectedArea] = useState<Area | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchAreas = async () => {
        try {
            const response = await api.get('/area');
            setAreas(response.data.areas);
        } catch (error) {
            console.error('Error fetching areas:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAreas();
    }, []);

    const handleDeleteClick = (area: Area) => {
        setSelectedArea(area);
        setOpenDeleteModal(true);
    };

    const handleDeleteConfirm = async (id: string) => {
        try {
            await api.delete(`/area/${id}`);
            fetchAreas();
        } catch (error) {
            console.error('Error deleting area:', error);
        }
    };

    const handleEditClick = (area: Area) => {
        setSelectedArea(area);
        setOpenEditModal(true);
    };

    const handleEditSave = async (id: string, newName: string) => {
        try {
            await api.put(`/area/${id}`, { name: newName });
            fetchAreas();
        } catch (error) {
            console.error('Error updating area:', error);
        }
    };

    const handleAreaCreated = () => {
        fetchAreas(); 
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div>
            <CreateArea onAreaCreated={handleAreaCreated} />
            <Typography variant="h5" gutterBottom>
                Lista de Áreas
            </Typography>
            <Grid container spacing={3} sx={{ marginBottom: 4 }}>
                {areas.map((area) => (
                    <Grid item key={area.id} xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    {area.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                                    Criado em: {new Date(area.created_at).toLocaleDateString()}
                                </Typography>
                                <div style={{ marginTop: 16, textAlign: 'right' }}>
                                    <IconButton
                                        aria-label="editar"
                                        onClick={() => handleEditClick(area)}
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        aria-label="deletar"
                                        onClick={() => handleDeleteClick(area)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            
            <EditAreaModal
                open={openEditModal}
                onClose={() => setOpenEditModal(false)}
                area={selectedArea || { id: '', name: '' }}
                onSave={handleEditSave}
            />

            <DeleteAreaModal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                area={selectedArea || { id: '', name: '' }}
                onDelete={handleDeleteConfirm}
            />
        </div>
    );
};

export default AreaList;