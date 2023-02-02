import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentList from "../components/CommentList";
import AddCommentForm from "../components/AddCommentForm";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  const params = useParams();
  const articleId = params.articleId;

  // put most of logic when loading data from server
  // the useEffect is called
  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      console.log("value in use Effect for comments is below ");
      console.log(newArticleInfo);
      setArticleInfo(newArticleInfo);
    };
    loadArticleInfo();
  }, []);

  const article = articles.find((article) => article.name === articleId);

  // function that makes a request to upvote
  const addUpvote = async () => {
    const response = await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };
  if (!article) {
    return <NotFoundPage />;
  }
  return (
    <div>
      <h1> {article.title}</h1>
      <div className={"upvotes-section"}>
        <button onClick={addUpvote}>Upvote</button>
        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>

      {article.content.map((paragraph, index) => (
        <p key={index}> {paragraph}</p>
      ))}
      <AddCommentForm
        articleName={articleInfo.name}
        onArticleUpdated={setArticleInfo}
      />
      <CommentList comments={articleInfo.comments} />
    </div>
  );
};

export default ArticlePage;
