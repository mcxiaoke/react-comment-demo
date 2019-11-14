import React from "react";
import Comment from "./Comment";
import PropTypes from "prop-types";

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

CommentList.propTypes = {
  comments: PropTypes.array,
  onDeleteComment: PropTypes.func
};

export default CommentList;
