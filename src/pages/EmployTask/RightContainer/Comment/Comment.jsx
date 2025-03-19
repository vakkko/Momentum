import "./comment.css";
import CommentBlock from "../CommentBlock/CommentBlock";

export default function Comment({
  allComment,
  reply,
  setRender,
  taskId,
  showReply,
  setShowReply,
}) {
  return (
    <div className="all-comment">
      {allComment.map((comment) => (
        <div key={comment.id}>
          <div className="comment">
            <img src={comment.author_avatar} alt={comment.author_nickname} />
            <div className="comment-content">
              <span>{comment.author_nickname}</span>
              <p>{comment.text}</p>
              {reply && (
                <button onClick={() => setShowReply(!showReply)}>
                  <img src="./assets/left-reply.svg" alt="reply icon" />
                  უპასუხე
                </button>
              )}
            </div>
          </div>
          {showReply && (
            <CommentBlock
              parentId={comment.id}
              setRender={setRender}
              taskId={taskId}
            />
          )}
          {comment.sub_comments && comment.sub_comments.length > 0 && (
            <div className="nested-comment">
              <Comment
                allComment={comment.sub_comments}
                reply={false}
                taskId={taskId}
                setRender={setRender}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
