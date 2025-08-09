import type { NavigateFunction } from 'react-router-dom';

const with401Redirect = <T = any>(
  onQueryStarted?: T, navigate?: NavigateFunction,
): T => ((arg: any, api: any) => {
    const { queryFulfilled } = api;

    queryFulfilled.catch((e: any) => {
      const status = e?.error?.status;
      if (status === 401 && navigate) {
        navigate('/login');
      }
    });

    if (onQueryStarted) {
      return (onQueryStarted as any)(arg, api);
    }

    return Promise.resolve();
  }) as any;

export default with401Redirect;
