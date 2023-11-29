import { QueryKey, useMutation, useQueryClient } from 'react-query';
import { deletePost } from '../core/api/mutations/deletePost';
import { Post } from '../core/models/post.type';
import { WithPageMeta } from '../types/withPagaMeta';

export const useDeletePost = ({ queryKey }: { queryKey: QueryKey }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(deletePost, {
        onSuccess: (success, id) => {
            if (success) {
                queryClient.setQueryData<
                    { posts: WithPageMeta<{ data: Post[] }> } | undefined
                >(queryKey, (prev) => {
                    if (!prev)
                        return { posts: { data: [], meta: { totalCount: 0 } } };

                    return {
                        posts: {
                            data: prev.posts.data.filter(
                                (post) => post.id !== id
                            ),
                            meta: {
                                totalCount: prev.posts.meta.totalCount - 1,
                            },
                        },
                    };
                });
            }
        },
    });

    return mutation;
};
