import { useParams, Link } from "react-router";
import {
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
} from "../../api";
import { useEffect, useState, useContext, useRef, useCallback } from "react";
import CommentCard from "../components/CommentCard";
import SelectedArticleCard from "../components/SelectedArticleCard";
import CustomLoading from "../components/CustomLoading";
import CustomError from "../components/CustomError";
import { AccountContext } from "../context/Account";
import { toast } from "sonner";

function CommentsPage() {
  const { loggedInUser } = useContext(AccountContext);
  const { article_id } = useParams();

  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const observer = useRef();
  const lastCommentElementRef = useCallback(
    (node) => {
      if (isCommentsLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isCommentsLoading, hasMore]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(false);
    getArticleById(article_id)
      .then((res) => {
        setArticle(res);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    setIsCommentsLoading(true);
    setCommentsError(false);

    getCommentsByArticleId(article_id, { p: pageNumber })
      .then((res) => {
        setComments((prevComments) => [...prevComments, ...res]);
        setHasMore(res.length > 0);
      })
      .catch((err) => {
        setCommentsError(true);
      })
      .finally(() => setIsCommentsLoading(false));
  }, [pageNumber]);

  if (isLoading) return <CustomLoading>Loading Article...</CustomLoading>;
  if (error)
    return (
      <CustomError>
        <h1 className="error-title">Oops! Something went wrong.</h1>
        <div className="error-message">
          <p>We're having trouble loading article.</p>
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

  function handleChange(e) {
    setCommentInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    if (!commentInput.trim()) {
      setIsSubmitting(false);
      return;
    }

    postCommentByArticleId(
      article.article_id,
      loggedInUser.username,
      commentInput
    )
      .then((res) => {
        setComments((prevComments) => [res, ...prevComments]);
        setCommentInput("");
        toast.success("Comment submitted!");
      })
      .catch((err) => {
        toast.error("Failed to submit comment! Please try again!");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  function handleCommentDelete(comment_id) {
    setComments((prevComments) =>
      prevComments.filter(
        (eachComment) => eachComment.comment_id !== comment_id
      )
    );
  }

  return (
    <main>
      <article>
        <SelectedArticleCard
          article={article}
          setArticle={setArticle}
          loggedInUser={loggedInUser}
        />
      </article>
      {commentsError ? (
        <CustomError>
          <h1 className="error-title">Oops! Something went wrong.</h1>
          <div className="error-message">
            <p>We're having trouble loading comments.</p>
            <p>Please try again later.</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="error-button"
          >
            Retry
          </button>
        </CustomError>
      ) : (
        <section className="comments-container">
          <h4 style={{ padding: "1rem" }}>Comments</h4>
          {loggedInUser ? null : (
            <p className="comments-note">
              Please{" "}
              <Link to={"/profile"}>
                <button>Sign In</button>
              </Link>{" "}
              to <strong>vote</strong> or <strong>comment</strong>.
            </p>
          )}

          {comments.map((comment, index) => {
            if (comments.length === index + 1) {
              return (
                <CommentCard
                  ref={lastCommentElementRef}
                  key={comment.comment_id}
                  comment={comment}
                  loggedInUser={loggedInUser}
                  handleCommentDelete={handleCommentDelete}
                />
              );
            } else {
              return (
                <CommentCard
                  key={comment.comment_id}
                  comment={comment}
                  loggedInUser={loggedInUser}
                  handleCommentDelete={handleCommentDelete}
                />
              );
            }
          })}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
            }}
          >
            {isCommentsLoading ? <div className="comments-loader"></div> : null}
          </div>

          {loggedInUser ? (
            <footer className="comment-form-container">
              <form className="comment-form" onSubmit={handleSubmit}>
                <textarea
                  id="comment"
                  type="text"
                  placeholder="Write a comment..."
                  value={commentInput}
                  onChange={handleChange}
                />
                <button disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </footer>
          ) : null}
        </section>
      )}
    </main>
  );
}

export default CommentsPage;
