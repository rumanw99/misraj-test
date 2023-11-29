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
    ListItemText,
    Button,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import ViewDetailsDialog from './ViewDetailsDialog';
import DeletePostDialog from './DeletePostDialog';
import { Post } from '../core/models/post.type';
import { Nullable } from '../types/nullable.type';
import { usePosts } from '../hooks/usePosts';
import { useDeletePost } from '../hooks/useDeletePost';
import EditPostDialog from './EditPostDialog';
import CreatePostDialog from './CreatePostDialog';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isCreatePostDialogOpen, setCreatePostDialogOpen] = useState(false);
    const [isEditPostDialogOpen, setEditPostDialogOpen] = useState(false);
    const [post, setPost] = useState<Nullable<Post>>(null);
    const { data: posts } = usePosts();

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

    React.useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        if (!token || !userId) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

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
            <EditPostDialog
                open={isEditPostDialogOpen}
                onClose={() => setEditPostDialogOpen(false)}
                post={post}
            />
            <CreatePostDialog
                open={isCreatePostDialogOpen}
                onClose={() => setCreatePostDialogOpen(false)}
            />
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
