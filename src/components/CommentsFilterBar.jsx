// import "../styles/FilterBar.css"

function CommentsFilterBar() {
  return (
    <div className="filter-bar">
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

export default CommentsFilterBar;
