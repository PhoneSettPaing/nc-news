import { useState } from "react";
import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import { Routes, Route } from "react-router";
import CommentList from "./components/CommentList";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/:article_id/comments" element={<CommentList />} />
      </Routes>
    </>
  );
}

export default App;
