/* eslint-disable no-param-reassign -- immer */
import type { State } from './State';

const endBlocking = (
  state: State,
) => {
  state.blocking -= 1;
};
export default endBlocking;
