import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
} from '@mui/material';
import { useFormik } from 'formik';
import * as postValidation from '../utils/postValidation';
import { useCreatePost } from '../hooks/useCreatePost';

interface CreatePostDialogProps {
    open: boolean;
    onClose: () => void;
}

const CreatePostDialog: React.FC<CreatePostDialogProps> = ({
    open,
    onClose,
}) => {
    const createPostMutation = useCreatePost();
    const createPostForm = useFormik({
        initialValues: {
            title: '',
            body: '',
        },
        validationSchema: postValidation.createPostSchema,
        onSubmit: (values) => {
            createPostMutation.mutate(values);
			onClose()
        },
    });

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create Post</DialogTitle>
            <DialogContent>
                <form onSubmit={createPostForm.handleSubmit}>
                    <TextField
                        {...createPostForm.getFieldProps('title')}
                        fullWidth
                        id="title"
                        name="title"
                        label="Title"
                        error={
                            createPostForm.touched.title &&
                            Boolean(createPostForm.errors.title)
                        }
                        helperText={
                            createPostForm.touched.title &&
                            createPostForm.errors.title
                        }
                        margin="normal"
                    />
                    <TextField
                        {...createPostForm.getFieldProps('body')}
                        fullWidth
                        id="body"
                        name="body"
                        label="Body"
                        multiline
                        rows={4}
                        error={
                            createPostForm.touched.body &&
                            Boolean(createPostForm.errors.body)
                        }
                        helperText={
                            createPostForm.touched.body &&
                            createPostForm.errors.body
                        }
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Create
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreatePostDialog;
