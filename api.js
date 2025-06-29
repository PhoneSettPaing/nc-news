import axios from "axios";

const ncNewsApi = axios.create({
  baseURL: "https://nc-news-qonp.onrender.com/api",
});

export const getArticles = (queryParams) => {
  return ncNewsApi
    .get("/articles", { params: queryParams })
    .then(({ data: { articles, total_count } }) => {
      return { articles: articles, total_count: total_count };
    });
};

export const getArticleById = (article_id) => {
  return ncNewsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentsByArticleId = (article_id, pageNumber) => {
  return ncNewsApi
    .get(`/articles/${article_id}/comments`, { params: pageNumber })
    .then(({ data }) => {
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

export const deleteCommentById = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`);
};

export const getTopics = () => {
  return ncNewsApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const patchCommentById = (comment_id, votes) => {
  return ncNewsApi
    .patch(`/comments/${comment_id}`, { inc_votes: votes })
    .then(({ data }) => {
      return data.comment;
    });
};
