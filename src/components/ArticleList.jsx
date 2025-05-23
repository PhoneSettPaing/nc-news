import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import ArticlesFilterBar from "./ArticlesFilterBar";
import { getArticles } from "../../api";
import { useSearchParams } from "react-router";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [totalArticlesResult, setTotalArticlesResult] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    sort_by: "created_at",
    order: "desc",
    limit: 10,
    page: 1,
  });

  useEffect(() => {
    const queryTopic = searchParams.get("topic");
    setFilter((prevFilter) => ({
      ...prevFilter,
      topic: queryTopic || "",
    }));
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getArticles(filter)
      .then(({ articles, total_count }) => {
        setArticles(articles);
        setTotalArticlesResult(total_count);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, [filter]);

  if (isLoading === true) return <p>Fetching all Articles...</p>;
  if (error) return <p>Sorry, something went wrong there</p>;

  return (
    <>
      <ArticlesFilterBar
        filter={filter}
        setFilter={setFilter}
        totalArticlesResult={totalArticlesResult}
      />
      {articles.map((article) => {
        return <ArticleCard key={article.article_id} article={article} />;
      })}
    </>
  );
}

export default ArticleList;
