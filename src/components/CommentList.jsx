import { useParams } from "react-router";
import {
  getArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
} from "../../api";
import { useEffect, useState, useContext } from "react";
import CommentCard from "./CommentCard";
import CommentsFilterBar from "./CommentsFilterBar";
import CommentArticleCard from "./CommentArticleCard";
import { AccountContext } from "../context/Account";
import "../styles/CommentList.css";

function CommentList() {
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { loggedInUser } = useContext(AccountContext);
  const [commentInput, setCommentInput] = useState("");

  const { article_id } = useParams();
  useEffect(() => {
    setIsLoading(true);
    setError(false);
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

  function handleChange(e) {
    setCommentInput(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!commentInput.trim()) {
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
      })
      .catch((err) => {
        console.log(err);
        setError(true);
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
    <>
      <CommentArticleCard
        article={article}
        setArticle={setArticle}
        loggedInUser={loggedInUser}
      />
      <div className="comments-container">
        <h4>Comments</h4>
        <CommentsFilterBar />
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              loggedInUser={loggedInUser}
              handleCommentDelete={handleCommentDelete}
            />
          );
        })}
      </div>
      {loggedInUser ? (
        <footer className="comment-form-container">
          <form className="comment-form" onSubmit={handleSubmit}>
            <input
              id="comment"
              type="text"
              placeholder="Write a comment..."
              value={commentInput}
              onChange={handleChange}
            />
            <button>Submit</button>
          </form>
        </footer>
      ) : null}
    </>
  );
}

export default CommentList;
