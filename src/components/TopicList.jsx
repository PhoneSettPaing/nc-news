import { useState, useEffect } from "react";
import { getTopics } from "../../api";
import TopicCard from "./TopicCard";

function TopicList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(false);

    getTopics()
      .then((res) => {
        setTopics(res);
      })
      .catch((err) => setError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Sorry, something went wrong there</p>;

  return (
    <>
      {topics.map((topic) => {
        return <TopicCard key={topic.slug} topic={topic} />;
      })}
    </>
  );
}

export default TopicList;
