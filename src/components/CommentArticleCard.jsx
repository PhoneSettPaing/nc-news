import "../styles/ArticleCard.css";
import { useEffect, useState, useContext } from "react";
import { AccountContext } from "../context/Account";
import dayjs from "dayjs";
import { patchArticleById } from "../../api";

function CommentArticleCard({ article, setArticle }) {
  const [voteStatus, setVoteStatus] = useState(null);
  const [votesCount, setVotesCount] = useState(article.votes);
  const { loggedInUser } = useContext(AccountContext);

  useEffect(() => {
    const storedVoteStatus = localStorage.getItem(`${article.article_id}`);
    if (storedVoteStatus === "upVote" || storedVoteStatus === "downVote") {
      setVoteStatus(storedVoteStatus);
    }
  }, [loggedInUser]);

  function handleVoteClick(currentVoteStatus) {
    if (!loggedInUser) {
      alert("Please Sign in First");
      return;
    }

    //rendered optimistically
    const previousVoteStatus = voteStatus;
    let voteChange = 0;

    //user cancelling the vote by clicking upVote or downVote again
    if (previousVoteStatus === currentVoteStatus) {
      //previously clicked upVote and click agian votes should reduce by -1
      //previously clicked downVote and click again votes should increase by 1
      voteChange = currentVoteStatus === "upVote" ? -1 : 1;

      //change voteStauts
      setVoteStatus(null);
    } else {
      //user make new vote or changing vote

      //previously clicked upVote now clicking downVote
      if (previousVoteStatus === "upVote") {
        //voteChange should reduce by -1 to undo previous voteChange
        voteChange -= 1;
      }

      //previously clicked downVote now clicking upVote
      if (previousVoteStatus === "downVote") {
        //voteChange should increase by 1 to undo previous voteChange
        voteChange += 1;
      }

      //voting for first time or adding to voteChange after undoing
      voteChange += currentVoteStatus === "upVote" ? 1 : -1;

      //change voteStauts
      setVoteStatus(currentVoteStatus);
      localStorage.setItem(`${article.article_id}`, currentVoteStatus);
    }

    const previousVotesCount = votesCount;
    setVotesCount((prevVotes) => prevVotes + voteChange);
    patchArticleById(article.article_id, voteChange)
      .then((res) => {})
      .catch(() => {
        setVoteStatus(previousVoteStatus);
        setVotesCount(previousVotesCount);
        if (previousVoteStatus) {
          localStorage.setItem(`${article.article_id}`, previousVoteStatus);
        } else {
          localStorage.removeItem(`${article.article_id}`);
        }
        alert("Failed to update vote. Please try again.");
      });
  }

  return (
    <div className="article-card">
      <h1>{article.title}</h1>
      <p>
        {article.author} · {article.topic} ·{" "}
        {dayjs(article.created_at).format("DD/MM/YYYY HH:mm:ss")}
      </p>

      <div className="article-content">
        <p>{article.body}</p>
        <img src={article.article_img_url} alt="Article's Image" />
      </div>

      <div className="article-footer">
        <div className="vote-box">
          <button
            onClick={() => handleVoteClick("upVote")}
            style={{ color: voteStatus === "upVote" ? "green" : "black" }}
          >
            &#8679;
          </button>
          <p>{votesCount}</p>
          <button
            onClick={() => handleVoteClick("downVote")}
            style={{ color: voteStatus === "downVote" ? "red" : "black" }}
          >
            &#8681;
          </button>
        </div>

        <div className="comment-box">
          <button>comments</button>
        </div>
      </div>
    </div>
  );
}

export default CommentArticleCard;
