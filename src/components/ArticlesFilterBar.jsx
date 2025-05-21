import "../styles/FilterBar.css";

function ArticlesFilterBar() {
  return (
    <div className="filter-bar">
      <div className="filter-content">
        <label>Topic: </label>
        <select>
          <option>Get Topic</option>
        </select>
      </div>

      <div className="filter-content">
        <label>Sort By: </label>
        <select>
          <option value="created_at">Date</option>
          <option value="title">Title</option>
          <option value="topic">Topic</option>
          <option value="author">Author</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comment Count</option>
        </select>
      </div>

      <div className="filter-content">
        <label>Order: </label>
        <select>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      <div className="filter-content">
        <label>Limit: </label>
        <select>
          <option>10</option>
        </select>
      </div>

      <div className="filter-content">
        <label>Page: </label>
        <select>
          <option>1</option>
        </select>
      </div>
    </div>
  );
}

export default ArticlesFilterBar;
