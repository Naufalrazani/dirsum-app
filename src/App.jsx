import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { asyncPreloadProcess } from './states/isPreload/action';

import Navigation from './components/Navigation';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import CreateThreadPage from './pages/CreateThreadPage';
import LeaderboardsPage from './pages/LeaderboardsPage';

const App = () => {
  const authUser = useSelector((state) => state.authUser);
  const isPreload = useSelector((state) => state.isPreload);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-999">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      <div className="fixed top-0 z-100 w-full">
        <LoadingBar className="h-1 bg-linear-to-r from-red-500 to-red-600 shadow-md" />
      </div>

      {authUser && <Navigation authUser={authUser} />}

      <main
        className={`flex-1 max-w-7xl mx-auto px-4 py-8 w-full ${
          !authUser ? 'flex items-center justify-center' : ''
        }`}
      >
        <Routes>
          {!authUser
            ? (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/*" element={<Navigate to="/login" />} />
            </>
              )
            : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/threads/:id" element={<DetailPage />} />
              <Route path="/add-thread" element={<CreateThreadPage />} />
              <Route path="/leaderboards" element={<LeaderboardsPage />} />
              <Route path="/login" element={<Navigate to="/" />} />
              <Route path="/register" element={<Navigate to="/" />} />
            </>
              )}
        </Routes>
      </main>

      <footer className="py-4 text-center text-gray-400 text-xs border-t border-gray-100">
        <p>© 2026 Disrum | Muhammad Naufal Razani</p>
      </footer>
    </div>
  );
};

export default App;
