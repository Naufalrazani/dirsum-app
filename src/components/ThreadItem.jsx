import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postedAt } from '../utils';
import {
  HiOutlineChatAlt,
  HiThumbUp,
  HiThumbDown,
  HiOutlineThumbUp,
  HiOutlineThumbDown
} from 'react-icons/hi';
import {
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
  asyncToggleNeutralizeThreadVote
} from '../states/threads/action';

const ThreadItem = ({
  id,
  title,
  body,
  createdAt,
  totalComments,
  user,
  category,
  upVotesBy,
  downVotesBy,
  authUser
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUpvoted = authUser ? upVotesBy.includes(authUser) : false;
  const isDownvoted = authUser ? downVotesBy.includes(authUser) : false;

  const onUpvoteClick = (event) => {
    event.stopPropagation();
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk memberikan vote!');
      return;
    }

    if (isUpvoted) {
      dispatch(asyncToggleNeutralizeThreadVote(id));
    } else {
      dispatch(asyncToggleUpvoteThread(id));
    }
  };

  const onDownvoteClick = (event) => {
    event.stopPropagation();
    if (!authUser) {
      alert('Silakan login terlebih dahulu untuk memberikan vote!');
      return;
    }

    if (isDownvoted) {
      dispatch(asyncToggleNeutralizeThreadVote(id));
    } else {
      dispatch(asyncToggleDownvoteThread(id));
    }
  };

  return (
    <div
      onClick={() => navigate(`/threads/${id}`)}
      className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-200 transition-all cursor-pointer group flex flex-col h-full"
    >
      <header className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-100">
          #{category}
        </span>
        <span className="text-[11px] font-medium text-gray-400">
          {postedAt(createdAt)}
        </span>
      </header>

      <div className="flex-1">
        <h3 className="text-xl font-extrabold text-gray-900 group-hover:text-red-600 transition-colors mb-3 leading-snug">
          {title}
        </h3>

        <div
          className="text-gray-600 text-sm line-clamp-3 mb-6 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </div>

      <footer className="flex items-center justify-between pt-5 border-t border-gray-50 mt-auto">
        <div className="flex items-center gap-2">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-9 h-9 rounded-full ring-2 ring-gray-50 object-cover"
          />
          <span className="text-sm font-bold text-gray-800">{user.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-gray-50/80 rounded-2xl p-1 border border-gray-100">
            <button
              type="button"
              onClick={onUpvoteClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all active:scale-90 cursor-pointer ${
                isUpvoted
                  ? 'text-blue-600 bg-white shadow-md ring-1 ring-blue-100'
                  : 'text-gray-500 hover:text-blue-600 hover:bg-white'
              }`}
            >
              {isUpvoted
                ? (
                <HiThumbUp size={18} />
                  )
                : (
                <HiOutlineThumbUp size={18} />
                  )}
              <span className="text-xs font-black">{upVotesBy.length}</span>
            </button>

            <button
              type="button"
              onClick={onDownvoteClick}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all active:scale-90 cursor-pointer ${
                isDownvoted
                  ? 'text-red-600 bg-white shadow-md ring-1 ring-red-100'
                  : 'text-gray-500 hover:text-red-600 hover:bg-white'
              }`}
            >
              {isDownvoted
                ? (
                <HiThumbDown size={18} />
                  )
                : (
                <HiOutlineThumbDown size={18} />
                  )}
              <span className="text-xs font-black">{downVotesBy.length}</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-gray-400 bg-gray-50/80 px-3 py-2 rounded-2xl border border-gray-100">
            <HiOutlineChatAlt size={18} />
            <span className="text-xs font-black text-gray-600">
              {totalComments}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const userShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string
};

export default ThreadItem;
