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
    canUpvote: false,
  });
  //let canUpvote = articleInfo.canUpvote;

  console.log(articleInfo);
  const params = useParams();
  const articleId = params.articleId;
  let { user, isLoading } = useUser();
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
      const upvoteIds = newArticleInfo.upvoteIds;
      setArticleInfo(newArticleInfo);
      setArticleInfo({ ...articleInfo, canUpvote: true });

      for (let i = 0; i < upvoteIds.length; i++) {
        if (user && upvoteIds[i] === user.uid) {
          console.log("the upvoted value found a match");
          console.log("user.uid id match is " + user.uid);
          console.log("upvoteIds[i] match is " + upvoteIds[i]);

          setArticleInfo({ ...articleInfo, canUpvote: false });
        }
      }
      // console.log("can the suer upvoer" + canUpvote);
    };

    if (isLoading) {
      console.log("value of isLoading is true so now user should have a value");
      loadArticleInfo();
    }
  }, [isLoading, user, articleId, articleInfo]);

  const article = articles.find((article) => article.name === articleId);
  console.log("add li e59");
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
  console.log("above the call for article innro cannUpVote");
  console.log(
    "cq------------------------------an user upvote" + articleInfo.canUpvote
  );
  return (
    <div>
      <h1> {article.title}</h1>
      <div className={"upvotes-section"}>
        {user ? (
          <button onClick={addUpvote}>
            {articleInfo.canUpvote && articleInfo.canUpvote
              ? "Upvote Article"
              : "Already voted"}
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

        {articleInfo.upvoteIds && (
          <p>This article has {articleInfo.upvoteIds.length} upvote(s)</p>
        )}
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
