// action types
const INIT_COMMENTS = "INIT_COMMENTS";
const ADD_COMMENT = "ADD_COMMENT";
const DELETE_COMMENT = "DELETE_COMMENT";

// reducer
export default function(state, action) {
  if (!state) {
    state = { comments: [] };
  }
  switch (action.type) {
    case INIT_COMMENTS:
      // 初始化评论
      return { comments: action.comments };
    case ADD_COMMENT:
      // 新增评论
      return {
        comments: [action.comment, ...state.comments]
      };
    case DELETE_COMMENT:
      // 删除评论
      return {
        comments: state.comments.filter(
          ele =>
            !(
              ele.username === action.comment.username &&
              ele.createdAt === action.comment.createdAt
            )
        )
      };
    default:
      return state;
  }
}

// action creators
export const initComments = comments => {
  return { type: INIT_COMMENTS, comments };
};

export const addComment = comment => {
  return { type: ADD_COMMENT, comment };
};

export const deleteComment = comment => {
  return { type: DELETE_COMMENT, comment };
};
