import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentInput from "../components/CommentInput";
import { addComment } from "../reducers/comments";

const CommentInputContainer = props => {
  const username = localStorage.getItem("username");
  const saveUsername = newUsername => {
    localStorage.setItem("username", newUsername);
  };
  const handleSubmit = comment => {
    console.log("submit", comment);
    if (!comment.username || !comment.content) {
      return;
    }
    const { comments } = props;
    console.log("handleSubmit", comment);
    const newComments = [comment, ...comments];
    localStorage.setItem("comments", JSON.stringify(newComments));
    props.onSubmit && props.onSubmit(comment);
  };
  return (
    <CommentInput
      username={username}
      onUsernameBlur={saveUsername}
      onSubmit={handleSubmit}
    />
  );
};

CommentInputContainer.propTypes = {
  comments: PropTypes.array,
  onSubmit: PropTypes.func
};

const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: comment => {
      dispatch(addComment(comment));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentInputContainer);
