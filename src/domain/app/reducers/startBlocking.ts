/* eslint-disable no-param-reassign -- immer */
import type { State } from './State';

const startBlocking = (
  state: State,
) => {
  state.blocking += 1;
};
export default startBlocking;
