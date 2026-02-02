import LoginInput from '../LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput
};

/**
 * Story dalam kondisi default atau normal.
 * User dapat mengisi email dan password serta menekan tombol masuk.
 */
export const Default = {
  args: {
    login: ({ email }) => alert(`Mencoba login dengan: ${email}`),
    isLoading: false
  }
};

/**
 * Story dalam kondisi loading.
 * Seluruh input dan tombol akan dinonaktifkan (disabled)
 * untuk mencegah input ganda saat proses autentikasi berlangsung.
 */
export const Loading = {
  args: {
    login: () => {},
    isLoading: true
  }
};
