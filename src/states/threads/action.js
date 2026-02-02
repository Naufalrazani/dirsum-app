import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  CREATE_THREAD: 'CREATE_THREAD',
  TOGGLE_UPVOTE_THREAD: 'TOGGLE_UPVOTE_THREAD',
  TOGGLE_DOWNVOTE_THREAD: 'TOGGLE_DOWNVOTE_THREAD',
  TOGGLE_NEUTRALIZE_THREAD_VOTE: 'TOGGLE_NEUTRALIZE_THREAD_VOTE'
};

function receiveThreadsActionCreator (threads) {
  return { type: ActionType.RECEIVE_THREADS, payload: { threads } };
}

function createThreadActionCreator (thread) {
  return { type: ActionType.CREATE_THREAD, payload: { thread } };
}

function toggleUpvoteThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UPVOTE_THREAD,
    payload: { threadId, userId }
  };
}

function toggleDownvoteThreadActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWNVOTE_THREAD,
    payload: { threadId, userId }
  };
}

function toggleNeutralizeThreadVoteActionCreator ({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRALIZE_THREAD_VOTE,
    payload: { threadId, userId }
  };
}

function asyncCreateThread ({ title, body, category }) {
  return async (dispatch) => {
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpvoteThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(
      toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id })
    );

    try {
      await api.toggleUpvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleUpvoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
}

function asyncToggleDownvoteThread (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(
      toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id })
    );

    try {
      await api.toggleDownvoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleDownvoteThreadActionCreator({ threadId, userId: authUser.id })
      );
    }
  };
}

function asyncToggleNeutralizeThreadVote (threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(
      toggleNeutralizeThreadVoteActionCreator({
        threadId,
        userId: authUser.id
      })
    );

    try {
      await api.toggleNeutralizeThreadVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralizeThreadVoteActionCreator({
          threadId,
          userId: authUser.id
        })
      );
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  asyncCreateThread,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncToggleNeutralizeThreadVote
};
