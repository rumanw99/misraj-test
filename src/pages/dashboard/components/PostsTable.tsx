import React from 'react';
import { IconButton, Box, Avatar, Typography } from '@mui/material';
import { Post } from '../../../core/models/post.type';
import { GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import DetailsIcon from '../../../components/icons/DetailsIcon';
import EditIcon from '../../../components/icons/EditIcon';
import DeleteIcon from '../../../components/icons/DeleteIcon';
interface PostsTableProps {
    posts: Post[] | undefined;
    onViewDetails: (postId: number) => void;
    onEditPost: (post: Post) => void;
    onDeletePost: (postId: number) => void;
    paginationModel: GridPaginationModel;
    onPaginationModelChange: (model: GridPaginationModel) => void;
    totalCount: number;
    isLoading: boolean;
}

const PostsTable: React.FC<PostsTableProps> = ({
    posts,
    onViewDetails,
    onEditPost,
    onDeletePost,
    onPaginationModelChange,
    paginationModel,
    totalCount,
    isLoading,
}) => {
    const columns: GridColDef<Post>[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'user',
            headerName: 'Name',
            flex: 1,
            width: 200,
            renderCell: ({ row }) => {
                return (
                    <Box display="flex" alignItems="center" columnGap={1}>
                        <Avatar
                            src="https://i.pravatar.cc/150?img=4"
                            sx={{
                                width: '36px',
                                height: '36px',
                                borderColor: ({ palette }) =>
                                    palette.primary.light,
                            }}
                        />

                        <Typography
                            sx={{
                                color: '#121212',
                                fontSize: 14,
                                fontWeight: '400',
                            }}
                        >
                            {row.user?.name || "No name"}
                        </Typography>
                    </Box>
                );
            },
        },
        { field: 'title', headerName: 'Title', flex: 1 },
        { field: 'body', headerName: 'Body', flex: 1 },

        {
            field: 'actions',
            headerName: 'Actions',
            width: 140,
            headerAlign: 'center',
            renderCell: (params) => (
                <>
                    <IconButton
                        onClick={() => onViewDetails(params.row.id as number)}
                    >
                        <DetailsIcon />
                    </IconButton>
                    <IconButton onClick={() => onEditPost(params.row as Post)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => onDeletePost(params.row.id as number)}
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];
    return (
        <div style={{ height: 450, width: '100%' }}>
            <DataGrid
                loading={isLoading}
                rows={posts || []}
                columns={columns}
                pageSizeOptions={[20, 50, 100]}
                paginationMode="server"
                pagination
                paginationModel={paginationModel}
                onPaginationModelChange={onPaginationModelChange}
                rowCount={totalCount}
                checkboxSelection
            />
        </div>
    );
};

export default PostsTable;
