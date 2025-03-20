import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { Container, Typography, Button } from '@mui/material';
import ProcessTree from '../components/ProcessTree';
import CreateProcessModal from '../components/CreateProcessModal';

const Processes: React.FC = () => {
    const [openCreateProcessModal, setOpenCreateProcessModal] = useState(false);
    const [refreshProcessTree, setRefreshProcessTree] = useState(false); 

    const handleOpenCreateProcessModal = () => {
        setOpenCreateProcessModal(true);
    };

    const handleCloseCreateProcessModal = () => {
        setOpenCreateProcessModal(false);
    };

    const handleProcessCreated = () => {
        setRefreshProcessTree((prev) => !prev);
    };

    return (
        <div>
            <Navbar />
            <Container>
                <Typography variant="h3" gutterBottom sx={{ marginTop: 4 }}>
                    Processos
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpenCreateProcessModal}
                    sx={{ marginBottom: 3 }}
                >
                    Criar Novo Processo
                </Button>
                <ProcessTree refresh={refreshProcessTree} /> 

                <CreateProcessModal
                    open={openCreateProcessModal}
                    onClose={handleCloseCreateProcessModal}
                    onProcessCreated={handleProcessCreated}
                />
            </Container>
        </div>
    );
};

export default Processes;