import { Link } from "react-router";
import { useContext } from "react";
import { AccountContext } from "../context/Account";

function Header() {
  const { loggedInUser } = useContext(AccountContext);

  return (
    <>
      <header>
        <p>
          <b>Northcoders News</b>
        </p>
        <Link to="/profile">
          <button>{loggedInUser ? "Sign Out" : "Sign In"}</button>
        </Link>
      </header>

      <nav>
        <ul className="navBar">
          <li>
            <Link to="/">
              <button>Articles</button>
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
