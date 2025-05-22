import "../styles/CommentCard.css"
import dayjs from "dayjs";

function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <p>
        {comment.author} · {dayjs(comment.created_at).format("DD/MM/YYYY HH:mm:ss")}
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
      </div>
    </div>
  );
}

export default CommentCard;
