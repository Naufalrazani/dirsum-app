import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import useInput from '../hooks/useInput';

const LoginInput = ({ login, isLoading }) => {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onSubmit = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Alamat Email <span className="text-red-500">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="nama@email.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
          required
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password <span className="text-red-500">*</span>
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={onPasswordChange}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-1 focus:ring-red-500 focus:border-transparent outline-none transition-all placeholder:text-gray-400"
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
            <span>Menautkan Akun...</span>
          </>
            )
          : (
              'Masuk Sekarang'
            )}
      </button>
    </form>
  );
};

export default LoginInput;
