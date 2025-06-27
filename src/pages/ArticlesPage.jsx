import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import ArticlesFilterBar from "../components/ArticlesFilterBar";
import CustomLoading from "../components/CustomLoading";
import CustomError from "../components/CustomError";
import { getArticles } from "../../api";
import { useSearchParams } from "react-router";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [totalArticlesResult, setTotalArticlesResult] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({
    sort_by: "created_at",
    order: "desc",
    limit: 10,
    p: 1,
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

  if (isLoading === true)
    return <CustomLoading>Loading Articles...</CustomLoading>;
  if (error)
    return (
      <CustomError>
        <h1 className="error-title">Oops! Something went wrong.</h1>
        <div className="error-message">
          <p>We're having trouble loading articles.</p>
          <p>Please try again later.</p>
        </div>
        <button
          onClick={() => setFilter((prev) => ({ ...prev }))}
          className="error-button"
        >
          Retry
        </button>
      </CustomError>
    );

  return (
    <main>
      <ArticlesFilterBar
        filter={filter}
        setFilter={setFilter}
        totalArticlesResult={totalArticlesResult}
        setSearchParams={setSearchParams}
      />
      <section className="articles-container">
        {articles.map((article) => {
          return <ArticleCard key={article.article_id} article={article} />;
        })}
      </section>
    </main>
  );
}

export default ArticlesPage;
