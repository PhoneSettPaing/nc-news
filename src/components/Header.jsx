function Header() {
  return (
    <>
      <header>
        <p><b>Northcoders News</b></p>
        <button>Sign In</button>
      </header>

      <nav>
        <ul className="navBar">
          <li>
            <a>Home</a>
          </li>
          <li>
            <a>Profile</a>
          </li>
          <li>
            <a>Topics</a>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
