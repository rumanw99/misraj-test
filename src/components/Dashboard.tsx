// components/Dashboard.tsx

import React, { useState } from 'react';
import {
    Container,
    Typography,
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as postValidation from '../utils/postValidation';
import { useFormik } from 'formik';
import EditPostForm from './EditPostForm'; // Import the EditPostForm component
import ViewDetailsDialog from './ViewDetailsDialog';
import DeletePostDialog from './DeletePostDialog';
import { Post, createPost, deletePost, getPosts, updatePost } from '../queries/postQueries';



const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCreatePostDialogOpen, setCreatePostDialogOpen] = useState(false);
    const queryClient = useQueryClient();

    const [isEditPostDialogOpen, setEditPostDialogOpen] = useState(false);
    const [editPostId, setEditPostId] = useState<number | null>(null);

    const handleSidebarToggle = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        navigate('/');
    };

    const { data: posts } = useQuery('posts', getPosts);

    const createPostMutation = useMutation(createPost, {
        onMutate: (newPost) => {
            // Generate a temporary id for optimistic update
            const temporaryId = Date.now();

            // Optimistically update the cache with the new post
            queryClient.setQueryData('posts', (prev: Post[] | undefined) => {
                return prev
                    ? [...prev, { ...newPost, id: temporaryId }]
                    : [{ ...newPost, id: temporaryId }];
            });

            // Return a context object that can be used in onSettled or onError
            return { temporaryId };
        },
        
		
    });

    const deletePostMutation = useMutation(deletePost, {
        onSuccess: ({ id }) => {
            queryClient.setQueryData('posts', (prev: Post[] | undefined) => {
                return prev ? prev.filter((post) => post.id !== id) : [];
            });
        },
    });

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

    //   const [editPostId, setEditPostId] = useState<number | null>(null);

    const handleEditPost = (postId: number) => {
        setEditPostId(postId);
        setEditPostDialogOpen(true);
    };

    const [viewDetailsPost, setViewDetailsPost] = useState<Post | null>(null);

    const handleViewDetails = (postId: number) => {
        const selectedPost = posts?.find((post) => post.id === postId);
        setViewDetailsPost(selectedPost || null);
    };

    const [deletePostId, setDeletePostId] = useState<number | null>(null);

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

    const updatePostMutation = useMutation(updatePost, {
        onSuccess: (data) => {
            queryClient.setQueryData('posts', (prev: Post[] | undefined) => {
                if (!prev) return [];

                return prev.map((post) =>
                    post.id === data.id ? { ...post, ...data } : post
                );
            });

            setEditPostDialogOpen(false);
        },
    });

    const handleUpdatePost = (values: { title: string; body: string }) => {
        if (editPostId) {
            updatePostMutation.mutate({
                postId: editPostId,
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

            {/* Sidebar */}
            <Drawer
                anchor="left"
                open={isSidebarOpen}
                onClose={handleSidebarToggle}
            >
                <List>
                    <ListItem button>
                        <ListItemText primary="Posts" />
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => setCreatePostDialogOpen(true)}
                    >
                        <ListItemText primary="Create Post" />
                    </ListItem>
                    {/* Add more sidebar items based on your requirements */}
                </List>
            </Drawer>

            {/* Main Content */}
            <Typography variant="h4" style={{ margin: '20px 0' }}>
                Posts
            </Typography>

            {/* Table displaying each row as a single post with actions */}
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
                                        onClick={() => handleEditPost(post.id)}
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

            {/* Edit Post Dialog */}
            <Dialog
                open={isEditPostDialogOpen}
                onClose={() => setEditPostDialogOpen(false)}
            >
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    {/* Render the EditPostForm component with the current editPostId */}
                    {editPostId !== null && (
                        <EditPostForm
                            postId={editPostId || 0}
                            onClose={() => setEditPostDialogOpen(false)}
                            onUpdatePost={handleUpdatePost}
							// post={(posts ?? []).find((post) => post.id === editPostId) || { id: 0, title: '', body: '' }}
                        />
                    )}
                </DialogContent>
            </Dialog>

            {/* Create Post Dialog */}
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
