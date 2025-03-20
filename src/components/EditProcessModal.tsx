import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface EditProcessModalProps {
    open: boolean;
    onClose: () => void;
    process: {
        id: string;
        name: string;
        tools: string;
        responsibles: string;
        documentations: string;
    };
    onSave: (id: string, updatedProcess: { name: string; tools: string; responsibles: string; documentations: string }) => void;
}

const EditProcessModal: React.FC<EditProcessModalProps> = ({ open, onClose, process, onSave }) => {
    const [editedName, setEditedName] = useState(process.name);
    const [editedTools, setEditedTools] = useState(process.tools);
    const [editedResponsibles, setEditedResponsibles] = useState(process.responsibles);
    const [editedDocumentations, setEditedDocumentations] = useState(process.documentations);

    const handleSave = () => {
        onSave(process.id, {
            name: editedName,
            tools: editedTools,
            responsibles: editedResponsibles,
            documentations: editedDocumentations,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Processo</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Nome do Processo"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    fullWidth
                    label="Ferramentas"
                    value={editedTools}
                    onChange={(e) => setEditedTools(e.target.value)}
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    fullWidth
                    label="Responsáveis"
                    value={editedResponsibles}
                    onChange={(e) => setEditedResponsibles(e.target.value)}
                    sx={{ marginTop: 2 }}
                />
                <TextField
                    fullWidth
                    label="Documentação"
                    value={editedDocumentations}
                    onChange={(e) => setEditedDocumentations(e.target.value)}
                    sx={{ marginTop: 2 }}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleSave} color="primary">
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProcessModal;