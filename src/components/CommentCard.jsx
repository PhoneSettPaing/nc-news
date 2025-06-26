import { deleteCommentById, patchCommentById } from "../../api";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { toast } from "sonner";

const CommentCard = React.forwardRef(
  ({ comment, loggedInUser, handleCommentDelete }, ref) => {
    const [voteStatus, setVoteStatus] = useState(null);
    const [votesCount, setVotesCount] = useState(comment.votes);

    useEffect(() => {
      const storedVoteStatus = localStorage.getItem(`${comment.comment_id}`);
      if (storedVoteStatus === "upVote" || storedVoteStatus === "downVote") {
        setVoteStatus(storedVoteStatus);
      }
    }, [loggedInUser]);

    function handleClick() {
      deleteCommentById(comment.comment_id)
        .then(() => {
          handleCommentDelete(comment.comment_id);
          toast.success("Comment deleted!");
        })
        .catch((err) => {
          console.log(err);
          toast.error("Failed to delete comment! Please try again!");
        });
    }

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
        localStorage.setItem(`${comment.comment_id}`, currentVoteStatus);
      }

      const previousVotesCount = votesCount;
      setVotesCount((prevVotes) => prevVotes + voteChange);
      patchCommentById(comment.comment_id, voteChange)
        .then(() => {
          toast.success("Vote submitted!");
        })
        .catch(() => {
          setVoteStatus(previousVoteStatus);
          setVotesCount(previousVotesCount);
          if (previousVoteStatus) {
            localStorage.setItem(`${comment.comment_id}`, previousVoteStatus);
          } else {
            localStorage.removeItem(`${comment.comment_id}`);
          }
          toast.error("Failed to update vote! Please try again!");
        });
    }

    return (
      <div ref={ref} className="comment-card">
        <div className="comment-header">
          <h4>
            {comment.author} ·{" "}
            {dayjs(comment.created_at).format("DD/MM/YYYY HH:mm:ss")}
          </h4>
          {loggedInUser?.username === comment.author ? (
            <div className="comment-delete-btn">
              <button onClick={handleClick}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash2-icon lucide-trash-2"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
              </button>
            </div>
          ) : null}
        </div>

        <div className="comment-content">
          <p>{comment.body}</p>
        </div>

        <div className="comment-footer">
          <div className="vote-container">
            <button
              style={{ height: "24px" }}
              onClick={() => handleVoteClick("upVote")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
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
                width="20"
                height="20"
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
);

export default CommentCard;
