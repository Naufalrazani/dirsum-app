const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function putAccessToken (token) {
    localStorage.setItem('accessToken', token);
  }

  function getAccessToken () {
    return localStorage.getItem('accessToken');
  }

  async function _fetchWithAuth (url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`
      }
    });
  }

  async function register ({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    return responseJson.data.user;
  }

  async function login ({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    return responseJson.data.token;
  }

  async function getAllUsers () {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    return responseJson.data.users;
  }

  async function getOwnProfile () {
    const token = getAccessToken();
    if (!token) {
      throw new Error('No access token found');
    }

    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    return responseJson.data.user;
  }

  async function getAllThreads () {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    return responseJson.data.threads;
  }

  async function getThreadDetail (id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    return responseJson.data.detailThread;
  }

  async function createThread ({ title, body, category = '' }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category })
    });

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    return responseJson.data.thread;
  }

  async function createComment ({ threadId, content }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      }
    );

    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    return responseJson.data.comment;
  }

  async function toggleUpvoteThread (threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/up-vote`,
      {
        method: 'POST'
      }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') { throw new Error(responseJson.message); }
  }

  async function toggleDownvoteThread (threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/down-vote`,
      {
        method: 'POST'
      }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') { throw new Error(responseJson.message); }
  }

  async function toggleNeutralizeThreadVote (threadId) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/neutral-vote`,
      {
        method: 'POST'
      }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') { throw new Error(responseJson.message); }
  }

  async function getLeaderboards () {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { status, message } = responseJson;

    if (status !== 'success') throw new Error(message);
    return responseJson.data.leaderboards;
  }

  async function toggleUpvoteComment ({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`,
      { method: 'POST' }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') { throw new Error(responseJson.message); }
  }

  async function toggleDownvoteComment ({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`,
      { method: 'POST' }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') { throw new Error(responseJson.message); }
  }

  async function toggleNeutralizeCommentVote ({ threadId, commentId }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`,
      { method: 'POST' }
    );
    const responseJson = await response.json();
    if (responseJson.status !== 'success') { throw new Error(responseJson.message); }
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getAllUsers,
    getOwnProfile,
    getAllThreads,
    getThreadDetail,
    createThread,
    createComment,
    toggleUpvoteThread,
    toggleDownvoteThread,
    toggleNeutralizeThreadVote,
    getLeaderboards,
    toggleUpvoteComment,
    toggleDownvoteComment,
    toggleNeutralizeCommentVote
  };
})();

export default api;
