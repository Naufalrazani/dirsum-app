import { useState } from 'react';
import PropTypes from 'prop-types';
import { HiPaperAirplane } from 'react-icons/hi2';

function CommentInput ({ addComment }) {
  const [content, setContent] = useState('');

  function handleAddComment () {
    if (content.trim()) {
      addComment(content);
      setContent('');
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <textarea
          placeholder="Tuliskan pemikiran Anda di sini..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-30 p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-1 focus:ring-red-500 focus:bg-white focus:border-transparent outline-none transition-all resize-none text-gray-700 placeholder:text-gray-400"
        />
        <div className="absolute bottom-3 right-3">
          <span
            className={`text-xs font-medium ${content.length > 300 ? 'text-red-500' : 'text-gray-400'}`}
          >
            {content.length} / 500
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={!content.trim()}
          onClick={handleAddComment}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all transform active:scale-95 cursor-pointer ${
            content.trim()
              ? 'bg-red-600 text-white shadow-lg shadow-red-100 hover:bg-red-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <span>Kirim Komentar</span>
          <HiPaperAirplane className={content.trim() ? 'rotate-90' : ''} />
        </button>
      </div>
    </div>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default CommentInput;
