import { Link } from "react-router";
import { useContext, useState } from "react";
import { AccountContext } from "../context/Account";

function Header() {
  const { loggedInUser } = useContext(AccountContext);

  return (
    <>
      <header>
        <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
          <section className="logo-container">
            <figure>
              <img src="../../NC-logo.png" alt="NC Logo" />
            </figure>
            <aside className="logo-text">
              <p>
                <strong>
                  <span className="logo-text-red">N</span>ORTH
                  <span className="logo-text-red">C</span>ORDERS
                </strong>
              </p>
              <p>
                <strong className="logo-text-red">NEWS</strong>
              </p>
            </aside>
          </section>
        </Link>
        <Link to="/profile">
          <button className="login-btn">
            {loggedInUser ? "Log Out" : "Log In"}
          </button>
        </Link>
      </header>

      <nav>
        <ul className="navbar">
          <li>
            <Link to="/">
              <button className="nav-btn">Articles</button>
            </Link>
          </li>
          <li>
            <Link to="/topics">
              <button className="nav-btn">Topics</button>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
