import React from "react";
import Comment from "./Comment";

const CommentList = ({ comments, onDeleteComment }) => {
  const handleDelete = comment => {
    onDeleteComment && onDeleteComment(comment);
  };
  return (
    <div>
      {comments.map((comment, i) => {
        return (
          <Comment
            onDelete={handleDelete}
            comment={comment}
            key={comment.createdAt}
          />
        );
      })}
    </div>
  );
};

export default CommentList;
