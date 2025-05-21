import { useState, useEffect } from "react";
import ArticleCard from "./ArticleCard";
import ArticlesFilterBar from "./ArticlesFilterBar";
import { getArticles } from "../../api";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    getArticles()
      .then((res) => {
        setArticles(res);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <p>Loading...</p>;
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
