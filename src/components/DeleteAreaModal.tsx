import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface DeleteAreaModalProps {
    open: boolean;
    onClose: () => void;
    area: { id: string; name: string };
    onDelete: (id: string) => void;
}

const DeleteAreaModal: React.FC<DeleteAreaModalProps> = ({ open, onClose, area, onDelete }) => {
    const handleDelete = () => {
        onDelete(area.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <Typography>
                    Tem certeza que deseja excluir a área "{area.name}"?
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancelar</Button>
                <Button onClick={handleDelete} color="error">
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteAreaModal;