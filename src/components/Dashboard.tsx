// components/Dashboard.tsx

import React, { useState } from 'react';
import {
    Container,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List, ListItemText,
    Button,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    ListItemButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import * as postValidation from '../utils/postValidation';
import { useFormik } from 'formik';
import EditPostForm from './EditPostForm'; // Import the EditPostForm component
import ViewDetailsDialog from './ViewDetailsDialog';
import DeletePostDialog from './DeletePostDialog';
import { Post } from '../core/models/post.type';
import { Nullable } from '../types/nullable.type';
import { usePosts } from '../hooks/usePosts';
import { useCreatePost } from '../hooks/useCreatePost';
import { useUpdatePost } from '../hooks/useUpdatePost';
import { useDeletePost } from '../hooks/useDeletePost';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCreatePostDialogOpen, setCreatePostDialogOpen] = useState(false);
    const [isEditPostDialogOpen, setEditPostDialogOpen] = useState(false);
    const [post, setPost] = useState<Nullable<Post>>(null);
    const { data: posts } = usePosts();
    const createPostMutation = useCreatePost();
    const updatePostMutation = useUpdatePost();
    const deletePostMutation = useDeletePost();
    const [viewDetailsPost, setViewDetailsPost] = useState<Post | null>(null);
    const [deletePostId, setDeletePostId] = useState<number | null>(null);

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        navigate('/');
    };

    const createPostForm = useFormik({
        initialValues: {
            title: '',
            body: '',
        },
        validationSchema: postValidation.createPostSchema,
        onSubmit: (values) => {
            createPostMutation.mutate(values);
        },
    });

    const handleEditPost = (post: Post) => {
        setPost(post);
        setEditPostDialogOpen(true);
    };

    const handleViewDetails = (postId: number) => {
        const selectedPost = posts?.find((post) => post.id === postId);
        setViewDetailsPost(selectedPost || null);
    };

    const handleDeletePost = (postId: number) => {
        setDeletePostId(postId);
    };

    const handleConfirmDelete = () => {
        if (deletePostId) {
            deletePostMutation.mutate(deletePostId);
            setDeletePostId(null);
        }
    };

    const handleCancelDelete = () => {
        setDeletePostId(null);
    };

    const handleUpdatePost = (values: { title: string; body: string }) => {
        if (post) {
            updatePostMutation.mutate({
                postId: post.id,
                updatedPost: values,
            });
        }
    };

    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleSidebarToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    >
                        Dashboard
                    </Typography>
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>

            <Drawer
                anchor="left"
                open={isSidebarOpen}
                onClose={handleSidebarToggle}
            >
                <List>
                    <ListItemButton>
                        <ListItemText primary="Posts" />
                    </ListItemButton>
                    <ListItemButton
                        onClick={() => setCreatePostDialogOpen(true)}
                    >
                        <ListItemText primary="Create Post" />
                    </ListItemButton>
                </List>
            </Drawer>

            <Typography variant="h4" style={{ margin: '20px 0' }}>
                Posts
            </Typography>

            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Body</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts?.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell>{post.id}</TableCell>
                                <TableCell>{post.title}</TableCell>
                                <TableCell>{post.body}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleViewDetails(post.id)
                                        }
                                    >
                                        View Details
                                    </Button>
                                    <Button
                                        onClick={() => handleEditPost(post)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() =>
                                            handleDeletePost(post.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={isEditPostDialogOpen}
                onClose={() => setEditPostDialogOpen(false)}
            >
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <EditPostForm
                        onClose={() => setEditPostDialogOpen(false)}
                        onUpdatePost={handleUpdatePost}
                        post={post}
                    />
                </DialogContent>
            </Dialog>

            <Dialog
                open={isCreatePostDialogOpen}
                onClose={() => setCreatePostDialogOpen(false)}
            >
                <DialogTitle>Create Post</DialogTitle>
                <DialogContent>
                    <form onSubmit={createPostForm.handleSubmit}>
                        <TextField
                            fullWidth
                            id="title"
                            name="title"
                            label="Title"
                            value={createPostForm.values.title}
                            onChange={createPostForm.handleChange}
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
                            fullWidth
                            id="body"
                            name="body"
                            label="Body"
                            multiline
                            rows={4}
                            value={createPostForm.values.body}
                            onChange={createPostForm.handleChange}
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
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Create
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* ... (unchanged code) */}

            {viewDetailsPost && (
                <ViewDetailsDialog
                    post={viewDetailsPost}
                    onClose={() => setViewDetailsPost(null)}
                />
            )}

            {deletePostId && (
                <DeletePostDialog
                    onDelete={handleConfirmDelete}
                    onClose={handleCancelDelete}
                />
            )}
        </Container>
    );
};

export default Dashboard;
