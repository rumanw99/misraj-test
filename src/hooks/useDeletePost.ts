import { useMutation, useQueryClient } from 'react-query';
import { deletePost } from '../core/api/mutations/deletePost';
import { Post } from '../core/models/post.type';

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(deletePost, {
    onSuccess: (success, id) => {
      if (success) {
        queryClient.setQueryData<{ posts: { data: Post[] } } | undefined>(
          ['posts'],
          (prev) => {
            if (!prev) return { posts: { data: [] } };

            return {
              posts: {
                data: prev.posts.data.filter((post) => post.id !== id),
              },
            };
          }
        );
      }
    },
  });

  return mutation;
};
