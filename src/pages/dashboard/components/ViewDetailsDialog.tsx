// components/ViewDetailsDialog.tsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';

interface ViewDetailsDialogProps {
  post: {
    id: number;
    title: string;
    body: string;
  };
  onClose: () => void;
}

const ViewDetailsDialog: React.FC<ViewDetailsDialogProps> = ({ post, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Post Details</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Title:
        </Typography>
        <Typography variant="body1" paragraph>
          {post.title}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Body:
        </Typography>
        <Typography variant="body1" paragraph>
          {post.body}
        </Typography>

        <Button variant="contained" color="primary" onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDetailsDialog;
