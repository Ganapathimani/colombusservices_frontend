import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import app from '#domain/app/reducers/index';

export type UseLoading = [
  isLoading: boolean,
  setLoading: () => () => void,
];

const useLoading = (): UseLoading => {
  const loadingCount = useSelector((state: any) => state.app.loading);

  const dispatch = useDispatch();

  const setLoading = useCallback(
    () => {
      dispatch(app.actions.startLoading({}));

      return () => {
        dispatch(app.actions.endLoading());
      };
    },
    [dispatch],
  );

  return useMemo(
    () => [
      loadingCount > 0,
      setLoading,
    ],
    [loadingCount, setLoading],
  );
};
export default useLoading;
