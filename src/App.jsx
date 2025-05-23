import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import { Routes, Route } from "react-router";
import CommentList from "./components/CommentList";
import SignInOrOut from "./components/SignIn";
import TopicList from "./components/TopicList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/profile" element={<SignInOrOut />} />
        <Route path="/articles/:article_id" element={<CommentList />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/articles?" element={<ArticleList />} />
      </Routes>
    </>
  );
}

export default App;
