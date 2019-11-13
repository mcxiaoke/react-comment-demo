import React, { useState, useEffect } from "react";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const CommentApp = () => {
  const [comments, setComments] = useState([]);
  const loadComments = () => {
    const json = localStorage.getItem("comments");
    json && setComments(JSON.parse(json));
  };
  const saveComments = newComments => {
    localStorage.setItem("comments", JSON.stringify(newComments));
  };
  useEffect(() => {
    loadComments();
  }, []);
  const handleSubmit = comment => {
    if (!comment.username || !comment.content) {
      return;
    }
    console.log("handleSubmit", comment);
    const newComments = [comment, ...comments];
    setComments(newComments);
    saveComments(newComments);
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
    saveComments(newComments);
  };
  return (
    <div className="wrapper">
      <CommentInput handleSubmit={handleSubmit} />
      <CommentList comments={comments} onDeleteComment={handleDeleteComment} />
    </div>
  );
};

export default CommentApp;
