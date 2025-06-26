import { Link } from "react-router";
import dayjs from "dayjs";

function ArticleCard({ article }) {
  return (
    <Link
      style={{ textDecoration: "none" }}
      to={`/articles/${article.article_id}`}
    >
      <article className="article-card">
        <h1>{article.title}</h1>
        <p>
          {article.author} · {article.topic} ·{"   "}
          {dayjs(article.created_at).format("DD/MM/YYYY")}
        </p>

        <figure className="article-image">
          <img src={article.article_img_url} alt="Article's Image" />
        </figure>

        <div className="article-footer">
          <button className="vote-box">{article.votes} votes</button>

          <button className="comment-box">
            {article.comment_count} comments
          </button>
        </div>
      </article>
    </Link>
  );
}

export default ArticleCard;
