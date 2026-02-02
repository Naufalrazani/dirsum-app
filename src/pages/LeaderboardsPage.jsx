import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import { HiOutlineTrophy, HiOutlineFire } from 'react-icons/hi2';

const LeaderboardsPage = () => {
  const leaderboards = useSelector((state) => state.leaderboards) || [];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (leaderboards.length === 0) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  const topThree = leaderboards.slice(0, 3);
  const theRest = leaderboards.slice(3);

  const medalColors = [
    'bg-yellow-400 shadow-yellow-200',
    'bg-slate-300 shadow-slate-200',
    'bg-amber-600 shadow-amber-200'
  ];

  return (
    <section className="max-w-2xl mx-auto space-y-8 animate-fadeIn pb-10">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center p-3 bg-red-50 rounded-2xl text-red-600 mb-2">
          <HiOutlineTrophy size={32} />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Klasemen Pengguna Aktif
        </h2>
        <p className="text-gray-500 font-medium">
          Papan peringkat kontributor diskusi terbaik.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
        {topThree.map(({ user, score }, index) => (
          <div
            key={user.id}
            className={`relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center transition-transform hover:-translate-y-2 ${
              index === 0
                ? 'md:order-2 md:pb-12 border-red-200 ring-4 ring-red-50'
                : index === 1
                  ? 'md:order-1'
                  : 'md:order-3'
            }`}
          >
            <div
              className={`absolute -top-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-lg z-10 ${medalColors[index]}`}
            >
              {index + 1}
            </div>
            <img
              src={user.avatar}
              alt={user.name}
              className={`rounded-full border-4 object-cover ${index === 0 ? 'w-24 h-24 border-yellow-100' : 'w-16 h-16 border-gray-100'}`}
            />
            <h3 className="mt-4 font-bold text-gray-900 text-center line-clamp-1">
              {user.name}
            </h3>

            <div className="flex items-center gap-1.5 mt-2 px-4 py-1 bg-red-50 rounded-full text-red-700">
              <HiOutlineFire className="animate-pulse" />
              <span className="font-black text-lg">{score} pts</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden">
        <header className="grid grid-cols-12 gap-4 px-8 py-5 bg-gray-50 border-b border-gray-100 text-xs font-black text-gray-400 uppercase tracking-widest">
          <div className="col-span-2">Rank</div>
          <div className="col-span-7">Pengguna</div>
          <div className="col-span-3 text-right">Skor Total</div>
        </header>

        <div className="divide-y divide-gray-50">
          {theRest.map(({ user, score }, index) => (
            <div
              key={user.id}
              className="grid grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-red-50/30 transition-colors"
            >
              <div className="col-span-2 font-bold text-gray-400 ml-2">
                #{index + 4}
              </div>
              <div className="col-span-7 flex items-center gap-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border border-gray-200 shadow-sm"
                />
                <span className="font-bold text-gray-800">{user.name}</span>
              </div>
              <div className="col-span-3 text-right">
                <span className="inline-block px-3 py-1 bg-gray-100 rounded-lg font-black text-gray-900 min-w-15 text-center mr-3">
                  {score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeaderboardsPage;
