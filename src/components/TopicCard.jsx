// import "../styles/ArticleCard.css";
import { Link } from "react-router";

function TopicCard({ topic }) {
  const capitalizedSlug =
    topic["slug"].charAt(0).toUpperCase() + topic["slug"].slice(1);

  return (
    <Link style={{ textDecoration: "none" }} to={`/articles?topic=${topic.slug}`}>
      <div className="topic-card">
        <h2>{capitalizedSlug}</h2>

        <div className="topic-img">
          {topic.img_url ? (
            <img src={topic.img_url} alt="Topic's Image" />
          ) : null}
        </div>

        <p>{topic.description}</p>
      </div>
    </Link>
  );
}

export default TopicCard;
