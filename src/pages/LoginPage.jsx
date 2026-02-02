import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';
import disrum from '../assets/disrum.png';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async ({ email, password }) => {
    setIsLoading(true);
    const success = await dispatch(asyncSetAuthUser({ email, password }));

    if (success) {
      navigate('/');
    } else {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md mx-auto animate-fadeIn">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <img
            src={disrum}
            alt="disrum"
            className="h-5 block ml-auto mr-0 mb-5"
          />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            Selamat Datang
          </h2>
          <p className="text-gray-500">
            Silakan masuk untuk berkontribusi di forum
          </p>
        </div>

        <LoginInput login={onLogin} isLoading={isLoading} />

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Belum punya akun?{' '}
            <Link
              to="/register"
              className="text-red-600 font-bold hover:underline underline-offset-4"
            >
              Daftar Gratis
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
