import { QueryKey, useMutation, useQueryClient } from 'react-query';
import { createPost } from '../core/api/mutations/createPost';
import { Post } from '../core/models/post.type';
import { WithPageMeta } from '../types/withPagaMeta';

export const useCreatePost = ({ queryKey }: { queryKey: QueryKey }) => {
    const queryClient = useQueryClient();

    const mutation = useMutation(createPost, {
        onSuccess: (newPost) => {
            queryClient.setQueryData<
                { posts: WithPageMeta<{ data: Post[] }> } | undefined
            >(queryKey, (prev) => {
                if (prev) {
                    return {
                        posts: {
                            data: [...prev.posts.data, newPost],
                            meta: {
                                totalCount: prev.posts.meta.totalCount + 1,
                            },
                        },
                    };
                }
                return { posts: { data: [newPost], meta: { totalCount: 1 } } };
            });
        },
    });

    return mutation;
};
