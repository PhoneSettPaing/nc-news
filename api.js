import axios from "axios";

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
