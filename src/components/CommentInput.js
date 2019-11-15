import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const CommentInput = props => {
  const textRef = useRef(null);
  const [username, setUsername] = useState(props.username);
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
    if (props.onSubmit) {
      setContent("");
      const newComment = {
        username,
        content,
        createdAt: +new Date()
      };
      props.onSubmit(newComment);
    }
  };
  const onUsernameBlur = e => {
    props.onUsernameBlur && props.onUsernameBlur(username);
  };
  const onKeyPress = e => {
    console.log("onKeyPress", e.key, e.metaKey);
    if (e.keyCode === 13 && e.metaKey) {
      // cmd+enter submit
      onSubmit(e);
    }
  };
  return (
    <div className="comment-input">
      <div className="comment-field">
        <span className="comment-field-name">用户名：</span>
        <div className="comment-field-input">
          <input
            name="username"
            value={username}
            onBlur={onUsernameBlur}
            onChange={onUsernameChange}
          />
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
            onKeyDown={onKeyPress}
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
  username: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onUsernameBlur: PropTypes.func.isRequired
};

export default CommentInput;
