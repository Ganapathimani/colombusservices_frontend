import type {
  BaseQueryFn,
  EndpointBuilder,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {
  flow,
  identity,
  keyBy,
  keys,
  mapValues,
} from 'lodash/fp';
import with401Redirect from './with401Redirect';
import withLoading from './withLoading';

const tagTypes = [

] as const;

const baseQuery = createApi({
  reducerPath: 'logictics',
  baseQuery: fetchBaseQuery({
    baseUrl: `${window.envs.BFF_BASE_URL}/api/`,
    prepareHeaders: (headers) => {
      const tokenMatch = document.cookie.match(/(?:^|; )jwt_token=([^;]*)/);
      const token = tokenMatch?.[1];
      const userId = localStorage.getItem('userId');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      if (userId) {
        headers.set('x-user-id', userId);
      }
      return headers;
    },
  }),
  tagTypes,
  endpoints: (builder) => ({
  }),

});

const colombusLogisticsApi = baseQuery.enhanceEndpoints({
  endpoints: flow(
    keys,
    keyBy(identity),
    mapValues(() => (endpoint: any) => {
      // eslint-disable-next-line no-param-reassign -- rtk/query
      endpoint.onQueryStarted = flow(
        withLoading,
        with401Redirect,
      )(endpoint.onQueryStarted);
    }),
  )(baseQuery.endpoints),
});

export const getApi = () => colombusLogisticsApi;

export type ColomLogisticsTagType = typeof tagTypes[number];
export type ColomLogisticsBuilder = EndpointBuilder<
BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
ColomLogisticsTagType,
'horseshow-entry'>;

export default colombusLogisticsApi;

// eslint-disable-next-line no-empty-pattern
export const {
  // extract your query here
} = colombusLogisticsApi;
