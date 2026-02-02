import React from 'react';
import LoginInput from '../LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput
};

export const Default = () => (
  <LoginInput login={({ email }) => alert(`Login with: ${email}`)} />
);

export const Loading = () => <LoginInput login={() => {}} isLoading={true} />;
