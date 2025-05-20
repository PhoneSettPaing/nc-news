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
