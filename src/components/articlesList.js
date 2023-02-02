import { Link } from "react-router-dom";
const ArticleList = ({ articles }) => {
  return (
    <>
      {articles.map((article) => {
        return (
          <Link
            key={article.name}
            to={`/articles/${article.name}`}
            className="article-list-item"
          >
            <h3> {article.name} </h3>
            <h3> {articles.title} </h3>
            <p> {article.content[0].substring(0, 150)}...</p>
          </Link>
        );
      })}
    </>
  );
};

export default ArticleList;
