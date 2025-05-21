import { Link } from "react-router";

function Header() {
  return (
    <>
      <header>
        <p>
          <b>Northcoders News</b>
        </p>
        <Link to="/profile">
          <button>Sign In</button>
        </Link>
      </header>

      <nav>
        <ul className="navBar">
          <li>
            <Link to="/">
              <button>Home</button>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <button>Profile</button>
            </Link>
          </li>
          <li>
            <Link to="/topics">
              <button>Topics</button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
