import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface DeleteProcessModalProps {
    open: boolean;
    onClose: () => void;
    process: { id: string; name: string };
    onDelete: (id: string) => void;
}

const DeleteProcessModal: React.FC<DeleteProcessModalProps> = ({ open, onClose, process, onDelete }) => {
    const handleDelete = () => {
        onDelete(process.id);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogContent>
                <Typography>
                    Tem certeza que deseja excluir o processo "{process.name}"?
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

export default DeleteProcessModal;