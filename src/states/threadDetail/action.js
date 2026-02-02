import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UPVOTE_THREAD_DETAIL: 'TOGGLE_UPVOTE_THREAD_DETAIL',
  TOGGLE_DOWNVOTE_THREAD_DETAIL: 'TOGGLE_DOWNVOTE_THREAD_DETAIL',
  TOGGLE_NEUTRALIZE_THREAD_DETAIL_VOTE: 'TOGGLE_NEUTRALIZE_THREAD_DETAIL_VOTE',
  TOGGLE_UPVOTE_COMMENT: 'TOGGLE_UPVOTE_COMMENT',
  TOGGLE_DOWNVOTE_COMMENT: 'TOGGLE_DOWNVOTE_COMMENT',
  TOGGLE_NEUTRALIZE_COMMENT_VOTE: 'TOGGLE_NEUTRALIZE_COMMENT_VOTE'
};

function receiveThreadDetailActionCreator (threadDetail) {
  return { type: ActionType.RECEIVE_THREAD_DETAIL, payload: { threadDetail } };
}

function clearThreadDetailActionCreator () {
  return { type: ActionType.CLEAR_THREAD_DETAIL };
}

function addCommentActionCreator (comment) {
  return { type: ActionType.ADD_COMMENT, payload: { comment } };
}

const toggleUpvoteDetailActionCreator = (userId) => ({
  type: ActionType.TOGGLE_UPVOTE_THREAD_DETAIL,
  payload: { userId }
});
const toggleDownvoteDetailActionCreator = (userId) => ({
  type: ActionType.TOGGLE_DOWNVOTE_THREAD_DETAIL,
  payload: { userId }
});
const toggleNeutralizeDetailActionCreator = (userId) => ({
  type: ActionType.TOGGLE_NEUTRALIZE_THREAD_DETAIL_VOTE,
  payload: { userId }
});

const toggleUpvoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.TOGGLE_UPVOTE_COMMENT,
  payload: { commentId, userId }
});
const toggleDownvoteCommentActionCreator = (commentId, userId) => ({
  type: ActionType.TOGGLE_DOWNVOTE_COMMENT,
  payload: { commentId, userId }
});
const toggleNeutralizeCommentActionCreator = (commentId, userId) => ({
  type: ActionType.TOGGLE_NEUTRALIZE_COMMENT_VOTE,
  payload: { commentId, userId }
});

function asyncReceiveThreadDetail (threadId) {
  return async (dispatch) => {
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddComment ({ threadId, content }) {
  return async (dispatch) => {
    try {
      const comment = await api.createComment({ threadId, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpvoteThreadDetail () {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpvoteDetailActionCreator(authUser.id));
    try {
      await api.toggleUpvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteDetailActionCreator(authUser.id));
    }
  };
}

function asyncToggleDownvoteThreadDetail () {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownvoteDetailActionCreator(authUser.id));
    try {
      await api.toggleDownvoteThread(threadDetail.id);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownvoteDetailActionCreator(authUser.id));
    }
  };
}

function asyncToggleNeutralizeThreadDetailVote () {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeDetailActionCreator(authUser.id));
    try {
      await api.toggleNeutralizeThreadVote(threadDetail.id);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpvoteComment (commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpvoteCommentActionCreator(commentId, authUser.id));
    try {
      await api.toggleUpvoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpvoteCommentActionCreator(commentId, authUser.id));
    }
  };
}

function asyncToggleDownvoteComment (commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownvoteCommentActionCreator(commentId, authUser.id));
    try {
      await api.toggleDownvoteComment({ threadId: threadDetail.id, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownvoteCommentActionCreator(commentId, authUser.id));
    }
  };
}

function asyncToggleNeutralizeCommentVote (commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeCommentActionCreator(commentId, authUser.id));
    try {
      await api.toggleNeutralizeCommentVote({
        threadId: threadDetail.id,
        commentId
      });
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  asyncAddComment,
  asyncReceiveThreadDetail,
  clearThreadDetailActionCreator,
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
  asyncToggleNeutralizeThreadDetailVote,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
  asyncToggleNeutralizeCommentVote
};
