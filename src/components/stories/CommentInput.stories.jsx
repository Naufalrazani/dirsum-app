import CommentInput from '../CommentInput';

export default {
  title: 'Components/CommentInput',
  component: CommentInput
};

/**
 * Story: Kondisi awal kosong.
 */
export const Empty = {
  args: {
    addComment: (content) => alert(`Komentar dikirim: ${content}`),
    defaultValue: ''
  }
};

/**
 * Story: Teks terisi otomatis tanpa harus mengetik.
 */
export const WithText = {
  args: {
    addComment: (content) => alert(`Komentar dikirim: ${content}`),
    defaultValue: 'Halo! Ini adalah komentar yang otomatis muncul.'
  }
};
