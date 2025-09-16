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
import createUser from './_createUser';
import createEmployee from './_createEmployee';
import deleteOrder from './_deleteOrder';
import getOrder from './_getOrder';
import loginUpsert from './_loginUpsert';
import listOrders from './_listOrders';
import orderUpsert from './_createOrder';
import signupUpsert from './_signupUpsert';
import userGet from './_userGet';
import updateProfile from './_updateProfile';
import updateOrder from './_updateOrder';

const tagTypes = [
  'Signup',
  'Login',
  'Orders',
  'createUser',
  'Employees',
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
    createUser: createUser(builder),
    createEmployee: createEmployee(builder),
    deleteOrder: deleteOrder(builder),
    loginUpsert: loginUpsert(builder),
    orderUpsert: orderUpsert(builder),
    signupUpsert: signupUpsert(builder),
    userGet: userGet(builder),
    listOrders: listOrders(builder),
    updateProfile: updateProfile(builder),
    getOrder: getOrder(builder),
    updateOrder: updateOrder(builder),
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
  useCreateUserMutation,
  useCreateEmployeeMutation,
  useGetOrderQuery,
  useDeleteOrderMutation,
  useLoginUpsertMutation,
  useListOrdersQuery,
  useOrderUpsertMutation,
  useSignupUpsertMutation,
  useUserGetQuery,
  useUpdateProfileMutation,
  useUpdateOrderMutation,
} = colombusLogisticsApi;
