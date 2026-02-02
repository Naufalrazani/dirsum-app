/**
 * skenario pengujian threadsReducer
 *
 * - threadsReducers function
 * - should return the initial state when given by unknown action
 * - should return the threads when given by RECEIVE_THREADS action
 * - should return the threads with the new thread when given by CREATE_THREAD action
 * - should return the threads with the toggled upvote thread when given by TOGGLE_UPVOTE_THREAD action
 */

import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';
import { ActionType } from './action';

describe('threadsReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    const initialState = [];
    const action = {
      type: ActionType.RECEIVE_THREADS,
      payload: {
        threads: [{ id: 'thread-1', title: 'Thread Test' }]
      }
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(['action.payload.threads']);
  });

  it('should return the threads with the new thread when given by CREATE_THREAD action', () => {
    const initialState = [{ id: 'thread-1', title: 'Thread 1' }];
    const action = {
      type: ActionType.CREATE_THREAD,
      payload: {
        thread: { id: 'thread-2', title: 'Thread 2' }
      }
    };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });
});
