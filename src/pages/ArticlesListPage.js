import articles from "./article-content";
import { Link } from "react-router-dom";
import ArticleList from "../components/articlesList";
const ArticleListPage = () => {
  return (
    <div>
      <h1> Articles </h1>
      <ArticleList articles={articles} />
    </div>
  );
};

export default ArticleListPage;
