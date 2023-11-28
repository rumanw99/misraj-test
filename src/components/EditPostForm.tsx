// components/EditPostForm.tsx

import React from 'react';
import { useFormik } from 'formik';
import {
    DialogContent,
    TextField,
    Button,
    CircularProgress,
} from '@mui/material';
import * as Yup from 'yup';
import { GraphQLClient } from 'graphql-request';
import { Post } from '../queries/postQueries';

interface EditPostFormProps {
    postId: number;
    onClose: () => void;
    // Add onUpdatePost prop to EditPostFormProps
    onUpdatePost: (values: { title: string; body: string }) => void;
	post: Post;
}

interface FormValues {
    title: string;
    body: string;
}

const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    body: Yup.string().required('Body is required'),
});

const graphQLClient = new GraphQLClient('https://graphqlzero.almansi.me/api');

const EditPostForm: React.FC<EditPostFormProps> = ({
    postId,
    onClose,
    onUpdatePost,
	
}) => {
    const initialValues: FormValues = {
        title: '',
        body: '',
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            const mutation = `
        mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
          updatePost(id: $id, input: { title: $title, body: $body }) {
            id
            title
            body
          }
        }
      `;

            const variables = {
                id: postId,
                title: values.title,
                body: values.body,
            };

            const data = await graphQLClient.request(mutation, variables);

            console.log('Updated post:', data.updatePost);

            onClose(); // Close the Edit Post Dialog after successful update
            onUpdatePost({ title: values.title, body: values.body });
        } catch (error) {
            console.error('Error updating post:', error);
            // Handle error, e.g., display an error message to the user
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <DialogContent>
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="Title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    margin="normal"
                />
                <TextField
                    fullWidth
                    id="body"
                    name="body"
                    label="Body"
                    multiline
                    rows={4}
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.body && Boolean(formik.errors.body)}
                    helperText={formik.touched.body && formik.errors.body}
                    margin="normal"
                />
            </DialogContent>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? (
                    <CircularProgress size={24} />
                ) : (
                    'Save Changes'
                )}
            </Button>
        </form>
    );
};

export default EditPostForm;
