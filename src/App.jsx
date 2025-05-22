import { useState } from "react";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import { Routes, Route } from "react-router";
import CommentList from "./components/CommentList";
import SignInOrOut from "./components/SignIn";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/profile" element={<SignInOrOut />} />
        <Route path="/articles/:article_id" element={<CommentList />} />
      </Routes>
    </>
  );
}

export default App;
