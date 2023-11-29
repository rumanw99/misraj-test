import { QueryKey, useQuery } from 'react-query';
import { getPosts } from '../core/api/queries/getPost';
import { GridPaginationModel } from '@mui/x-data-grid';

export const usePosts = ({
    paginationModel,
    queryKey,
}: {
    paginationModel: GridPaginationModel;
    queryKey: QueryKey;
}) => {
    const query = useQuery(
        queryKey,
        () =>
            getPosts({
                paginate: {
                    limit: paginationModel.pageSize,
                    page: paginationModel.page + 1,
                },
            }),
        {
            select: (res) => res.posts,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        }
    );
    return query;
};
