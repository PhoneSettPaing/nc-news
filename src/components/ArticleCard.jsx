import "../styles/ArticleCard.css";

function ArticleCard({ article }) {
  return (
    <div className="article-card">
      <h1>{article.title}</h1>

      <p>
        {article.author} · {article.topic} · {article.created_at}
      </p>

      <div
        className={article.body ? "article-content" : "article-content-nobody"}
      >
        {article.body ? <p>Description</p> : <></>}
        <img src={article.article_img_url} alt="Article's Image" />
      </div>

      <div className="article-footer">
        <div className="vote-box">
          <button> &#8679;</button>
          <p>{article.votes}</p>
          <button>&#8681;</button>
        </div>

        <div className="comment-box">
          <button>{article.comment_count} comments</button>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
