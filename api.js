import axios from "axios";
import { data } from "react-router";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-qonp.onrender.com/api",
});

export const getArticles = (filterParams) => {
  return ncNewsApi
    .get("/articles", { params: { filterParams } })
    .then(({ data }) => {
      return data.articles;
    });
};

export const getArticleById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const getUserByUsername = (username) => {
  return ncNewsApi.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

export const patchArticleById = (article_id, votes) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, { inc_votes: votes })
    .then(({ data }) => {
      return data.article;
    });
};

export const postCommentByArticleId = (article_id, username, comment) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, {
      username: username,
      body: comment,
    })
    .then(({ data }) => {
      return data.comment;
    });
};
