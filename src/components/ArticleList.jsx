import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import ArticlesFilterBar from "./ArticlesFilterBar";
import { getArticles } from "../../api";
import { useSearchParams } from "react-router";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryTopic = searchParams.get("topic");
  console.log(queryTopic);

  useEffect(() => {
    if (queryTopic !== null || queryTopic !== undefined) {
      setIsLoading("topic");
      setError(false);
      const queryParams = { topic: queryTopic };
      getArticles(queryParams)
        .then((res) => {
          setArticles(res);
        })
        .catch((err) => {
          setError(true);
        })
        .finally(() => setIsLoading(null));
    } else {
      setIsLoading("articles");
      setError(false);
      getArticles()
        .then((res) => {
          setArticles(res);
        })
        .catch((err) => {
          setError(true);
        })
        .finally(() => setIsLoading(null));
    }
  }, [queryTopic]);

  if (isLoading === "topic")
    return <p>Fetching Articles Related to Topic...</p>;
  if (isLoading === "articles") return <p>Fetching all Articles...</p>;
  if (error) return <p>Sorry, something went wrong there</p>;

  return (
    <>
      <ArticlesFilterBar />
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </>
  );
}

export default ArticleList;
