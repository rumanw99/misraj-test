import { GraphQLClient } from "graphql-request";




const graphQLClient = new GraphQLClient('https://graphqlzero.almansi.me/api');

export interface Post {
  id: number;
  title: string;
  body: string;
}

export const getPosts = async (): Promise<Post[]> => {
  const query = `
  {
    posts {
      data {
        id
        title
        body
      }
    }
  }
`;

  const data = await graphQLClient.request(query);
  return data.posts.data as Post[];
};

export const createPost = async (newPost: {
  title: string;
  body: string;
}): Promise<Post> => {
  const mutation = `
  mutation CreatePost($title: String!, $body: String!) {
    createPost(input: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

  const variables = { title: newPost.title, body: newPost.body };
  const data = await graphQLClient.request(mutation, variables);
  return data.createPost as Post;
};



export const updatePost = async ({
  postId,
  updatedPost,
}: {
  postId: number;
  updatedPost: { title: string; body: string };
}): Promise<Post> => {
  const mutation = `
  mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
  updatePost(id: $id, input: { title: $title, body: $body }) {
    id
    title
    body
  }
  }
`;

  const variables = { id: postId, ...updatedPost };
  const data = await graphQLClient.request(mutation, variables);
  return data.updatePost as Post;
};

export const deletePost = async (postId: number): Promise<{ id: number }> => {
  const mutation = `
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

  const variables = { id: postId };
  const data = await graphQLClient.request(mutation, variables);
  return data.deletePost as { id: number };
};
