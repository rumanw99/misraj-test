import { useMutation, useQueryClient } from 'react-query';
import { updatePost } from '../core/api/mutations/updatePost';
import { Post } from '../core/models/post.type';

export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(updatePost, {
        onSuccess: (data) => {
            queryClient.setQueryData<{ posts: { data: Post[] } } | undefined>(
                ['posts'],
                (prev) => {
                    if (!prev) return { posts: { data: [] } };

                    return {
                        posts: {
                            data: prev.posts.data.map((post) =>
                                post.id === data.id ? { ...post, ...data } : post
                            ),
                        },
                    };
                }
            );
        },
    });

    return mutation;
};
