import { QueryKey, useMutation, useQueryClient } from 'react-query';
import { updatePost } from '../core/api/mutations/updatePost';
import { Post } from '../core/models/post.type';
import { WithPageMeta } from '../types/withPagaMeta';

export const useUpdatePost = ({ queryKey }: { queryKey: QueryKey }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(updatePost, {
        onSuccess: (data) => {
            queryClient.setQueryData<
                { posts: WithPageMeta<{ data: Post[] }> } | undefined
            >(queryKey, (prev) => {
                if (!prev)
                    return { posts: { data: [], meta: { totalCount: 0 } } };

                return {
                    posts: {
                        data: prev.posts.data.map((post) =>
                            post.id === data.id ? { ...post, ...data } : post
                        ),
                        meta: {
                            totalCount: prev.posts.meta.totalCount,
                        },
                    },
                };
            });
        },
    });

    return mutation;
};
