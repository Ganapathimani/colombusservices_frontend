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
import createOrder from './_createOrder';
import createBranch from './_createBranch';
import createEmployee from './_createEmployee';
import deleteOrder from './_deleteOrder';
import getOrder from './_getOrder';
import createLogin from './_createLogin';
import listBranches from './_listBranches';
import listOrders from './_listOrders';
import createSignup from './_createSignup';
import userGet from './_userGet';
import updateProfile from './_updateProfile';
import updateOrder from './_updateOrder';

const tagTypes = [
  'Signup',
  'Login',
  'Orders',
  'createUser',
  'Employees',
  'Branches',
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
    createBranch: createBranch(builder),
    createUser: createUser(builder),
    createEmployee: createEmployee(builder),
    deleteOrder: deleteOrder(builder),
    createLogin: createLogin(builder),
    createOrder: createOrder(builder),
    createSignup: createSignup(builder),
    userGet: userGet(builder),
    listBranches: listBranches(builder),
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
  useCreateBranchMutation,
  useCreateUserMutation,
  useCreateEmployeeMutation,
  useGetOrderQuery,
  useDeleteOrderMutation,
  useCreateLoginMutation,
  useListBranchesQuery,
  useListOrdersQuery,
  useCreateOrderMutation,
  useCreateSignupMutation,
  useUserGetQuery,
  useUpdateProfileMutation,
  useUpdateOrderMutation,
} = colombusLogisticsApi;
