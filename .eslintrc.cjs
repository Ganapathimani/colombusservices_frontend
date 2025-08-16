/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  extends: ['@react-ddd'],
  root: true,
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
