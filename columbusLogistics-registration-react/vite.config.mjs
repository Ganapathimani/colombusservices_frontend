import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import flow from 'lodash/fp/flow';
import toPairs from 'lodash/fp/toPairs';
import filter from 'lodash/fp/filter';
import map from 'lodash/fp/map';
import startsWith from 'lodash/fp/startsWith';
import fromPairs from 'lodash/fp/fromPairs';
import replace from 'lodash/fp/replace';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const publicEnvs = flow(
  toPairs,
  filter(([name]) => startsWith('PUBLIC_', name)),
  map(([name, value]) => [
    replace(/^PUBLIC_/, '', name),
    value,
  ]),
  fromPairs,
)(process.env);
const publicEnvsScript = `window.envs = ${JSON.stringify(publicEnvs)}`;

const injectEnv = () => ({
  name: 'inject-env',
  apply: 'serve',
  transformIndexHtml: (html) => html.replace('<%= windowInjection %>', publicEnvsScript),
});

export default defineConfig({
  server: {
    port: 4000,
    open: true,
  },
  plugins: [
    react(),
    tsconfigPaths(),
    injectEnv(),
  ],
  resolve: {
    alias: {
      '#assets/*': './src/assests/*',
      '#domain/*': './src/domain/*',
      '#constants/*': './src/constants/*',
      '#components/*': './src/components/*',
      '#pages/*': './src/pages/*',
      '#utils/*': './src/utils/*',
    },
  },
});
