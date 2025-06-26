import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { patchArticleById } from "../../api";
import { toast } from "sonner";

function SelectedArticleCard({ article, loggedInUser }) {
  const [voteStatus, setVoteStatus] = useState(null);
  const [votesCount, setVotesCount] = useState(article.votes);

  useEffect(() => {
    const storedVoteStatus = localStorage.getItem(`${article.article_id}`);
    if (storedVoteStatus === "upVote" || storedVoteStatus === "downVote") {
      setVoteStatus(storedVoteStatus);
    }
  }, [loggedInUser]);

  function handleVoteClick(currentVoteStatus) {
    if (!loggedInUser) {
      toast.error("Please Sign in First!");
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
      .then(() => {
        toast.success("Vote submitted!")
      })
      .catch(() => {
        setVoteStatus(previousVoteStatus);
        setVotesCount(previousVotesCount);
        if (previousVoteStatus) {
          localStorage.setItem(`${article.article_id}`, previousVoteStatus);
        } else {
          localStorage.removeItem(`${article.article_id}`);
        }
        toast.error("Failed to update vote! Please try again!");
      });
  }

  return (
    <div className="article-card">
      <h1>{article.title}</h1>
      <p>
        {article.author} · {article.topic} ·{" "}
        {dayjs(article.created_at).format("DD/MM/YYYY HH:mm:ss")}
      </p>
      <figure className="article-image">
        <img src={article.article_img_url} alt="Article's Image" />
      </figure>
      <p style={{ color: "black" }}>{article.body}</p>

      <div className="article-footer">
        <div className="vote-container">
          <button
            style={{ height: "24px" }}
            onClick={() => handleVoteClick("upVote")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="lucide lucide-thumbs-up-icon lucide-thumbs-up"
            >
              {/* Fill layer */}
              <path
                d="M7 10v12"
                fill={voteStatus === "upVote" ? "#e60023" : "none"}
                stroke="none"
              />
              <path
                d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
                fill={voteStatus === "upVote" ? "#e60023" : "none"}
                stroke="none"
              />

              {/* Stroke layer */}
              <path
                className="thumbs-up"
                d="M7 10v12"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="thumbs-up"
                d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p>{votesCount}</p>
          <button
            style={{ height: "24px" }}
            onClick={() => handleVoteClick("downVote")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="lucide lucide-thumbs-down-icon lucide-thumbs-down"
            >
              {/* Fill paths */}
              <path
                d="M7 14V2"
                fill={voteStatus === "downVote" ? "#0c00e6" : "none"}
                stroke="none"
              />
              <path
                d="M15 18.12 14 14h5.83a2 2 0 0 0 1.92-2.56l-2.33-8A2 2 0 0 0 17.5 2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.76a2 2 0 0 1 1.79 1.11L12 22a3.13 3.13 0 0 0 3-3.88Z"
                fill={voteStatus === "downVote" ? "#0c00e6" : "none"}
                stroke="none"
              />

              {/* Stroke paths */}
              <path
                className="thumbs-down"
                d="M7 14V2"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                className="thumbs-down"
                d="M15 18.12 14 14h5.83a2 2 0 0 0 1.92-2.56l-2.33-8A2 2 0 0 0 17.5 2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.76a2 2 0 0 1 1.79 1.11L12 22a3.13 3.13 0 0 0 3-3.88Z"
                fill="none"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectedArticleCard;
