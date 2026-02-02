import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';
import useInput from '../hooks/useInput';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import disrum from '../assets/disrum.png';

const RegisterPage = () => {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = async (event) => {
    event.preventDefault();
    if (password.length < 6) {
      alert('Password minimal harus 6 karakter!');
      return;
    }
    setIsLoading(true);

    const success = await dispatch(
      asyncRegisterUser({ name, email, password })
    );

    if (success) {
      alert('Akun berhasil dibuat! Silakan login.');
      navigate('/login');
    } else {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <img
            src={disrum}
            alt="disrum"
            className="h-5 block ml-auto mr-0 mb-5"
          />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Buat Akun
          </h2>
          <p className="text-gray-500">
            Bergabunglah dengan komunitas diskusi kami
          </p>
        </div>

        <form onSubmit={onRegister} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Nama Lengkap <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={onNameChange}
              placeholder="Masukkan nama Anda"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Alamat Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={onEmailChange}
              placeholder="nama@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={onPasswordChange}
              placeholder="Minimal 6 karakter"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-red-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-3 rounded-xl shadow-lg transition-all transform mt-2 flex justify-center items-center gap-3 cursor-pointer ${
              isLoading
                ? 'bg-red-50 text-red-400 cursor-wait border border-red-100'
                : 'bg-red-600 text-white hover:bg-white hover:text-red-600 border border-red-600 shadow-red-100 active:scale-[0.98]'
            }`}
          >
            {isLoading
              ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                <span>Memproses...</span>
              </>
                )
              : (
                  'Daftar Akun'
                )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Sudah punya akun?{' '}
            <Link
              to="/login"
              className="text-red-600 font-bold hover:underline underline-offset-4"
            >
              Login di sini
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
