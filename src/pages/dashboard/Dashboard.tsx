import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ViewDetailsDialog from './components/ViewDetailsDialog';
import DeletePostDialog from './components/DeletePostDialog';
import { Post } from '../../core/models/post.type';
import { Nullable } from '../../types/nullable.type';
import { usePosts } from '../../hooks/usePosts';
import { useDeletePost } from '../../hooks/useDeletePost';
import EditPostDialog from './components/EditPostDialog';
import CreatePostDialog from './components/CreatePostDialog';
import DashboardLayout from './layouts/DashboardLayout';
import PostsTable from './components/PostsTable';
import { Breadcrumb } from '../../types/breadcrumb.type';
import Breadcrumbs from '../../components/Breadcrumbs';
import { GridPaginationModel } from '@mui/x-data-grid';
import { QueryKey } from 'react-query';

const BREADCRUMBS: Breadcrumb[] = [
    {
        link: '',
        text: 'Posts',
    },
    {
        link: '',
        text: 'Managements',
    },
];
const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [isCreatePostDialogOpen, setCreatePostDialogOpen] = useState(false);
    const [isEditPostDialogOpen, setEditPostDialogOpen] = useState(false);
    const [post, setPost] = useState<Nullable<Post>>(null);
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(
        {
            page: 0,
            pageSize: 20,
        }
    );
    const queryKey: QueryKey = [
        'posts',
        paginationModel.page,
        paginationModel.pageSize,
    ];
    const { data, isLoading } = usePosts({ paginationModel, queryKey });
    const posts = data?.data;
    const totalCount = data?.meta.totalCount;

    const deletePostMutation = useDeletePost({ queryKey });
    const [viewDetailsPost, setViewDetailsPost] = useState<Post | null>(null);
    const [deletePostId, setDeletePostId] = useState<number | null>(null);

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

    const handlePaginationChange = (pagination: GridPaginationModel) => {
        setPaginationModel(pagination);
    };

    React.useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        if (!token || !userId) {
            navigate('/', { replace: true });
        }
    }, [navigate]);

    return (
        <DashboardLayout>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                my={2}
            >
                <Breadcrumbs items={BREADCRUMBS} />
                <Button onClick={() => setCreatePostDialogOpen(true)}>
                    Create post
                </Button>
            </Box>
            <PostsTable
                isLoading={isLoading}
                posts={posts}
                onViewDetails={handleViewDetails}
                onEditPost={handleEditPost}
                onDeletePost={handleDeletePost}
                paginationModel={paginationModel}
                onPaginationModelChange={handlePaginationChange}
                totalCount={totalCount || 0}
            />
            <EditPostDialog
                key={String(isEditPostDialogOpen)}
                open={isEditPostDialogOpen}
                onClose={() => setEditPostDialogOpen(false)}
                post={post}
                queryKey={queryKey}
            />
            <CreatePostDialog
                open={isCreatePostDialogOpen}
                onClose={() => setCreatePostDialogOpen(false)}
                queryKey={queryKey}
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
        </DashboardLayout>
    );
};

export default Dashboard;
