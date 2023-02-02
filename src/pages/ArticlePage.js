import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import articles from "./article-content";
import NotFoundPage from "./NotFoundPage";
import CommentList from "../components/CommentList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "./hooks/useUser";

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({
    upvotes: 0,
    comments: [],
    canUpvote: true,
  });
  const canUpvote = articleInfo.canUpvote;
  console.log(articleInfo);
  const params = useParams();
  const articleId = params.articleId;
  const { user, isLoading } = useUser();
  const navigate = useNavigate();

  // put most of logic when loading data from server
  // the useEffect is called
  useEffect(() => {
    const loadArticleInfo = async () => {
      const token = user && (await user.getIdToken());
      const headers = token ? { authtoken: token } : {};
      const response = await axios.get(`/api/articles/${articleId}`, {
        headers,
      });
      const newArticleInfo = response.data;
      console.log("value in use Effect for comments is below ");
      console.log(newArticleInfo);
      setArticleInfo(newArticleInfo);
      console.log("setting article innfo from useEffect");
    };

    if (isLoading) {
      loadArticleInfo();
    }
  }, [isLoading, user, articleInfo, articleId]);

  const article = articles.find((article) => article.name === articleId);

  // function that makes a request to upvote
  const addUpvote = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.put(
      `/api/articles/${articleId}/upvote`,
      null,
      { headers }
    );
    const updatedArticle = response.data;
    setArticleInfo(updatedArticle);
  };
  if (!article) {
    return <NotFoundPage />;
  }
  console.log("can user upvote" + canUpvote);
  return (
    <div>
      <h1> {article.title}</h1>
      <div className={"upvotes-section"}>
        {user ? (
          <button onClick={addUpvote}>
            {canUpvote ? "Upvote Article" : "Already upVoted"}
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/login");
            }}
          >
            {" "}
            Login to UpVote Article
          </button>
        )}

        <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>

      {article.content.map((paragraph, index) => (
        <p key={index}> {paragraph}</p>
      ))}
      {user ? (
        <AddCommentForm
          articleName={articleInfo.name}
          onArticleUpdated={setArticleInfo}
        />
      ) : (
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login to Add a Comment
        </button>
      )}

      <CommentList comments={articleInfo.comments} />
    </div>
  );
};

export default ArticlePage;
