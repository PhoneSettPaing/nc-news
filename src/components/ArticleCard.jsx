import "../styles/ArticleCard.css";
import { Link } from "react-router";
import dayjs from "dayjs";

function ArticleCard({ article }) {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/articles/${article.article_id}`}
    >
      <div className="article-card">
        <h1>{article.title}</h1>
        <p>
          {article.author} · {article.topic} · {dayjs(article.created_at).format("DD/MM/YYYY HH:mm:ss")}
        </p>

        <div className="article-content-nobody">
          <img src={article.article_img_url} alt="Article's Image" />
        </div>

        <div className="article-footer">
          <div className="vote-box">
            <p>{article.votes} votes</p>
          </div>

          <div className="comment-box">
            <p>{article.comment_count} comments</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticleCard;
