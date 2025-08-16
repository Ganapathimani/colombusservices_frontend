import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '#components/App/App';

const load = () => {
  const root = document.getElementById('root');
  if (!root) {
    return;
  }
  createRoot(root).render(React.createElement(App));
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', load);
} else {
  load();
}

declare global {
  interface Window {
    envs: Record<string, string>;
  }
}
