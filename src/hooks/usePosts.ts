import { useQuery } from "react-query";
import { getPosts } from "../core/api/queries/getPost";

export const usePosts = () => {
	const query = useQuery(['posts'], getPosts,{
		select : (res) => res.posts.data,
	});
	return query
}