/* eslint-disable no-param-reassign -- immer */
import type { PayloadAction } from '@reduxjs/toolkit';
import type { State } from './State';

export type StartLoading = {
  name?: string,
};

const startLoading = (
  state: State,
  {
    payload: {
      name,
    },
  }: PayloadAction<StartLoading>,
) => {
  state.loading += 1;

  if (name) {
    state.loadingNames.push(name);
  }
};
export default startLoading;
