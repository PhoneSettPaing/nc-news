import { AccountContext } from "../context/Account";
import { useContext, useState } from "react";
import { getUserByUsername } from "../../api";
import CustomLoading from "../components/CustomLoading";

function ProfilePage() {
  const { loggedInUser, setLoggedInUser } = useContext(AccountContext);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleChange(e) {
    setUserInput(e.target.value);
    setError(null);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!userInput.trim()) {
      setError("No Input");
      return;
    }

    setError(null);
    setIsLoading(true);
    getUserByUsername(userInput)
      .then((res) => {
        setLoggedInUser(res);
        setUserInput("");
        setError(null);
      })
      .catch(() => {
        setError("No User");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSignOut() {
    setLoggedInUser(null);
  }

  if (isLoading) return <CustomLoading>Loading Profile...</CustomLoading>;

  return (
    <main className="signin-container">
      {loggedInUser ? (
        <div className="profile-container">
          <img src={loggedInUser.avatar_url} alt="profile image" />
          <div className="profile-info">
            <p>
              <strong>Username:</strong> {loggedInUser.username}
            </p>
            <p>
              <strong>Full Name:</strong> {loggedInUser.name}
            </p>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      ) : (
        <form className="signin-form" onSubmit={handleSubmit}>
          <h2>Sing In</h2>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" onChange={handleChange} />
          <button>Sing In</button>
          {error === "No User" ? <p>Username Not Found!</p> : null}
          {error === "No Input" ? (
            <p>Please fill in the required field!</p>
          ) : null}
        </form>
      )}
    </main>
  );
}

export default ProfilePage;
