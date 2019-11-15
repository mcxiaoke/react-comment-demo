import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CommentList from "../components/CommentList";
import { initComments, deleteComment } from "../reducers/comments";

const CommentListContainer = props => {
  useEffect(() => {
    let comments = localStorage.getItem("comments");
    comments = comments ? JSON.parse(comments) : [];
    props.initComments(comments);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleDeleteComment = comment => {
    const { comments } = props;
    console.log("handleDeleteComment", comment);
    const newComments = comments.filter(
      ele =>
        !(
          ele.username === comment.username &&
          ele.createdAt === comment.createdAt
        )
    );
    localStorage.setItem("comments", JSON.stringify(newComments));
    props.onDeleteComment && props.onDeleteComment(comment);
  };
  return (
    <CommentList
      comments={props.comments}
      onDeleteComment={handleDeleteComment}
    />
  );
};

CommentListContainer.propTypes = {
  comments: PropTypes.array,
  initComments: PropTypes.func,
  onDeleteComment: PropTypes.func
};

// 评论列表从 state.comments 中获取
const mapStateToProps = state => {
  return {
    comments: state.comments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // 提供给 CommentListContainer
    // 当从 LocalStorage 加载评论列表以后就会通过这个方法
    // 把评论列表初始化到 state 当中
    initComments: comments => {
      dispatch(initComments(comments));
    },
    // 删除评论
    onDeleteComment: comment => {
      dispatch(deleteComment(comment));
    }
  };
};

// 将 CommentListContainer connect 到 store
// 会把 comments、initComments、onDeleteComment 传给 CommentListContainer
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentListContainer);
