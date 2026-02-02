import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ThreadItem from '../components/ThreadItem';
import { HiPlus } from 'react-icons/hi';

const HomePage = () => {
  const threads = useSelector((state) => state.threads);
  const users = useSelector((state) => state.users);
  const authUser = useSelector((state) => state.authUser);

  const [filter, setFilter] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const categories = new Set(threads.map((thread) => thread.category));

  const filteredThreads = threads.filter((thread) => {
    return filter === '' || thread.category === filter;
  });

  const threadList = filteredThreads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id
  }));

  return (
    <section className="relative">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Kategori Populer
        </h2>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter('')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer ${
              filter === ''
                ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-100'
                : 'bg-white border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-600'
            }`}
          >
            #semua
          </button>
          {[...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category === filter ? '' : category)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border cursor-pointer ${
                filter === category
                  ? 'bg-red-600 border-red-600 text-white shadow-md shadow-red-100'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-red-400 hover:text-red-600'
              }`}
            >
              #{category}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Diskusi Terbaru</h2>
        <span className="text-sm text-gray-500">
          {threadList.length} Thread ditemukan
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {threadList.length > 0
          ? (
              threadList.map((thread) => <ThreadItem key={thread.id} {...thread} />)
            )
          : (
          <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-500">
              Tidak ada diskusi untuk kategori ini.
            </p>
          </div>
            )}
      </div>

      <button
        type="button"
        onClick={() => navigate('/add-thread')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-red-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-white hover:text-red-600 border border-red-600 hover:scale-110 active:scale-95 transition-all z-40 cursor-pointer"
        title="Buat Diskusi Baru"
      >
        <HiPlus size={28} />
      </button>
    </section>
  );
};

export default HomePage;
