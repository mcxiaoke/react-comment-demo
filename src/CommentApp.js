import React from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";
import useStorage from "./useStorage";

const CommentApp = () => {
  const [comments, setComments] = useStorage("comments", []);
  const handleSubmit = comment => {
    if (!comment.username || !comment.content) {
      return;
    }
    console.log("handleSubmit", comment);
    const newComments = [comment, ...comments];
    setComments(newComments);
  };
  const handleDeleteComment = comment => {
    console.log("handleDeleteComment", comment);
    const newComments = comments.filter(
      ele =>
        !(
          ele.username === comment.username &&
          ele.createdAt === comment.createdAt
        )
    );
    setComments(newComments);
  };
  return (
    <div className="wrapper">
      <CommentInput handleSubmit={handleSubmit} />
      <CommentList comments={comments} onDeleteComment={handleDeleteComment} />
    </div>
  );
};

export default CommentApp;
