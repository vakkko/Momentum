import { useState } from "react";
import "./commentBlock.css";
import axios from "axios";

export default function CommentBlock({ taskId }) {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleClick = async () => {
    if (!comment.trim()) return;
    try {
      await axios.post(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
        { text: comment },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 9e6c1b92-a397-450d-8338-35b007457477`,
          },
        }
      );
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comment-textarea">
      <textarea
        value={comment}
        onChange={handleChange}
        placeholder="დაწერე კომენტარი"
      />
      <button onClick={handleClick}>დააკომენტარე</button>
    </div>
  );
}
