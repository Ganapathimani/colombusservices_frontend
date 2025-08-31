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
import loginUpsert from './_loginUpsert';
import listOrders from './_listOrders';
import orderUpsert from './_createOrder';
import signupUpsert from './_signupUpsert';
import userGet from './_userGet';

const tagTypes = [
  'Signup',
  'Login',
  'Orders',
] as const;

const baseQuery = createApi({
  reducerPath: 'logictics',
  baseQuery: fetchBaseQuery({
    baseUrl: `${window.envs.BFF_BASE_URL}/api/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes,
  endpoints: (builder) => ({
    loginUpsert: loginUpsert(builder),
    orderUpsert: orderUpsert(builder),
    signupUpsert: signupUpsert(builder),
    userGet: userGet(builder),
    listOrders: listOrders(builder),
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

export type ColombusLogisticsTagType = typeof tagTypes[number];
export type ColombusLogisticsBuilder = EndpointBuilder<
BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
ColombusLogisticsTagType,
'logictics'>;

export default colombusLogisticsApi;

export const {
  useLoginUpsertMutation,
  useListOrdersQuery,
  useOrderUpsertMutation,
  useSignupUpsertMutation,
  useUserGetQuery,
} = colombusLogisticsApi;
