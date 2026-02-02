/**
 * skenario pengujian thunks
 *
 * - asyncCreateThread thunk:
 * - should dispatch action correctly when data fetching success
 * - should dispatch alert correctly when data fetching failed
 * * - asyncToggleUpvoteThread thunk:
 * - should dispatch action correctly when upvote success
 * - should dispatch alert correctly when upvote failed
 */

import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import api from '../../utils/api';
import {
  asyncCreateThread,
  createThreadActionCreator,
  asyncToggleUpvoteThread,
  toggleUpvoteThreadActionCreator
} from './action';

const fakeThreadResponse = {
  id: 'thread-1',
  title: 'Thread Test',
  body: 'Body Test',
  category: 'Category Test'
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncCreateThread thunk', () => {
  beforeEach(() => {
    api._createThread = api.createThread;
  });

  afterEach(() => {
    api.createThread = api._createThread;
    delete api._createThread;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.createThread = vi.fn().mockResolvedValue(fakeThreadResponse);
    const dispatch = vi.fn();

    await asyncCreateThread({ title: 'T', body: 'B', category: 'C' })(dispatch);

    expect(dispatch).toHaveBeenCalledWith(
      createThreadActionCreator(fakeThreadResponse)
    );
  });

  it('should dispatch alert correctly when data fetching failed', async () => {
    api.createThread = vi.fn().mockRejectedValue(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncCreateThread({ title: 'T', body: 'B', category: 'C' })(dispatch);

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncToggleUpvoteThread thunk', () => {
  beforeEach(() => {
    api._toggleUpvoteThread = api.toggleUpvoteThread;
  });

  afterEach(() => {
    api.toggleUpvoteThread = api._toggleUpvoteThread;
    delete api._toggleUpvoteThread;
  });

  it('should dispatch action correctly when upvote success', async () => {
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' }
    });
    api.toggleUpvoteThread = vi.fn().mockResolvedValue();

    await asyncToggleUpvoteThread('thread-1')(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(
      toggleUpvoteThreadActionCreator({
        threadId: 'thread-1',
        userId: 'user-1'
      })
    );
  });

  it('should dispatch alert correctly when upvote failed', async () => {
    const dispatch = vi.fn();
    const getState = () => ({
      authUser: { id: 'user-1' }
    });
    api.toggleUpvoteThread = vi.fn().mockRejectedValue(fakeErrorResponse);
    window.alert = vi.fn();

    await asyncToggleUpvoteThread('thread-1')(dispatch, getState);

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
