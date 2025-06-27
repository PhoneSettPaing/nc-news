import { useState, useEffect } from "react";

function ArticlesFilterBar({
  filter,
  setFilter,
  totalArticlesResult,
  setSearchParams,
}) {
  const [pages, setPages] = useState(Math.ceil(totalArticlesResult / 10));
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prevDisabled, setPrevDisabled] = useState(false);

  useEffect(() => {
    const pageLimit = Math.ceil(totalArticlesResult / filter.limit);
    setPages(pageLimit);
    setNextDisabled(false);
    setPrevDisabled(false);

    if (filter.p > pageLimit) {
      setFilter((prevFilter) => ({
        ...prevFilter,
        p: 1, //reset to page 1 if filter.p is over pageLimit when changing topics
      }));
    }

    if (filter.p >= pageLimit) {
      setNextDisabled(true);
    }
    if (filter.p <= 1) {
      setPrevDisabled(true);
    }
  }, [filter]);

  function handleChange(e) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [e.target.id]: e.target.value,
      p: 1, // reset to first page on sort/order/limit change
    }));
    setSearchParams(filter);
  }

  function handleNext() {
    setFilter((prevFilter) => ({
      ...prevFilter,
      p: prevFilter.p + 1,
    }));
  }

  function handlePrevious() {
    setFilter((prevFilter) => ({
      ...prevFilter,
      p: prevFilter.p - 1,
    }));
  }

  return (
    <search className="filter-bar">
      <div className="filter-content">
        <select
          id="sort_by"
          className="article-select"
          value={filter.sort_by}
          onChange={handleChange}
        >
          <button>
            <selectedcontent></selectedcontent>
            <span className="arrow"></span>
          </button>
          <option value="created_at">Date</option>
          <option value="title">Title</option>
          <option value="topic">Topic</option>
          <option value="author">Author</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comments</option>
        </select>

        <select
          id="order"
          className="article-select"
          value={filter.order}
          onChange={handleChange}
        >
          <button>
            <selectedcontent></selectedcontent>
            <span className="arrow"></span>
          </button>
          <option value="desc">DESC</option>
          <option value="asc">ASC</option>
        </select>

        <select
          id="limit"
          className="article-select"
          value={filter.limit}
          onChange={handleChange}
        >
          <button>
            <selectedcontent></selectedcontent>
            <span className="arrow"></span>
          </button>
          <option value={5}>Limit: 5</option>
          <option value={10}>Limit: 10</option>
          <option value={20}>Limit: 20</option>
          <option value={50}>Limit: 50</option>
        </select>
      </div>

      <div className="article-pagination">
        <button disabled={prevDisabled} onClick={handlePrevious}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="46"
            height="46"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <p>{`${filter.p} of ${pages}`}</p>
        <button disabled={nextDisabled} onClick={handleNext}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="46"
            height="46"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </search>
  );
}

export default ArticlesFilterBar;
