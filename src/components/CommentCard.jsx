import { deleteCommentById } from "../../api";
import "../styles/CommentCard.css";
import dayjs from "dayjs";

function CommentCard({ comment, loggedInUser, handleCommentDelete }) {
  function handleClick() {
    deleteCommentById(comment.comment_id)
      .then(() => {
        handleCommentDelete(comment.comment_id);
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to delete comment. Please try again.");
      });
  }

  return (
    <div className="comment-card">
      <p>
        {comment.author} ·{" "}
        {dayjs(comment.created_at).format("DD/MM/YYYY HH:mm:ss")}
      </p>

      <div className="comment-content">
        <p>{comment.body}</p>
      </div>

      <div className="comment-footer">
        <div className="comment-box">
          <button> &#8679;</button>
          <p>{comment.votes}</p>
          <button>&#8681;</button>
        </div>
        {loggedInUser.username === comment.author ? (
          <div className="comment-delete-btn">
            <button onClick={handleClick}>Delete</button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CommentCard;
