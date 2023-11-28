// components/EditPostDialog.tsx

import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
} from '@mui/material';
import { useFormik } from 'formik';
import { Post } from '../core/models/post.type';
import { useUpdatePost } from '../hooks/useUpdatePost';

interface EditPostDialogProps {
    open: boolean;
    onClose: () => void;
    post: Post | null;
}

const EditPostDialog: React.FC<EditPostDialogProps> = ({
    open,
    onClose,
    post,
}) => {
    const updatePostMutation = useUpdatePost();

    const editPostForm = useFormik({
        initialValues: {
            title: post?.title || '',
            body: post?.body || '',
        },
        onSubmit: (values) => {
            if (post) {
                updatePostMutation.mutate({
                    postId: post.id,
                    updatedPost: values,
                });
            }
            onClose();
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogContent>
                <form onSubmit={editPostForm.handleSubmit}>
                    <TextField
                        {...editPostForm.getFieldProps('title')}
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        margin="normal"
                    />
                    <TextField
                        {...editPostForm.getFieldProps('body')}
                        fullWidth
                        id="body"
                        name="body"
                        label="Body"
                        multiline
                        rows={4}
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Update
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditPostDialog;
