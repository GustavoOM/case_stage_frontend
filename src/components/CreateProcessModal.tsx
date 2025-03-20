import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
    TextField,
    Button,
    Box,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select'; // Importe o tipo correto

interface CreateProcessModalProps {
    open: boolean;
    onClose: () => void;
    onProcessCreated: () => void;
}

const CreateProcessModal: React.FC<CreateProcessModalProps> = ({ open, onClose, onProcessCreated }) => {
    const [name, setName] = useState('');
    const [tools, setTools] = useState('');
    const [responsibles, setResponsibles] = useState('');
    const [documentations, setDocumentations] = useState('');
    const [fatherProcess, setFatherProcess] = useState('');
    const [areaId, setAreaId] = useState('');
    const [showAreaField, setShowAreaField] = useState(true);

    const [areas, setAreas] = useState<{ id: string; name: string }[]>([]);
    const [processes, setProcesses] = useState<{ id: string; name: string; area_id: string }[]>([]);

    useEffect(() => {
        const fetchAreasAndProcesses = async () => {
            try {
                const areasResponse = await api.get('/area');
                const processesResponse = await api.get('/process');

                const sortedAreas = areasResponse.data.areas.sort((a: { name: string }, b: { name: string }) =>
                    a.name.localeCompare(b.name)
                );

                const sortedProcesses = processesResponse.data.processes.sort((a: { name: string }, b: { name: string }) =>
                    a.name.localeCompare(b.name)
                );

                setAreas(sortedAreas);
                setProcesses(sortedProcesses);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAreasAndProcesses();
    }, []);

    const isValidUUID = (uuid: string) => {
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return uuidRegex.test(uuid);
    };

    const handleFatherProcessChange = (e: SelectChangeEvent<string>) => {
        const selectedFatherProcessId = e.target.value;
        setFatherProcess(selectedFatherProcessId);

        if (selectedFatherProcessId) {
            const selectedProcess = processes.find(process => process.id === selectedFatherProcessId);
            if (selectedProcess) {
                setAreaId(selectedProcess.area_id); 
                setShowAreaField(false);
            }
        } else {
            setAreaId('');
            setShowAreaField(true);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (showAreaField && (!areaId || !isValidUUID(areaId))) {
            console.error('Area ID is required and must be a valid UUID');
            return;
        }

        if (fatherProcess && !isValidUUID(fatherProcess)) {
            console.error('Invalid father process ID');
            return;
        }

        const payload: Record<string, any> = {
            name,
            area_id: areaId,
        };

        if (tools) payload.tools = tools;
        if (responsibles) payload.responsibles = responsibles;
        if (documentations) payload.documentations = documentations;
        if (fatherProcess) payload.father_process = fatherProcess;

        console.log('Payload:', payload);

        try {
            const response = await api.post('/process', payload);
            console.log('Process created successfully:', response.data);

            const processesResponse = await api.get('/process');
            const sortedProcesses = processesResponse.data.processes.sort((a: { name: string }, b: { name: string }) =>
                a.name.localeCompare(b.name)
            );
            setProcesses(sortedProcesses);

            onProcessCreated();
            onClose();

            setName('');
            setTools('');
            setResponsibles('');
            setDocumentations('');
            setFatherProcess('');
            setAreaId('');
            setShowAreaField(true);
        } catch (error) {
            console.error('Error creating process:', error);
            if (typeof error === 'object' && error !== null && 'response' in error) {
                const axiosError = error as { response?: { data?: any } };
                console.error('Error response:', axiosError.response?.data);
            }
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Criar Novo Processo</DialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
                    <TextField
                        label="Nome do Processo"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ marginBottom: 2 }}
                        required
                    />
                    <TextField
                        label="Ferramentas Utilizadas"
                        variant="outlined"
                        fullWidth
                        value={tools}
                        onChange={(e) => setTools(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Responsáveis"
                        variant="outlined"
                        fullWidth
                        value={responsibles}
                        onChange={(e) => setResponsibles(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />
                    <TextField
                        label="Documentação"
                        variant="outlined"
                        fullWidth
                        value={documentations}
                        onChange={(e) => setDocumentations(e.target.value)}
                        sx={{ marginBottom: 2 }}
                    />

                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <InputLabel id="father-process-label">Processo Pai</InputLabel>
                        <Select
                            labelId="father-process-label"
                            value={fatherProcess}
                            onChange={handleFatherProcessChange}
                            label="Processo Pai"
                        >
                            <MenuItem value="">Nenhum</MenuItem>
                            {processes.map((process) => (
                                <MenuItem key={process.id} value={process.id}>
                                    {process.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {showAreaField && (
                        <FormControl fullWidth sx={{ marginBottom: 2 }}>
                            <InputLabel id="area-label">Área</InputLabel>
                            <Select
                                labelId="area-label"
                                value={areaId}
                                onChange={(e) => setAreaId(e.target.value as string)}
                                label="Área"
                                required={showAreaField} // Campo obrigatório apenas se visível
                            >
                                {areas.map((area) => (
                                    <MenuItem key={area.id} value={area.id}>
                                        {area.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}

                    <DialogActions>
                        <Button onClick={onClose} color="secondary">
                            Cancelar
                        </Button>
                        <Button type="submit" color="primary">
                            Criar
                        </Button>
                    </DialogActions>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProcessModal;