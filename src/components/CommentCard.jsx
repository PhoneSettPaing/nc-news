import "../styles/CommentCard.css"

function CommentCard({ comment }) {
  return (
    <div className="comment-card">
      <p>
        {comment.author} · {comment.created_at}
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
