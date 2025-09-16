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
      return 'customer';
    }
    const user = JSON.parse(userStr);
    return user?.role?.toLowerCase() || 'customer';
  } catch {
    return 'customer';
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
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, [key, value]);
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
