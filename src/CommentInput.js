import React, { useState, useRef, useEffect } from "react";
import useStorage from "./useStorage";
import PropTypes from "prop-types";

const CommentInput = ({ handleSubmit }) => {
  const textRef = useRef(null);
  const [username, setUsername] = useStorage("username");
  const [content, setContent] = useState("");
  useEffect(() => {
    textRef.current.focus();
  }, []);
  const onUsernameChange = e => {
    setUsername(e.target.value);
  };
  const onContentChange = e => {
    setContent(e.target.value);
  };
  const onSubmit = e => {
    if (handleSubmit) {
      setContent("");
      const newComment = {
        username,
        content,
        createdAt: +new Date()
      };
      handleSubmit(newComment);
    }
  };
  return (
    <div className="comment-input">
      <div className="comment-field">
        <span className="comment-field-name">用户名：</span>
        <div className="comment-field-input">
          <input name="username" value={username} onChange={onUsernameChange} />
        </div>
      </div>
      <div className="comment-field">
        <span className="comment-field-name">评论内容：</span>
        <div className="comment-field-input">
          <textarea
            ref={textRef}
            name="content"
            value={content}
            onChange={onContentChange}
          />
        </div>
      </div>
      <div className="comment-field-button">
        <button onClick={onSubmit}>发布</button>
      </div>
    </div>
  );
};

CommentInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default CommentInput;
