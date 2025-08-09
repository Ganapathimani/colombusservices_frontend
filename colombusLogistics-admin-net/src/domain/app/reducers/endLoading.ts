/* eslint-disable no-param-reassign -- immer */
import type { State } from './State';

const endLoading = (
  state: State,
) => {
  state.loading -= 1;
};
export default endLoading;
