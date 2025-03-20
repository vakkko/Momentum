import "./rightContainer.css";
import CommentBlock from "./CommentBlock/CommentBlock";
import { useEffect, useState } from "react";
import axios from "axios";
import Comment from "./Comment/Comment";

export default function RightContainer({ taskId }) {
  const [allComment, setAllComment] = useState([]);
  const [render, setRender] = useState();
  const [showReply, setShowReply] = useState({});

  useEffect(() => {
    const fetchComponent = async () => {
      const token = "9e6c1b92-a397-450d-8338-35b007457477";
      try {
        const response = await axios.get(
          `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setAllComment(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchComponent();
  }, [taskId, render]);

  const toggleReplyVisibility = (commentId) => {
    setShowReply((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const subCommentAmount = allComment.reduce((total, comment) => {
    return total + comment.sub_comments.length;
  }, 0);

  return (
    <div className="comments-container">
      <CommentBlock parentId={false} setRender={setRender} taskId={taskId} />
      {allComment && (
        <div className="comments-list">
          <div className="comment-heading">
            <h2>კომენტარები</h2>
            <div>{allComment.length + subCommentAmount}</div>
          </div>
          <Comment
            taskId={taskId}
            setRender={setRender}
            allComment={allComment}
            reply
            showReply={showReply}
            toggleReplyVisibility={toggleReplyVisibility}
          />
        </div>
      )}
    </div>
  );
}
