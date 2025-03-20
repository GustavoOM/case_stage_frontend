import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

interface EditAreaModalProps {
    open: boolean;
    onClose: () => void;
    area: { id: string; name: string };
    onSave: (id: string, newName: string) => void;
}

const EditAreaModal: React.FC<EditAreaModalProps> = ({ open, onClose, area, onSave }) => {
    const [editedName, setEditedName] = useState(area.name);

    const handleSave = () => {
        onSave(area.id, editedName);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Editar Área</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Nome da Área"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
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

export default EditAreaModal;