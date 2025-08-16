import app from '#domain/app/reducers';

const withLoading = <T = any>(onQueryStarted?: T): T => ((arg: any, api: any) => {
  const {
    dispatch,
    queryFulfilled,
  } = api;

  dispatch(app.actions.startLoading({}));

  queryFulfilled.catch(() => Promise.resolve())
    .finally(() => {
      dispatch(app.actions.endLoading());
    });

  if (onQueryStarted) {
    return (onQueryStarted as any)(arg, api);
  }

  return Promise.resolve();
}) as any;
export default withLoading;
