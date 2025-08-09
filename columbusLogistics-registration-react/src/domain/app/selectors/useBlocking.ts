import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import app from '#domain/app/reducers/index';

export type UseBlocking = [
  isBlocking: boolean,
  setBlocking: () => () => void,
];

const useBlocking = (): UseBlocking => {
  const blockingCount = useSelector((state: any) => state.app.blocking);

  const dispatch = useDispatch();

  const setBlocking = useCallback(
    () => {
      dispatch(app.actions.startBlocking());

      return () => {
        dispatch(app.actions.endBlocking());
      };
    },
    [dispatch],
  );

  return useMemo(
    () => [
      blockingCount > 0,
      setBlocking,
    ],
    [blockingCount, setBlocking],
  );
};
export default useBlocking;
