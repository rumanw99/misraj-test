import { graphQLClient } from '../client';

export const deletePost = async (postId: number): Promise<boolean> => {
    const mutation = `
	  mutation DeletePost($id: ID!) {
		deletePost(id: $id) 
	  }
	`;

    const variables = { id: postId };
    const data = await graphQLClient.request(mutation, variables);
    return data.deletePost as boolean;
};
