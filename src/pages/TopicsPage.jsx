import { useState, useEffect } from "react";
import { getTopics } from "../../api";
import TopicCard from "../components/TopicCard";
import CustomLoading from "../components/CustomLoading";
import CustomError from "../components/CustomError";

function TopicsPage() {
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

  if (isLoading) return <CustomLoading>Loading Topics...</CustomLoading>;
  if (error)
    return (
      <CustomError>
        <h1 className="error-title">Oops! Something went wrong.</h1>
        <div className="error-message">
          <p>We're having trouble loading topics.</p>
          <p>Please try again later.</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="error-button"
        >
          Retry
        </button>
      </CustomError>
    );

  return (
    <main>
      <h1 className="topics-header">Topics</h1>
      {topics.map((topic) => {
        return <TopicCard key={topic.slug} topic={topic} />;
      })}
    </main>
  );
}

export default TopicsPage;
