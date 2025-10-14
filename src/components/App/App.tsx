import React, { useEffect, useState, useCallback } from 'react';
import { RouterProvider } from 'react-router-dom';
import { withProviders } from '@react-shanties/core';
import { Provider } from 'react-redux';
import builderRouter from '#pages/router';
import store from './_store';

const getUserRole = (): string => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      return 'CUSTOMER';
    }
    const user = JSON.parse(userStr);

    if (user?.role?.toUpperCase() === 'STAFF') {
      return user?.staffRole?.toLowerCase() ?? 'STAFF';
    }
    return user?.role?.toLowerCase() ?? 'CUSTOMER';
  } catch {
    return 'CUSTOMER';
  }
};

const useUserRole = () => {
  const [userRole, setUserRole] = useState<string>(() => getUserRole());

  const refreshRole = useCallback(() => {
    setUserRole(getUserRole());
  }, []);

  useEffect(() => {
    window.addEventListener('storage', refreshRole);
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = (key: string, value: string) => {
      originalSetItem.apply(localStorage, [key, value]);
      if (key === 'user') {
        refreshRole();
      }
    };

    return () => {
      window.removeEventListener('storage', refreshRole);
      localStorage.setItem = originalSetItem;
    };
  }, [refreshRole]);

  return userRole;
};

const App = () => {
  const userRole = useUserRole();
  const router = builderRouter(userRole);

  const WrappedApp = withProviders(
    [
      [Provider, { store }],
      [RouterProvider, { router }],
    ],
    '',
  );

  return <WrappedApp />;
};

export default App;
