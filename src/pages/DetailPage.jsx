import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncAddComment,
  asyncToggleUpvoteThreadDetail,
  asyncToggleDownvoteThreadDetail,
  asyncToggleNeutralizeThreadDetailVote,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
  asyncToggleNeutralizeCommentVote
} from '../states/threadDetail/action';
import { postedAt } from '../utils';
import CommentInput from '../components/CommentInput';
import {
  HiOutlineChatAlt2,
  HiOutlineLogin,
  HiThumbUp,
  HiOutlineThumbUp,
  HiThumbDown,
  HiOutlineThumbDown
} from 'react-icons/hi';

const DetailPage = () => {
  const { id } = useParams();
  const threadDetail = useSelector((state) => state.threadDetail);
  const authUser = useSelector((state) => state.authUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpvoteThread = () => {
    if (!authUser) return alert('Login dulu yuk!');
    const isUpvoted = threadDetail.upVotesBy.includes(authUser.id);
    if (isUpvoted) dispatch(asyncToggleNeutralizeThreadDetailVote());
    else dispatch(asyncToggleUpvoteThreadDetail());
  };

  const onDownvoteThread = () => {
    if (!authUser) return alert('Login dulu yuk!');
    const isDownvoted = threadDetail.downVotesBy.includes(authUser.id);
    if (isDownvoted) dispatch(asyncToggleNeutralizeThreadDetailVote());
    else dispatch(asyncToggleDownvoteThreadDetail());
  };

  const onUpvoteComment = (commentId, upVotesBy) => {
    if (!authUser) return alert('Login dulu yuk!');
    const isUpvoted = upVotesBy.includes(authUser.id);
    if (isUpvoted) dispatch(asyncToggleNeutralizeCommentVote(commentId));
    else dispatch(asyncToggleUpvoteComment(commentId));
  };

  const onDownvoteComment = (commentId, downVotesBy) => {
    if (!authUser) return alert('Login dulu yuk!');
    const isDownvoted = downVotesBy.includes(authUser.id);
    if (isDownvoted) dispatch(asyncToggleNeutralizeCommentVote(commentId));
    else dispatch(asyncToggleDownvoteComment(commentId));
  };

  if (!threadDetail) return null;

  const isThreadUpvoted = authUser
    ? threadDetail.upVotesBy.includes(authUser.id)
    : false;
  const isThreadDownvoted = authUser
    ? threadDetail.downVotesBy.includes(authUser.id)
    : false;

  return (
    <section className="max-w-3xl mx-auto space-y-8 pb-12">
      <article className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
        <header className="flex items-center gap-4 mb-8">
          <img
            src={threadDetail.owner.avatar}
            alt={threadDetail.owner.name}
            className="w-12 h-12 rounded-full ring-2 ring-red-50"
          />
          <div>
            <p className="font-bold text-gray-900 text-lg">
              {threadDetail.owner.name}
            </p>
            <p className="text-sm text-gray-400">
              {postedAt(threadDetail.createdAt)}
            </p>
          </div>
          <span className="ml-auto px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full uppercase">
            #{threadDetail.category}
          </span>
        </header>

        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
          {threadDetail.title}
        </h2>
        <div
          className="prose prose-red max-w-none text-gray-700 leading-relaxed text-lg mb-8"
          dangerouslySetInnerHTML={{ __html: threadDetail.body }}
        />

        <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
          <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
            <button
              onClick={onUpvoteThread}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isThreadUpvoted ? 'text-blue-600 bg-white shadow-sm' : 'text-gray-500 hover:text-blue-600'}`}
            >
              {isThreadUpvoted
                ? (
                <HiThumbUp size={20} />
                  )
                : (
                <HiOutlineThumbUp size={20} />
                  )}
              <span className="font-bold">{threadDetail.upVotesBy.length}</span>
            </button>
            <button
              onClick={onDownvoteThread}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isThreadDownvoted ? 'text-red-600 bg-white shadow-sm' : 'text-gray-500 hover:text-red-600'}`}
            >
              {isThreadDownvoted
                ? (
                <HiThumbDown size={20} />
                  )
                : (
                <HiOutlineThumbDown size={20} />
                  )}
              <span className="font-bold">
                {threadDetail.downVotesBy.length}
              </span>
            </button>
          </div>
        </div>
      </article>

      <section className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <HiOutlineChatAlt2 className="text-red-600 text-2xl" />
          <h3 className="text-xl font-bold text-gray-900">
            Komentar ({threadDetail.comments.length})
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all">
          {authUser
            ? (
            <CommentInput addComment={onAddComment} />
              )
            : (
            <div className="flex flex-col items-center py-4 text-center space-y-4">
              <p className="text-gray-500 font-medium">
                Login untuk ikut berdiskusi.
              </p>
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-100"
              >
                <HiOutlineLogin />
                Masuk Sekarang
              </Link>
            </div>
              )}
        </div>

        <div className="space-y-4">
          {threadDetail.comments.map((comment) => {
            const isCommentUpvoted = authUser
              ? comment.upVotesBy.includes(authUser.id)
              : false;
            const isCommentDownvoted = authUser
              ? comment.downVotesBy.includes(authUser.id)
              : false;

            return (
              <div
                key={comment.id}
                className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 transition-all hover:bg-white hover:shadow-md"
              >
                <header className="flex items-center gap-3 mb-4">
                  <img
                    src={comment.owner.avatar}
                    alt={comment.owner.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">
                      {comment.owner.name}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                      {postedAt(comment.createdAt)}
                    </p>
                  </div>
                </header>
                <div
                  className="text-gray-700 leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: comment.content }}
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      onUpvoteComment(comment.id, comment.upVotesBy)
                    }
                    className={`flex items-center gap-1.5 transition-all cursor-pointer ${isCommentUpvoted ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}
                  >
                    {isCommentUpvoted
                      ? (
                      <HiThumbUp size={18} />
                        )
                      : (
                      <HiOutlineThumbUp size={18} />
                        )}
                    <span className="text-xs font-bold">
                      {comment.upVotesBy.length}
                    </span>
                  </button>
                  <button
                    onClick={() =>
                      onDownvoteComment(comment.id, comment.downVotesBy)
                    }
                    className={`flex items-center gap-1.5 transition-all cursor-pointer ${isCommentDownvoted ? 'text-red-600' : 'text-gray-400 hover:text-red-600'}`}
                  >
                    {isCommentDownvoted
                      ? (
                      <HiThumbDown size={18} />
                        )
                      : (
                      <HiOutlineThumbDown size={18} />
                        )}
                    <span className="text-xs font-bold">
                      {comment.downVotesBy.length}
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </section>
  );
};

export default DetailPage;
