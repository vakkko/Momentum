import "./rightContainer.css";
import CommentBlock from "./CommentBlock/CommentBlock";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RightContainer({ taskId }) {
  const [allComment, setAllComment] = useState([]);

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
  }, [taskId]);

  return (
    <div className="comments-container">
      <CommentBlock taskId={taskId} />
      <div></div>
    </div>
  );
}
