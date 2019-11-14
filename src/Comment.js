import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const formatTime = createdAt => {
  const duration = (+Date.now() - (createdAt || 1573652000000)) / 1000;
  return duration > 60
    ? `${Math.round(duration / 60)} 分钟前`
    : `${Math.round(Math.max(duration, 1))} 秒前`;
};

const processedContent = content => {
  return content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/`([\S\s]+?)`/g, "<pre><code>$1</code></pre>");
};

const Comment = ({ comment, onDelete }) => {
  const createdAt = comment.createdAt;
  const now = +Date.now();
  const [timeString, setTimeString] = useState(formatTime(createdAt));
  useEffect(() => {
    const updateTime = () => {
      setTimeString(formatTime(createdAt));
    };
    const sid = setInterval(() => {
      updateTime();
    }, 5000);
    return () => {
      clearInterval(sid);
    };
  }, [now, createdAt]);
  const handleDelete = () => {
    onDelete && onDelete(comment);
  };
  return (
    <div className="comment">
      <div className="comment-user">
        <span className="comment-username">{comment.username} </span>：
      </div>
      <p
        dangerouslySetInnerHTML={{
          __html: processedContent(comment.content)
        }}
      />
      <span className="comment-createdtime">{timeString}</span>
      <span onClick={handleDelete} className="comment-delete">
        删除
      </span>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onDelete: PropTypes.func
};

export default Comment;
