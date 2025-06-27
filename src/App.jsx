import Header from "./components/Header";
import ArticlesPage from "./pages/ArticlesPage";
import { Routes, Route, Navigate } from "react-router";
import CommentsPage from "./pages/CommentsPage";
import ProfilePage from "./pages/ProfilePage";
import TopicsPage from "./pages/TopicsPage";
import CustomError from "./components/CustomError";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/articles" />} />
        <Route
          path="/articles"
          element={
            <div className="main-layout">
              <ArticlesPage />
              <TopicsPage />
            </div>
          }
        />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/articles/:article_id"
          element={
            <div className="main-layout">
              <CommentsPage />
              <TopicsPage />
            </div>
          }
        />
        <Route path="/topics" element={<TopicsPage />} />
        <Route
          path="*"
          element={
            <CustomError>
              <h1 className="error-title" style={{ marginTop: "2rem" }}>
                Oops 404 Error! Page Not Found.
              </h1>
            </CustomError>
          }
        />
      </Routes>
    </>
  );
}

export default App;
