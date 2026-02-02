/**
 * skenario pengujian thunk asyncCreateThread
 *
 * - asyncCreateThread thunk
 * - should dispatch action correctly when data fetching success
 * - should dispatch alert correctly when data fetching failed
 */

import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import api from '../../utils/api';
import { asyncCreateThread, createThreadActionCreator } from './action';

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
    // backup & mock
    api.createThread = vi.fn().mockResolvedValue(fakeThreadResponse);
    const dispatch = vi.fn();

    // action
    await asyncCreateThread({ title: 'T', body: 'B', category: 'C' })(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(
      createThreadActionCreator(fakeThreadResponse)
    );
  });

  it('should dispatch alert correctly when data fetching failed', async () => {
    // backup & mock
    api.createThread = vi.fn().mockRejectedValue(fakeErrorResponse);
    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncCreateThread({ title: 'T', body: 'B', category: 'C' })(dispatch);

    // assert
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
