import React from "react";
import { useParams } from "react-router-dom";

import { GlobalContext } from "../../context/GlobalContextProvider";
import { TopicCard } from "./TopicCard";
import { Loader } from "../common/Loader";
import { Error } from "../common/Error";
import { NoData } from "../common/NoData";

import { topic } from "../../context/reducer/Reducers";

type TtopicParam = {
  categoryId: string;
};

export const TopicList: React.FC = () => {
  const { state, loadTopics } = React.useContext(GlobalContext);

  const { topicList, loading, error } = state;
  const { categoryId } = useParams() as TtopicParam;

  React.useEffect(() => {
    loadTopics(categoryId);
  }, []);

  if (loading) return <Loader />;
  if (error) return <Error />;
  if (topicList.length <= 0) return <NoData />;

  return (
    <div className="row">
      <ol className="list-group ">
        {topicList.map((topic: topic) => (
          <TopicCard key={topic.tid} topic={topic} />
        ))}
      </ol>
    </div>
  );
};
