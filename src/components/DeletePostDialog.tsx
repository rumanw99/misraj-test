// components/DeletePostDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';

interface DeletePostDialogProps {
  onClose: () => void;
  onDelete: () => void;
}

const DeletePostDialog: React.FC<DeletePostDialogProps> = ({ onClose, onDelete }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Delete Post</DialogTitle>
      <DialogContent>
        <Typography variant="body1" paragraph>
          Are you sure you want to delete this post?
        </Typography>

        <Button variant="contained" color="primary" onClick={onDelete}>
          Delete
        </Button>
        <Button variant="outlined" color="primary" onClick={onClose}>
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostDialog;
