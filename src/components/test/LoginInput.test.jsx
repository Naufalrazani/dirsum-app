/**
 * skenario pengujian LoginInput
 *
 * - LoginInput component
 * - should handle email typing correctly
 * - should handle password typing correctly
 * - should call login function when login button is clicked
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from '../LoginInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} isLoading={false} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');

    // Action
    await userEvent.type(emailInput, 'test@example.com');

    // Assert
    expect(emailInput.value).toBe('test@example.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} isLoading={false} />);
    const passwordInput = await screen.getByPlaceholderText('••••••••');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput.value).toBe('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput login={mockLogin} isLoading={false} />);
    const emailInput = await screen.getByPlaceholderText('nama@email.com');
    const passwordInput = await screen.getByPlaceholderText('••••••••');
    const loginButton = await screen.getByRole('button', {
      name: 'Masuk Sekarang'
    });

    // Action
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'passwordtest');
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'passwordtest'
    });
  });
});
