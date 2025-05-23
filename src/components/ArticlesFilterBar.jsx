import { useState, useEffect } from "react";
import "../styles/FilterBar.css";

function ArticlesFilterBar({ filter, setFilter, totalArticlesResult }) {
  const [pages, setPages] = useState(Math.ceil(totalArticlesResult / 10));

  useEffect(() => {
    setPages(Math.ceil(totalArticlesResult / filter.limit));
  }, [filter]);

  function handleChange(e) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <div className="filter-bar">
      <div className="filter-content">
        <label>Sort By: </label>
        <select id="sort_by" value={filter.sort_by} onChange={handleChange}>
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
        <select id="order" value={filter.order} onChange={handleChange}>
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>

      <div className="filter-content">
        <label>Limit: </label>
        <select id="limit" value={filter.limit} onChange={handleChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      <div className="filter-content">
        <label>Page: </label>
        <select id="p" value={filter.p} onChange={handleChange}>
          {Array.from({ length: pages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default ArticlesFilterBar;
