import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncCreateThread } from '../states/threads/action';
import useInput from '../hooks/useInput';
import { HiOutlinePencilAlt, HiOutlineTag, HiX } from 'react-icons/hi';

const CreateThreadPage = () => {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onCreateThread = (event) => {
    event.preventDefault();
    dispatch(asyncCreateThread({ title, body, category })).then(() => {
      navigate('/');
    });
  };

  return (
    <section className="max-w-2xl mx-auto py-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-600 text-white rounded-lg shadow-lg shadow-red-100">
            <HiOutlinePencilAlt size={24} />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">
            Buat Diskusi Baru
          </h2>
        </div>
        <button
          onClick={() => navigate('/')}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all cursor-pointer"
          title="Batal"
        >
          <HiX size={24} />
        </button>
      </div>

      <form
        onSubmit={onCreateThread}
        className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
      >
        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Judul Diskusi
            </label>
            <input
              type="text"
              placeholder="Apa topik yang ingin Anda angkat?"
              value={title}
              onChange={onTitleChange}
              className="w-full text-xl font-bold px-0 py-2 border-b-2 border-gray-100 focus:border-red-500 outline-none transition-all placeholder:text-gray-300"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1 flex items-center gap-1">
              <HiOutlineTag size={16} /> Kategori
            </label>
            <input
              type="text"
              placeholder="Contoh: react, tutorial, keluhan (opsional)"
              value={category}
              onChange={onCategoryChange}
              className="w-full px-4 py-2 bg-gray-50 rounded-xl border border-transparent focus:border-red-200 focus:bg-white outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">
              Isi Diskusi
            </label>
            <textarea
              placeholder="Tulis pemikiran, pertanyaan, atau hal yang ingin kamu diskusikan di sini…"
              value={body}
              onChange={onBodyChange}
              className="w-full min-h-62.5 p-4 bg-gray-50 rounded-2xl border border-transparent focus:border-red-200 focus:bg-white outline-none transition-all resize-none leading-relaxed text-gray-700 shadow-inner"
              required
            />
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-gray-400 max-w-62.5">
            Yuk, jaga diskusi tetap sopan dan saling bermanfaat.
          </p>
          <button
            type="submit"
            disabled={!title || !body}
            className={`px-8 py-3 rounded-xl font-bold shadow-lg transition-all transform active:scale-95 cursor-pointer ${
              title && body
                ? 'bg-red-600 text-white shadow-red-200 hover:bg-red-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Posting Diskusi
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateThreadPage;
