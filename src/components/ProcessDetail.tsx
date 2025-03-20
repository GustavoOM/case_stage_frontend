import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Process, Area } from '../../types'; 
import EditProcessModal from './EditProcessModal';
import DeleteProcessModal from './DeleteProcessModal';
import { Card, CardContent, Typography, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from './Loading';

const ProcessDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [process, setProcess] = useState<Process | null>(null);
    const [area, setArea] = useState<Area | null>(null); 
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        const fetchProcessAndArea = async () => {
            try {
                const processResponse = await api.get(`/process/${id}`);
                setProcess(processResponse.data.process);

                const areaResponse = await api.get(`/area/${processResponse.data.process.area_id}`);
                setArea(areaResponse.data.area);
            } catch (error) {
                console.error('Error fetching process or area:', error);
            }
        };

        fetchProcessAndArea();
    }, [id]);

    const handleDelete = async (processId: string) => {
        try {
            await api.delete(`/process/${processId}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting process:', error);
        }
    };

    const handleSave = async (processId: string, updatedProcess: { name: string; tools: string; responsibles: string; documentations: string }) => {
        try {
            await api.put(`/process/${processId}`, updatedProcess);
            setProcess((prevProcess) => ({
                ...prevProcess!,
                ...updatedProcess,
            }));
        } catch (error) {
            console.error('Error updating process:', error);
        }
    };

    const handleChildClick = (childId: string) => {
        navigate(`/process/${childId}`);
    };

    if (!process || !area) {
        return<Loading/>
    }

    return (
        <div style={{ alignItems: 'center', margin: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 16 }}>
                <Typography variant="h4" component="h1">
                    {process.name} <Typography variant="subtitle1" color="text.secondary">(Área: {area.name})</Typography>
                </Typography>
                <div>
                    <IconButton
                        aria-label="editar"
                        onClick={() => setIsEditModalOpen(true)}
                        color="primary"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        aria-label="deletar"
                        onClick={() => setIsDeleteModalOpen(true)}
                        color="error"
                    >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </div>

            <Grid container spacing={3} sx={{ marginBottom: 4 }}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Ferramentas
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {process.tools}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Responsáveis
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {process.responsibles}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Documentação
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {process.documentations}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Criado em
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {new Date(process.created_at).toLocaleDateString()}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {process.children && process.children.length > 0 && (
                <div>
                    <Typography variant="h5" gutterBottom>
                        Processos Filhos
                    </Typography>
                    <Grid container spacing={3}>
                        {process.children.map((child) => (
                            <Grid item key={child.id} xs={12} sm={6} md={4}>
                                <Card 
                                    onClick={() => handleChildClick(child.id)} 
                                    style={{ 
                                        cursor: 'pointer', 
                                        backgroundColor: '#e3f2fd',
                                        transition: 'background-color 0.3s',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bbdefb'} 
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e3f2fd'} 
                                >
                                    <CardContent>
                                        <Typography variant="h6" component="div">
                                            {child.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                                            Área: {area.name} 
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                                            Ferramentas: {child.tools}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}

            <EditProcessModal
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                process={process}
                onSave={handleSave}
            />
            <DeleteProcessModal
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                process={{ id: process.id, name: process.name }}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default ProcessDetail;