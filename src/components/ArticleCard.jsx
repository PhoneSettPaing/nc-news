import "../styles/ArticleCard.css";
import { Link, useLocation, useNavigate } from "react-router";

function ArticleCard({ article }) {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = `/${article.article_id}/comments`;

  function handleClick(e) {
    if (location.pathname === currentPath) {
      e.preventDefault();
    }
  }

  function handleCommentClick(e) {
    if (location.pathname !== currentPath) {
      navigate(currentPath);
    }
  }

  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/${article.article_id}/comments`}
      onClick={handleClick}
    >
      <div className="article-card">
        <h1>{article.title}</h1>

        <p>
          {article.author} · {article.topic} · {article.created_at}
        </p>

        <div
          className={
            article.body ? "article-content" : "article-content-nobody"
          }
        >
          {article.body ? <p>{article.body}</p> : <></>}
          <img src={article.article_img_url} alt="Article's Image" />
        </div>

        <div className="article-footer">
          <div className="vote-box">
            <button> &#8679;</button>
            <p>{article.votes}</p>
            <button>&#8681;</button>
          </div>

          <div className="comment-box">
            <button onClick={handleCommentClick}>
              {article.comment_count} comments
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
