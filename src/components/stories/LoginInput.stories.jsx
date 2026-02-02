/* eslint-disable no-console */
import React from 'react';
import LoginInput from '../LoginInput';

export default {
  title: 'Components/LoginInput',
  component: LoginInput
};

export const Default = () => (
  <LoginInput
    login={({ email, password }) => console.log('Login:', email, password)}
  />
);

export const Loading = () => <LoginInput login={() => {}} isLoading={true} />;
