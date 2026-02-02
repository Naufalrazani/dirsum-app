/**
 * skenario pengujian LoginInput
 *
 * - LoginInput component
 * - should handle email typing correctly
 * - should handle password typing correctly
 * - should call login function when login button is clicked
 * - should disable login button when isLoading is true (Tambahan untuk > 3)
 * - should show loading text or state correctly (Tambahan untuk > 3)
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from '../LoginInput';
import '@testing-library/jest-dom/vitest';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    render(<LoginInput login={() => {}} isLoading={false} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');

    await userEvent.type(emailInput, 'test@example.com');

    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    render(<LoginInput login={() => {}} isLoading={false} />);
    const passwordInput = await screen.getByPlaceholderText('••••••••');

    await userEvent.type(passwordInput, 'passwordtest');

    expect(passwordInput.value).toBe('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} isLoading={false} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    const passwordInput = await screen.getByPlaceholderText('••••••••');
    const loginButton = await screen.getByRole('button', {
      name: 'Masuk Sekarang'
    });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'passwordtest');
    await userEvent.click(loginButton);

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'passwordtest'
    });
  });

  it('should disable the login button when isLoading is true', async () => {
    render(<LoginInput login={() => {}} isLoading={true} />);
    const loginButton = screen.getByRole('button');

    expect(loginButton).toBeDisabled();
  });

  it('should have password input with type="password"', async () => {
    render(<LoginInput login={() => {}} isLoading={false} />);
    const passwordInput = screen.getByPlaceholderText('••••••••');

    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});
