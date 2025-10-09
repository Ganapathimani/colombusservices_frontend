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
import createEnquiry from './_createEnquiry';
import createEmployee from './_createEmployee';
import deleteOrder from './_deleteOrder';
import getOrder from './_getOrder';
import createSignin from './_createSignin';
import listBranches from './_listBranches';
import listOrders from './_listOrders';
import listEnquiry from './_listEnquiry';
import createSignup from './_createSignup';
import getUser from './_userGet';
import deleteBranch from './_deleteBranch';
import updateProfile from './_updateProfile';
import updateOrder from './_updateOrder';
import updateEnquiry from './_updateEnquiry';

const tagTypes = [
  'Signup',
  'Signin',
  'Orders',
  'createUser',
  'Employees',
  'Branches',
  'Enquiries',
] as const;

const baseQuery = createApi({
  reducerPath: 'logictics',
  baseQuery: fetchBaseQuery({
    baseUrl: `${window.envs.BFF_BASE_URL}/api/v1`,
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
    createEnquiry: createEnquiry(builder),
    createEmployee: createEmployee(builder),
    deleteOrder: deleteOrder(builder),
    deleteBranch: deleteBranch(builder),
    createSignin: createSignin(builder),
    createOrder: createOrder(builder),
    createSignup: createSignup(builder),
    getUser: getUser(builder),
    listBranches: listBranches(builder),
    listEnquiry: listEnquiry(builder),
    listOrders: listOrders(builder),
    updateProfile: updateProfile(builder),
    getOrder: getOrder(builder),
    updateOrder: updateOrder(builder),
    updateEnquiry: updateEnquiry(builder),
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
  useCreateEnquiryMutation,
  useGetOrderQuery,
  useDeleteOrderMutation,
  useDeleteBranchMutation,
  useCreateSigninMutation,
  useListBranchesQuery,
  useListOrdersQuery,
  useListEnquiryQuery,
  useCreateOrderMutation,
  useCreateSignupMutation,
  useGetUserQuery,
  useUpdateProfileMutation,
  useUpdateOrderMutation,
  useUpdateEnquiryMutation,
} = colombusLogisticsApi;
