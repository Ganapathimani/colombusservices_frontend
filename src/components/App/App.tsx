import { RouterProvider } from 'react-router-dom';
import { withProviders } from '@react-shanties/core';
import { Provider } from 'react-redux';
import router from '#pages/router';
import store from './_store';

const App = withProviders([
  [Provider, { store }],
  [RouterProvider, { router }], // this must be a last provider
], '');

export default App;
