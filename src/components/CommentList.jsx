import { useParams } from "react-router";
import { getArticleById, getCommentsByArticleId } from "../../api";
import { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import CommentCard from "./CommentCard";
import CommentsFilterBar from "./CommentsFilterBar";

function CommentList() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { article_id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getArticleById(article_id),
      getCommentsByArticleId(article_id),
    ])
      .then(([fetchedArticle, fetchedComments]) => {
        setArticle(fetchedArticle);
        setComments(fetchedComments);
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
      <ArticleCard article={article} />
      <div className="comments-container">
        <h4>Comments</h4>
        <CommentsFilterBar />
        {comments.map((comment) => {
          return <CommentCard key={comment.comment_id} comment={comment} />;
        })}
      </div>
    </>
  );
}

export default CommentList;
