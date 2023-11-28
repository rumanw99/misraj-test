import { Post } from "../../models/post.type";
import { graphQLClient } from "../client";

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