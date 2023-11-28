import { graphQLClient } from "../client";
import { Post } from "../../models/post.type";

export const getPosts = () => {
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
  return graphQLClient.request<{posts : {data : Post[]}}>(query);
};
