import React from "react";
import { useParams } from "react-router-dom";

import { GlobalContext } from "../../context/GlobalContextProvider";

import { Loader } from "../common/Loader";
import { Error } from "../common/Error";
import { NoData } from "../common/NoData";
import { PostCard } from "./PostCard";
import { post } from "../../context/reducer/Reducers";

type TPostParam = {
  topicId: string;
};

export const PostList: React.FC = () => {
  const { state, loadPosts } = React.useContext(GlobalContext);

  const { postList, loading, error } = state;
  let { topicId } = useParams() as TPostParam;
  React.useEffect(() => {
    loadPosts(topicId);
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error />;
  if (postList.length <= 0) return <NoData />;

  return (
    <div className="row">
      {postList.map((post: post) => (
        <PostCard key={post.pid} post={post} />
      ))}
    </div>
  );
};
