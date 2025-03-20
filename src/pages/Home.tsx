import React from 'react';
import Navbar from '../components/Navbar';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FolderIcon from '@mui/icons-material/Folder';
import ListAltIcon from '@mui/icons-material/ListAlt';

const Home: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <Navbar />
            <Container>
                <Typography variant="h3" gutterBottom sx={{ marginTop: 4 }}>
                    Bem-vindo ao Sistema de Gerenciamento de Processos
                </Typography>
                <Grid container spacing={4} sx={{ marginTop: 2 }}>
                    <Grid item xs={12} md={6}>
                        <Card 
                            sx={{ 
                                cursor: 'pointer', 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between' 
                            }} 
                            onClick={() => navigate('/areas')}
                        >
                            <CardContent>
                                <FolderIcon fontSize="large" sx={{ marginBottom: 2 }} />
                                <Typography variant="h5" component="div">
                                    Áreas
                                </Typography>
                                <Typography variant="body2">
                                    Gerencie as áreas da empresa, cadastrando e visualizando as áreas existentes.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card 
                            sx={{ 
                                cursor: 'pointer', 
                                height: '100%', 
                                display: 'flex', 
                                flexDirection: 'column', 
                                justifyContent: 'space-between' 
                            }} 
                            onClick={() => navigate('/processes')}
                        >
                            <CardContent>
                                <ListAltIcon fontSize="large" sx={{ marginBottom: 2 }} />
                                <Typography variant="h5" component="div">
                                    Processos
                                </Typography>
                                <Typography variant="body2">
                                    Gerencie os processos e subprocessos, cadastrando e visualizando a hierarquia de processos.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Home;