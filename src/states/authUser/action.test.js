/**
 * skenario pengujian authUser thunk
 *
 * - asyncSetAuthUser thunk:
 * - should dispatch action correctly when login success
 * - should dispatch alert correctly when login failed
 * - asyncUnsetAuthUser thunk:
 * - should dispatch action correctly when logout
 */

import { describe, beforeEach, afterEach, it, expect, vi } from 'vitest';
import api from '../../utils/api';
import {
  asyncSetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncUnsetAuthUser
} from './action';

const fakeAuthUserResponse = {
  id: 'user-1',
  name: 'Naufal',
  email: 'naufal@gmail.com'
};

const fakeErrorResponse = new Error('Invalid email or password');

describe('authUser thunk actions', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;
    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
  });

  it('should dispatch action correctly when login success', async () => {
    api.login = vi.fn().mockResolvedValue('fake-token');
    api.getOwnProfile = vi.fn().mockResolvedValue(fakeAuthUserResponse);
    api.putAccessToken = vi.fn();
    const dispatch = vi.fn();

    await asyncSetAuthUser({ email: 'naufal@gmail.com', password: 'password' })(
      dispatch
    );

    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeAuthUserResponse)
    );
  });

  it('should dispatch alert correctly when login failed', async () => {
    api.login = vi.fn().mockRejectedValue(fakeErrorResponse);
    window.alert = vi.fn();
    const dispatch = vi.fn();

    await asyncSetAuthUser({
      email: 'naufal@gmail.com',
      password: 'password123'
    })(dispatch);

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  it('should dispatch action correctly when logout', async () => {
    api.putAccessToken = vi.fn();
    const dispatch = vi.fn();

    await asyncUnsetAuthUser()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
  });
});
