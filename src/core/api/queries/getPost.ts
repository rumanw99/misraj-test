import { graphQLClient } from '../client';
import { Post } from '../../models/post.type';
import { Pagination } from '../../../types/pagination.type';
import { WithPageMeta } from '../../../types/withPagaMeta';

export const getPosts = ({ paginate }: { paginate: Pagination }) => {
    const query = `
  query getPosts($paginate: PaginateOptions){
    posts(options: {paginate :$paginate}) {
      data {
        id
        title
        body
        user {
          id
          name
        }
      }
      meta {
        totalCount
      }
    }
  }
`;
    return graphQLClient.request<{ posts: WithPageMeta<{ data: Post[] }> }>(
        query,
        {
            paginate,
        }
    );
};
