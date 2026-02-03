/**
 * skenario pengujian CommentInput
 *
 * - CommentInput component
 * - should handle typing correctly
 * - should display the correct character length
 * - should disable the submit button when the content is empty
 * - should call addComment and clear the input when button is clicked
 */

import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentInput from '../CommentInput';
import '@testing-library/jest-dom/vitest';

describe('CommentInput component', () => {
  it('should handle typing correctly', async () => {
    render(<CommentInput addComment={() => {}} />);
    const textarea = screen.getByPlaceholderText(/Tuliskan pemikiran Anda/i);

    await userEvent.type(textarea, 'Halo komentar');

    expect(textarea.value).toBe('Halo komentar');
  });

  it('should display the correct character length', async () => {
    render(<CommentInput addComment={() => {}} />);
    const textarea = screen.getByPlaceholderText(/Tuliskan pemikiran Anda/i);

    await userEvent.type(textarea, 'ABC');

    const charCounter = screen.getByText(/3 \/ 500/i);
    expect(charCounter).toBeInTheDocument();
  });

  it('should disable the submit button when the content is empty', async () => {
    render(<CommentInput addComment={() => {}} />);
    const button = screen.getByRole('button', { name: /Kirim Komentar/i });

    expect(button).toBeDisabled();
    expect(button).toHaveClass('bg-gray-200');
  });

  it('should call addComment and clear the input when button is clicked', async () => {
    const mockAddComment = vi.fn();
    render(<CommentInput addComment={mockAddComment} />);
    const textarea = screen.getByPlaceholderText(/Tuliskan pemikiran Anda/i);
    const button = screen.getByRole('button', { name: /Kirim Komentar/i });

    await userEvent.type(textarea, 'Komentar baru');
    await userEvent.click(button);

    expect(mockAddComment).toHaveBeenCalledWith('Komentar baru');
    expect(textarea.value).toBe('');
  });
});
