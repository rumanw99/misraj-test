import { useMutation, useQueryClient } from 'react-query';
import { createPost } from '../core/api/mutations/createPost';
import { Post } from '../core/models/post.type';

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(createPost, {
        onSuccess: (newPost) => {
            queryClient.setQueryData<{ posts: { data: Post[] } } | undefined>(
                ['posts'],
                (prev) => {
                    if (prev) {
                        return {
                            posts: { data: [...prev.posts.data, newPost] },
                        };
                    }
                    return { posts: { data: [newPost] } };
                }
            );
            queryClient.invalidateQueries(['posts']);
        },
    });

    return mutation;
};
