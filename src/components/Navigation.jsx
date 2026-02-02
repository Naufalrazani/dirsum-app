import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import {
  HiOutlineLogout,
  HiOutlineChartBar,
  HiOutlineHome
} from 'react-icons/hi';
import disrum from '../assets/disrum.png';

const Navigation = ({ authUser }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold bg-linear-to-r from-red-600 to-red-700 bg-clip-text text-transparent"
        >
          <img src={disrum} alt="disrum" className="h-6" />
        </Link>

        <div className="flex items-center gap-2 md:gap-6">
          <div className="flex items-center gap-4 md:gap-10">
            <Link
              to="/"
              className="text-gray-600 hover:text-red-600 transition flex items-center gap-2 p-2 md:p-0"
              title="Home"
            >
              <HiOutlineHome size={22} />
              <span className="hidden md:block text-sm font-medium">Home</span>
            </Link>
            <Link
              to="/leaderboards"
              className="text-gray-600 hover:text-red-600 transition flex items-center gap-2 p-2 md:p-0"
              title="Leaderboards"
            >
              <HiOutlineChartBar size={22} />
              <span className="hidden md:block text-sm font-medium">
                Leaderboards
              </span>
            </Link>
          </div>

          <div className="h-8 w-px bg-gray-200 hidden sm:block mx-1"></div>

          <div className="flex items-center gap-2 md:gap-3 bg-gray-50 p-1 md:p-1.5 md:pr-3 rounded-full border border-gray-100">
            <img
              src={authUser.avatar}
              alt={authUser.name}
              className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-white shadow-sm object-cover"
            />

            <div className="hidden lg:block">
              <p className="text-sm font-bold text-gray-800 leading-tight">
                {authUser.name}
              </p>
              <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                Member
              </p>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-2 md:px-3 py-1.5 text-xs md:text-sm font-medium text-red-500 hover:bg-red-50 rounded-full md:rounded-lg transition cursor-pointer"
              title="Keluar"
            >
              <HiOutlineLogout size={18} />
              <span className="hidden sm:block">Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
